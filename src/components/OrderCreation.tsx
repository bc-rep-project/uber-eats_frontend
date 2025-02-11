import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { socket } from '../services/socket';

// Initialize Stripe
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY!);

interface OrderCreationProps {
  restaurantId: string;
  cartItems: any[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  serviceFee: number;
}

const CheckoutForm = ({
  restaurantId,
  cartItems,
  subtotal,
  tax,
  deliveryFee,
  serviceFee,
  onSuccess,
}: OrderCreationProps & { onSuccess: () => void }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setProcessing(true);

    const orderData = {
      restaurant_id: restaurantId,
      items: cartItems,
      delivery_info: {
        address: deliveryAddress,
        // Add more delivery info as needed
      },
      payment_info: {
        method: paymentMethod,
        subtotal,
        tax,
        delivery_fee: deliveryFee,
        service_fee: serviceFee,
        total: subtotal + tax + deliveryFee + serviceFee,
      },
      special_instructions: specialInstructions,
      estimated_preparation_time: 30, // Default value, can be calculated based on items
    };

    try {
      // Create order
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create order');
      }

      if (paymentMethod === 'credit_card') {
        if (!stripe || !elements) {
          throw new Error('Stripe not initialized');
        }

        const cardElement = elements.getElement(CardElement);
        if (!cardElement) {
          throw new Error('Card element not found');
        }

        const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
          data.client_secret,
          {
            payment_method: {
              card: cardElement,
              billing_details: {
                email: user?.email,
              },
            },
          }
        );

        if (stripeError) {
          throw new Error(stripeError.message);
        }
      }

      // Join order notification room
      socket.emit('join', { rooms: [`order_${data.order_id}`] });

      onSuccess();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6">Delivery Address</Typography>
          <TextField
            fullWidth
            required
            label="Delivery Address"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6">Payment Method</Typography>
          <RadioGroup
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <FormControlLabel
              value="credit_card"
              control={<Radio />}
              label="Credit Card"
            />
            <FormControlLabel
              value="cash"
              control={<Radio />}
              label="Cash on Delivery"
            />
          </RadioGroup>
        </Grid>

        {paymentMethod === 'credit_card' && (
          <Grid item xs={12}>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
            />
          </Grid>
        )}

        <Grid item xs={12}>
          <Typography variant="h6">Special Instructions</Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Special Instructions"
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6">Order Summary</Typography>
          <Box>
            <Typography>Subtotal: ${subtotal.toFixed(2)}</Typography>
            <Typography>Tax: ${tax.toFixed(2)}</Typography>
            <Typography>Delivery Fee: ${deliveryFee.toFixed(2)}</Typography>
            <Typography>Service Fee: ${serviceFee.toFixed(2)}</Typography>
            <Typography variant="h6">
              Total: ${(subtotal + tax + deliveryFee + serviceFee).toFixed(2)}
            </Typography>
          </Box>
        </Grid>

        {error && (
          <Grid item xs={12}>
            <Alert severity="error">{error}</Alert>
          </Grid>
        )}

        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={processing}
          >
            {processing ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Place Order'
            )}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

const OrderCreation: React.FC<OrderCreationProps> = (props) => {
  const navigate = useNavigate();

  const handleOrderSuccess = () => {
    // Clear cart and redirect to order tracking page
    navigate('/orders');
  };

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h4" gutterBottom>
          Checkout
        </Typography>
        <Elements stripe={stripePromise}>
          <CheckoutForm {...props} onSuccess={handleOrderSuccess} />
        </Elements>
      </Paper>
    </Container>
  );
};

export default OrderCreation; 