import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Tabs,
  Tab,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Restaurant as RestaurantIcon,
  Menu as MenuIcon,
  Inventory2 as InventoryIcon,
  Assessment as AssessmentIcon,
  Settings as SettingsIcon,
  ShoppingBag as OrdersIcon,
} from '@mui/icons-material';
import { RootState } from '../../store';
import MenuManagement from './MenuManagement';
import InventoryManagement from './InventoryManagement';
import OrderManagement from './OrderManagement';
import AnalyticsManagement from './AnalyticsManagement';
import SettingsManagement from './SettingsManagement';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const RestaurantDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [restaurantData, setRestaurantData] = useState<any>(null);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        // Replace with actual API call
        const response = await fetch(`/api/restaurants/owner/${user?._id}`);
        const data = await response.json();
        setRestaurantData(data);
        setError(null);
      } catch (err) {
        setError('Failed to load restaurant data');
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) {
      fetchRestaurantData();
    }
  }, [user?._id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 4 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  const tabs = [
    { label: 'Overview', value: 0 },
    { label: 'Menu Management', value: 1 },
    { label: 'Orders', value: 2 },
    { label: 'Inventory', value: 3 },
    { label: 'Analytics', value: 4 },
    { label: 'Settings', value: 5 },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {/* Header */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h4" gutterBottom>
              Restaurant Dashboard
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Manage your restaurant, menu, and orders
            </Typography>
          </Paper>
        </Grid>

        {/* Quick Stats */}
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography color="text.secondary" gutterBottom>
                    Today's Orders
                  </Typography>
                  <Typography variant="h4">25</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography color="text.secondary" gutterBottom>
                    Today's Revenue
                  </Typography>
                  <Typography variant="h4">$1,250</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography color="text.secondary" gutterBottom>
                    Active Menu Items
                  </Typography>
                  <Typography variant="h4">48</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography color="text.secondary" gutterBottom>
                    Average Rating
                  </Typography>
                  <Typography variant="h4">4.5</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12}>
          <Paper sx={{ width: '100%' }}>
            <Tabs
              value={activeTab}
              onChange={(_, newValue) => setActiveTab(newValue)}
              variant="scrollable"
              scrollButtons="auto"
              sx={{ borderBottom: 1, borderColor: 'divider' }}
            >
              <Tab icon={<RestaurantIcon />} label="Overview" />
              <Tab icon={<MenuIcon />} label="Menu Management" />
              <Tab icon={<OrdersIcon />} label="Orders" />
              <Tab icon={<InventoryIcon />} label="Inventory" />
              <Tab icon={<AssessmentIcon />} label="Analytics" />
              <Tab icon={<SettingsIcon />} label="Settings" />
            </Tabs>

            <TabPanel value={activeTab} index={0}>
              <Typography variant="h6" gutterBottom>
                Restaurant Overview
              </Typography>
              {/* Add restaurant overview content */}
            </TabPanel>

            <TabPanel value={activeTab} index={1}>
              <MenuManagement />
            </TabPanel>

            <TabPanel value={activeTab} index={2}>
              <OrderManagement />
            </TabPanel>

            <TabPanel value={activeTab} index={3}>
              <InventoryManagement />
            </TabPanel>

            <TabPanel value={activeTab} index={4}>
              <AnalyticsManagement />
            </TabPanel>

            <TabPanel value={activeTab} index={5}>
              <SettingsManagement />
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RestaurantDashboard; 