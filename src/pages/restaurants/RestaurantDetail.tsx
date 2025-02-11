import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Rating,
  Divider,
  Button,
  Dialog,
  IconButton,
  Tab,
  Tabs,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  AccessTime,
  LocalShipping,
  AttachMoney,
  Close as CloseIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
} from '@mui/icons-material';
import { addItem } from '../../store/slices/cartSlice';
import { RootState } from '../../store';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url?: string;
  category: string;
  is_available: boolean;
  customizations: Array<{
    name: string;
    required: boolean;
    multiple_select: boolean;
    options: Array<{
      name: string;
      price: number;
    }>;
  }>;
}

interface Restaurant {
  id: string;
  name: string;
  description: string;
  cuisine_types: string[];
  rating: number;
  total_ratings: number;
  price_range: string;
  delivery_fee: number;
  minimum_order: number;
  estimated_delivery_time: number;
  features: string[];
  menu_items: MenuItem[];
}

const RestaurantDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [itemQuantity, setItemQuantity] = useState(1);
  const [selectedCustomizations, setSelectedCustomizations] = useState<Record<string, string[]>>({});

  const { items: cartItems } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        // Replace with actual API call
        const response = await fetch(`/api/restaurants/${id}`);
        const data = await response.json();
        setRestaurant(data);
      } catch (err) {
        setError('Failed to load restaurant details');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !restaurant) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 4 }}>
          {error || 'Restaurant not found'}
        </Alert>
      </Container>
    );
  }

  const categories = ['all', ...new Set(restaurant.menu_items.map(item => item.category))];
  const filteredItems = restaurant.menu_items.filter(
    item => selectedCategory === 'all' || item.category === selectedCategory
  );

  const handleAddToCart = (item: MenuItem) => {
    if (item.customizations.length > 0) {
      setSelectedItem(item);
      setItemQuantity(1);
      setSelectedCustomizations({});
    } else {
      dispatch(addItem({
        id: item.id,
        restaurantId: restaurant.id,
        name: item.name,
        price: item.price,
        quantity: 1,
        image: item.image_url,
      }));
    }
  };

  const handleCustomizationSubmit = () => {
    if (selectedItem) {
      dispatch(addItem({
        id: selectedItem.id,
        restaurantId: restaurant.id,
        name: selectedItem.name,
        price: selectedItem.price,
        quantity: itemQuantity,
        image: selectedItem.image_url,
        customizations: Object.entries(selectedCustomizations).map(([name, options]) => ({
          name,
          options,
        })),
      }));
      setSelectedItem(null);
    }
  };

  return (
    <Container>
      <Box sx={{ py: 4 }}>
        {/* Restaurant Header */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom>
              {restaurant.name}
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              {restaurant.description}
            </Typography>
            <Box sx={{ mb: 2 }}>
              {restaurant.cuisine_types.map((type) => (
                <Chip key={type} label={type} sx={{ mr: 1, mb: 1 }} />
              ))}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Rating value={restaurant.rating} precision={0.1} readOnly />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  ({restaurant.total_ratings})
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AttachMoney />
                <Typography variant="body2">
                  {restaurant.price_range}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocalShipping />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  ${restaurant.delivery_fee.toFixed(2)} delivery
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccessTime />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  {restaurant.estimated_delivery_time} min
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Menu Categories */}
        <Tabs
          value={selectedCategory}
          onChange={(_, value) => setSelectedCategory(value)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ mb: 4 }}
        >
          {categories.map((category) => (
            <Tab
              key={category}
              label={category.charAt(0).toUpperCase() + category.slice(1)}
              value={category}
            />
          ))}
        </Tabs>

        {/* Menu Items */}
        <Grid container spacing={3}>
          {filteredItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card>
                {item.image_url && (
                  <CardMedia
                    component="img"
                    height="140"
                    image={item.image_url}
                    alt={item.name}
                  />
                )}
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {item.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6">
                      ${item.price.toFixed(2)}
                    </Typography>
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={() => handleAddToCart(item)}
                      disabled={!item.is_available}
                    >
                      Add to Cart
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Customization Dialog */}
      <Dialog
        open={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        maxWidth="sm"
        fullWidth
      >
        {selectedItem && (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
              <Typography variant="h6">Customize {selectedItem.name}</Typography>
              <IconButton onClick={() => setSelectedItem(null)}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Divider />
            <Box sx={{ p: 2 }}>
              {selectedItem.customizations.map((customization) => (
                <Box key={customization.name} sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    {customization.name}
                    {customization.required && ' *'}
                  </Typography>
                  {customization.options.map((option) => (
                    <Box
                      key={option.name}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 1,
                      }}
                    >
                      <Typography variant="body1">
                        {option.name}
                        {option.price > 0 && ` (+$${option.price.toFixed(2)})`}
                      </Typography>
                      <Chip
                        label={
                          selectedCustomizations[customization.name]?.includes(option.name)
                            ? 'Selected'
                            : 'Select'
                        }
                        onClick={() => {
                          const current = selectedCustomizations[customization.name] || [];
                          if (customization.multiple_select) {
                            setSelectedCustomizations({
                              ...selectedCustomizations,
                              [customization.name]: current.includes(option.name)
                                ? current.filter(name => name !== option.name)
                                : [...current, option.name],
                            });
                          } else {
                            setSelectedCustomizations({
                              ...selectedCustomizations,
                              [customization.name]: [option.name],
                            });
                          }
                        }}
                        color={
                          selectedCustomizations[customization.name]?.includes(option.name)
                            ? 'primary'
                            : 'default'
                        }
                      />
                    </Box>
                  ))}
                </Box>
              ))}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle1">Quantity:</Typography>
                <IconButton
                  onClick={() => setItemQuantity(Math.max(1, itemQuantity - 1))}
                  size="small"
                >
                  <RemoveIcon />
                </IconButton>
                <Typography sx={{ mx: 2 }}>{itemQuantity}</Typography>
                <IconButton
                  onClick={() => setItemQuantity(itemQuantity + 1)}
                  size="small"
                >
                  <AddIcon />
                </IconButton>
              </Box>
              <Button
                variant="contained"
                fullWidth
                onClick={handleCustomizationSubmit}
              >
                Add to Cart - ${(selectedItem.price * itemQuantity).toFixed(2)}
              </Button>
            </Box>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default RestaurantDetail; 