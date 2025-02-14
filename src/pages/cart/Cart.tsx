import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  IconButton,
  Divider,
  TextField,
  Alert,
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { RootState } from '../../store';
import {
  updateQuantity,
  removeItem,
  clearCart,
} from '../../store/slices/cartSlice';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, restaurantId } = useSelector((state: RootState) => state.cart);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [tip, setTip] = useState(0);

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const deliveryFee = 2.99;
  const serviceFee = subtotal * 0.05; // 5% service fee
  const tax = subtotal * 0.08; // 8% tax
  const orderTotal = subtotal + deliveryFee + serviceFee + tax + tip;

  const handleQuantityChange = (itemId: string, quantity: number) => {
    dispatch(updateQuantity({ id: itemId, quantity }));
  };

  const handleRemoveItem = (itemId: string) => {
    dispatch(removeItem(itemId));
  };

  const handleCheckout = () => {
    // Implement checkout logic
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Box textAlign="center">
          <Typography variant="h5" gutterBottom>
            Your cart is empty
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/restaurants')}
            sx={{ mt: 2 }}
          >
            Browse Restaurants
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              {items.map((item) => (
                <Box key={item.id}>
                  <Grid container spacing={2} alignItems="center">
                    {item.image && (
                      <Grid item xs={3}>
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{
                            width: '100%',
                            height: '80px',
                            objectFit: 'cover',
                            borderRadius: '4px',
                          }}
                        />
                      </Grid>
                    )}
                    <Grid item xs={item.image ? 9 : 12}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                        }}
                      >
                        <Box>
                          <Typography variant="subtitle1">{item.name}</Typography>
                          {item.customizations?.map((customization) => (
                            <Typography
                              key={customization.name}
                              variant="body2"
                              color="text.secondary"
                            >
                              {customization.name}: {customization.options.join(', ')}
                            </Typography>
                          ))}
                        </Box>
                        <Typography variant="subtitle1">
                          ${(item.price * item.quantity).toFixed(2)}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          mt: 1,
                        }}
                      >
                        <IconButton
                          size="small"
                          onClick={() =>
                            handleQuantityChange(
                              item.id,
                              Math.max(0, item.quantity - 1)
                            )
                          }
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
                        <IconButton
                          size="small"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          <AddIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleRemoveItem(item.id)}
                          sx={{ ml: 'auto' }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Grid>
                  </Grid>
                  <Divider sx={{ my: 2 }} />
                </Box>
              ))}

              <TextField
                fullWidth
                multiline
                rows={3}
                label="Special Instructions"
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                sx={{ mt: 2 }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              <Box sx={{ my: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 1,
                  }}
                >
                  <Typography>Subtotal</Typography>
                  <Typography>${subtotal.toFixed(2)}</Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 1,
                  }}
                >
                  <Typography>Delivery Fee</Typography>
                  <Typography>${deliveryFee.toFixed(2)}</Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 1,
                  }}
                >
                  <Typography>Service Fee</Typography>
                  <Typography>${serviceFee.toFixed(2)}</Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 1,
                  }}
                >
                  <Typography>Tax</Typography>
                  <Typography>${tax.toFixed(2)}</Typography>
                </Box>
                <Box sx={{ my: 2 }}>
                  <Typography gutterBottom>Tip</Typography>
                  <Grid container spacing={1}>
                    {[0, 5, 10, 15, 20].map((percentage) => (
                      <Grid item key={percentage}>
                        <Button
                          variant={tip === (subtotal * percentage) / 100 ? 'contained' : 'outlined'}
                          size="small"
                          onClick={() => setTip((subtotal * percentage) / 100)}
                        >
                          {percentage}%
                        </Button>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 2,
                  }}
                >
                  <Typography variant="h6">Total</Typography>
                  <Typography variant="h6">${orderTotal.toFixed(2)}</Typography>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  size="large"
                  onClick={() => navigate(`/restaurants/${restaurantId}`)}
                  sx={{ mt: 2 }}
                >
                  Add More Items
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart; 