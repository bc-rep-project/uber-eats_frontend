import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Tabs,
  Tab,
  Card,
  CardContent,
  Button,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Refresh as RefreshIcon,
  Info as InfoIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  customizations?: Array<{
    name: string;
    options: string[];
  }>;
  special_instructions?: string;
}

interface Order {
  id: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'picked_up' | 'delivered' | 'cancelled';
  items: OrderItem[];
  customer: {
    name: string;
    phone: string;
    address: string;
  };
  payment: {
    subtotal: number;
    tax: number;
    delivery_fee: number;
    total: number;
    method: string;
    status: string;
  };
  created_at: string;
  estimated_delivery_time?: string;
  special_instructions?: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => (
  <div role="tabpanel" hidden={value !== index}>
    {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
  </div>
);

const OrderManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchOrders();
    // Set up real-time updates here (e.g., WebSocket connection)
    const interval = setInterval(fetchOrders, 30000); // Fallback polling every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      const response = await fetch('/api/orders');
      const data = await response.json();
      setOrders(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: Order['status']) => {
    try {
      // TODO: Replace with actual API call
      await fetch(`/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      
      // Update local state
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (err) {
      setError('Failed to update order status');
    }
  };

  const getStatusColor = (status: Order['status']) => {
    const colors: Record<Order['status'], string> = {
      pending: 'warning',
      confirmed: 'info',
      preparing: 'info',
      ready: 'success',
      picked_up: 'success',
      delivered: 'success',
      cancelled: 'error',
    };
    return colors[status];
  };

  const getNextStatus = (currentStatus: Order['status']): Order['status'] | null => {
    const flow: Record<Order['status'], Order['status'] | null> = {
      pending: 'confirmed',
      confirmed: 'preparing',
      preparing: 'ready',
      ready: 'picked_up',
      picked_up: 'delivered',
      delivered: null,
      cancelled: null,
    };
    return flow[currentStatus];
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5">Order Management</Typography>
        <Button
          startIcon={<RefreshIcon />}
          onClick={fetchOrders}
          variant="outlined"
        >
          Refresh
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ width: '100%', mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Active Orders" />
          <Tab label="Order History" />
        </Tabs>

        <TabPanel value={activeTab} index={0}>
          <Grid container spacing={3}>
            {orders
              .filter(order => !['delivered', 'cancelled'].includes(order.status))
              .map((order) => (
                <Grid item xs={12} md={6} lg={4} key={order.id}>
                  <Card>
                    <CardContent>
                      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h6">Order #{order.id}</Typography>
                        <Chip
                          label={order.status.toUpperCase()}
                          color={getStatusColor(order.status)}
                        />
                      </Box>

                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {new Date(order.created_at).toLocaleString()}
                      </Typography>

                      <Box mb={2}>
                        {order.items.map((item, index) => (
                          <Typography key={index} variant="body2">
                            {item.quantity}x {item.name} - ${item.price.toFixed(2)}
                          </Typography>
                        ))}
                      </Box>

                      <Box display="flex" justifyContent="space-between" mb={2}>
                        <Typography variant="subtitle2">Total:</Typography>
                        <Typography variant="subtitle1">
                          ${order.payment.total.toFixed(2)}
                        </Typography>
                      </Box>

                      <Box display="flex" gap={1} mb={2}>
                        <IconButton size="small" onClick={() => {
                          setSelectedOrder(order);
                          setOpenDialog(true);
                        }}>
                          <InfoIcon />
                        </IconButton>
                        <IconButton size="small" href={`tel:${order.customer.phone}`}>
                          <PhoneIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          href={`https://maps.google.com/?q=${encodeURIComponent(order.customer.address)}`}
                          target="_blank"
                        >
                          <LocationIcon />
                        </IconButton>
                      </Box>

                      {getNextStatus(order.status) && (
                        <Button
                          fullWidth
                          variant="contained"
                          onClick={() => handleStatusChange(order.id, getNextStatus(order.status)!)}
                        >
                          Mark as {getNextStatus(order.status)?.toUpperCase()}
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Items</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders
                  .filter(order => ['delivered', 'cancelled'].includes(order.status))
                  .map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>{order.customer.name}</TableCell>
                      <TableCell>{order.items.length} items</TableCell>
                      <TableCell>${order.payment.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <Chip
                          label={order.status.toUpperCase()}
                          color={getStatusColor(order.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          size="small"
                          onClick={() => {
                            setSelectedOrder(order);
                            setOpenDialog(true);
                          }}
                        >
                          <InfoIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </Paper>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedOrder && (
          <>
            <DialogTitle>
              Order Details #{selectedOrder.id}
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Customer Information
                  </Typography>
                  <Typography>Name: {selectedOrder.customer.name}</Typography>
                  <Typography>Phone: {selectedOrder.customer.phone}</Typography>
                  <Typography>Address: {selectedOrder.customer.address}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Order Information
                  </Typography>
                  <Typography>Status: {selectedOrder.status.toUpperCase()}</Typography>
                  <Typography>
                    Created: {new Date(selectedOrder.created_at).toLocaleString()}
                  </Typography>
                  {selectedOrder.estimated_delivery_time && (
                    <Typography>
                      Estimated Delivery: {selectedOrder.estimated_delivery_time}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Items
                  </Typography>
                  <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Item</TableCell>
                          <TableCell align="right">Quantity</TableCell>
                          <TableCell align="right">Price</TableCell>
                          <TableCell align="right">Total</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedOrder.items.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              {item.name}
                              {item.customizations?.map((custom, idx) => (
                                <Typography
                                  key={idx}
                                  variant="caption"
                                  display="block"
                                  color="text.secondary"
                                >
                                  {custom.name}: {custom.options.join(', ')}
                                </Typography>
                              ))}
                            </TableCell>
                            <TableCell align="right">{item.quantity}</TableCell>
                            <TableCell align="right">
                              ${item.price.toFixed(2)}
                            </TableCell>
                            <TableCell align="right">
                              ${(item.quantity * item.price).toFixed(2)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Payment Information
                  </Typography>
                  <Box display="flex" justifyContent="space-between">
                    <Typography>Subtotal:</Typography>
                    <Typography>${selectedOrder.payment.subtotal.toFixed(2)}</Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography>Tax:</Typography>
                    <Typography>${selectedOrder.payment.tax.toFixed(2)}</Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography>Delivery Fee:</Typography>
                    <Typography>${selectedOrder.payment.delivery_fee.toFixed(2)}</Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle1">Total:</Typography>
                    <Typography variant="subtitle1">
                      ${selectedOrder.payment.total.toFixed(2)}
                    </Typography>
                  </Box>
                  <Typography color="text.secondary">
                    Payment Method: {selectedOrder.payment.method}
                  </Typography>
                  <Typography color="text.secondary">
                    Payment Status: {selectedOrder.payment.status}
                  </Typography>
                </Grid>
                {selectedOrder.special_instructions && (
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                      Special Instructions
                    </Typography>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                      <Typography>{selectedOrder.special_instructions}</Typography>
                    </Paper>
                  </Grid>
                )}
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Close</Button>
              {getNextStatus(selectedOrder.status) && (
                <Button
                  variant="contained"
                  onClick={() => {
                    handleStatusChange(selectedOrder.id, getNextStatus(selectedOrder.status)!);
                    setOpenDialog(false);
                  }}
                >
                  Mark as {getNextStatus(selectedOrder.status)?.toUpperCase()}
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default OrderManagement; 