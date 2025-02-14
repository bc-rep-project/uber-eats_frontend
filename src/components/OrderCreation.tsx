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
import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { updateUserProfile } from '../store/slices/authSlice';
import { socket } from '../services/socket';

// Initialize Stripe
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY || '');

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
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [orderCreated, setOrderCreated] = useState(false);
  const { user } = useAppSelector((state) => state.auth);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements || !user) {
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error('Card element not found');
      }

      // Create payment method
      const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (stripeError) {
        throw new Error(stripeError.message);
      }

      // Create order
      const order = {
        items: cartItems,
        total: subtotal + tax + deliveryFee + serviceFee,
        restaurantId,
        userId: user._id,
        paymentMethodId: paymentMethod.id,
      };

      // TODO: Replace with actual API call
      // Simulate order creation
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Emit order created event
      socket.emit('order:created', order);

      setOrderCreated(true);
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setProcessing(false);
    }
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateUserProfile({ address: e.target.value }));
  };

  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateUserProfile({ paymentMethod: e.target.value as 'credit_card' | 'cash' }));
  };

  const handleSpecialInstructionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateUserProfile({ specialInstructions: e.target.value }));
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
            value={user?.address || ''}
            onChange={handleAddressChange}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6">Payment Method</Typography>
          <RadioGroup
            value={user?.paymentMethod || 'credit_card'}
            onChange={handlePaymentMethodChange}
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

        {user?.paymentMethod === 'credit_card' && (
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
            value={user?.specialInstructions || ''}
            onChange={handleSpecialInstructionsChange}
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
            disabled={!stripe || processing}
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