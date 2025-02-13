import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Divider,
  CircularProgress,
  Alert,
} from '@mui/material';
import { socket } from '../services/socket';
import { OrderStatus } from '../types/order';

const orderSteps = [
  { status: OrderStatus.PENDING, label: 'Order Placed' },
  { status: OrderStatus.CONFIRMED, label: 'Order Confirmed' },
  { status: OrderStatus.PREPARING, label: 'Preparing' },
  { status: OrderStatus.READY_FOR_PICKUP, label: 'Ready for Pickup' },
  { status: OrderStatus.OUT_FOR_DELIVERY, label: 'Out for Delivery' },
  { status: OrderStatus.DELIVERED, label: 'Delivered' },
];

const OrderTracking: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders/${orderId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch order details');
        }

        const data = await response.json();
        setOrder(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  useEffect(() => {
    if (order) {
      // Join order notification room
      socket.emit('join', {
        rooms: [`order_${orderId}`],
        token: localStorage.getItem('token'),
      });

      // Listen for order status updates
      socket.on('notification', (notification: any) => {
        if (notification.type === 'order_status_update') {
          setOrder((prevOrder: any) => ({
            ...prevOrder,
            status: notification.status,
            delivery_info: {
              ...prevOrder.delivery_info,
              estimated_delivery_time: notification.estimated_delivery_time,
            },
          }));
        }
      });

      return () => {
        // Leave order notification room
        socket.emit('leave', {
          rooms: [`order_${orderId}`],
          token: localStorage.getItem('token'),
        });
        socket.off('notification');
      };
    }
  }, [order, orderId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !order) {
    return (
      <Container maxWidth="md">
        <Alert severity="error">{error || 'Order not found'}</Alert>
      </Container>
    );
  }

  const activeStep = orderSteps.findIndex((step) => step.status === order.status);

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h4" gutterBottom>
          Order #{orderId}
        </Typography>

        <Box sx={{ my: 4 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {orderSteps.map((step) => (
              <Step key={step.status}>
                <StepLabel>{step.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Order Details
            </Typography>
            <Box>
              {order.items.map((item: any, index: number) => (
                <Box key={index} sx={{ mb: 1 }}>
                  <Typography>
                    {item.quantity}x {item.name} - ${item.subtotal.toFixed(2)}
                  </Typography>
                  {item.special_instructions && (
                    <Typography variant="body2" color="text.secondary">
                      Note: {item.special_instructions}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box>
              <Typography>Subtotal: ${order.payment_info.subtotal.toFixed(2)}</Typography>
              <Typography>Tax: ${order.payment_info.tax.toFixed(2)}</Typography>
              <Typography>
                Delivery Fee: ${order.payment_info.delivery_fee.toFixed(2)}
              </Typography>
              <Typography>
                Service Fee: ${order.payment_info.service_fee.toFixed(2)}
              </Typography>
              <Typography variant="h6">
                Total: ${order.payment_info.total.toFixed(2)}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Delivery Information
            </Typography>
            <Box>
              <Typography>
                Address: {order.delivery_info.address}
              </Typography>
              {order.delivery_info.instructions && (
                <Typography>
                  Instructions: {order.delivery_info.instructions}
                </Typography>
              )}
              {order.delivery_info.estimated_delivery_time && (
                <Typography>
                  Estimated Delivery:{' '}
                  {new Date(order.delivery_info.estimated_delivery_time).toLocaleTimeString()}
                </Typography>
              )}
            </Box>

            {order.special_instructions && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Special Instructions
                </Typography>
                <Typography>{order.special_instructions}</Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default OrderTracking; 