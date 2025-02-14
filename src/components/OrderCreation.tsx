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

interface DeliveryAddress {
  type: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

interface PaymentMethodOption {
  type: 'credit_card' | 'cash';
  last4?: string;
  exp_month?: number;
  exp_year?: number;
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
  const [selectedAddress, setSelectedAddress] = useState<DeliveryAddress | null>(
    user?.saved_addresses[0] || null
  );
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethodOption>({
    type: 'credit_card'
  });
  const [specialInstructions, setSpecialInstructions] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements || !user || !selectedAddress) {
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
        deliveryAddress: `${selectedAddress.address}, ${selectedAddress.city}, ${selectedAddress.state} ${selectedAddress.zip}`,
        paymentMethod: selectedPaymentMethod.type,
        specialInstructions,
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
    const newAddress: DeliveryAddress = {
      type: 'delivery',
      address: e.target.value,
      city: '',
      state: '',
      zip: '',
    };
    dispatch(updateUserProfile({
      saved_addresses: [...(user?.saved_addresses || []), newAddress]
    }));
    setSelectedAddress(newAddress);
  };

  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const type = e.target.value as 'credit_card' | 'cash';
    setSelectedPaymentMethod({ type });
  };

  const handleSpecialInstructionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpecialInstructions(e.target.value);
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
            value={selectedAddress?.address || ''}
            onChange={handleAddressChange}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6">Payment Method</Typography>
          <RadioGroup
            value={selectedPaymentMethod.type}
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

        {selectedPaymentMethod.type === 'credit_card' && (
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