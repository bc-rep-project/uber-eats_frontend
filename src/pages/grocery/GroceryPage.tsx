import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Chip,
  TextField,
  InputAdornment,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { GroceryCategory, GroceryStore } from '../../types/grocery';

const SearchBar = styled(TextField)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  borderRadius: theme.shape.borderRadius,
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: 'none',
    },
  },
}));

const CategoryScroll = styled(Box)(({ theme }) => ({
  display: 'flex',
  overflowX: 'auto',
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  scrollbarWidth: 'none',
}));

const CategoryCard = styled(Card)(({ theme }) => ({
  minWidth: 100,
  textAlign: 'center',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-2px)',
    transition: 'transform 0.2s ease-in-out',
  },
}));

const StoreCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-4px)',
    transition: 'transform 0.2s ease-in-out',
  },
}));

const categories: GroceryCategory[] = [
  { id: 'baby', name: 'Baby', icon: '🍼' },
  { id: 'specialty', name: 'Specialty Foods', icon: '🥖' },
  { id: 'pet', name: 'Pet Supplies', icon: '🐾' },
  { id: 'flowers', name: 'Flowers', icon: '💐' },
  { id: 'retail', name: 'Retail', icon: '📚' },
  { id: 'grocery', name: 'Grocery', icon: '🥬' },
  { id: 'convenience', name: 'Convenience', icon: '🛍️' },
  { id: 'alcohol', name: 'Alcohol', icon: '🍷' },
  { id: 'gifts', name: 'Gifts', icon: '🎁' },
  { id: 'pharmacy', name: 'Pharmacy', icon: '💊' },
];

const featuredStores: GroceryStore[] = [
  {
    id: '1',
    name: 'Lucky California',
    imageUrl: 'https://example.com/lucky.jpg',
    rating: 4.6,
    deliveryTime: { min: 30, max: 50 },
    deliveryFee: 0.99,
    isLiked: false,
    offers: [{ text: 'Offers available' }],
  },
  {
    id: '2',
    name: 'Cardenas Market',
    imageUrl: 'https://example.com/cardenas.jpg',
    rating: 4.7,
    deliveryTime: { min: 40, max: 60 },
    deliveryFee: 1.99,
    isLiked: false,
    offers: [{ text: 'Offers available' }],
  },
  {
    id: '3',
    name: 'Smart & Final',
    imageUrl: 'https://example.com/smart.jpg',
    rating: 4.5,
    deliveryTime: { min: 25, max: 45 },
    deliveryFee: 2.99,
    isLiked: true,
    offers: [{ text: 'Offers available' }],
  },
];

const GroceryPage: React.FC = () => {
  const handleStoreClick = (storeId: string) => {
    // Navigate to store detail page
  };

  const handleCategoryClick = (categoryId: string) => {
    // Filter stores by category
  };

  const handleFavoriteClick = (storeId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    // Toggle favorite status
  };

  return (
    <Box sx={{ pb: 7 }}>
      {/* Search Bar */}
      <Box sx={{ p: 2 }}>
        <SearchBar
          fullWidth
          placeholder="Search grocery, drinks, stores"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Categories */}
      <CategoryScroll>
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
          >
            <CardContent>
              <Typography variant="h4" component="div" gutterBottom>
                {category.icon}
              </Typography>
              <Typography variant="body2">{category.name}</Typography>
            </CardContent>
          </CategoryCard>
        ))}
      </CategoryScroll>

      {/* Featured Stores */}
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Featured stores
        </Typography>
        <Grid container spacing={2}>
          {featuredStores.map((store) => (
            <Grid item xs={12} key={store.id}>
              <StoreCard onClick={() => handleStoreClick(store.id)}>
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="160"
                    image={store.imageUrl}
                    alt={store.name}
                  />
                  <IconButton
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      backgroundColor: 'white',
                    }}
                    onClick={(e) => handleFavoriteClick(store.id, e)}
                  >
                    {store.isLiked ? (
                      <FavoriteIcon color="error" />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </IconButton>
                </Box>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {store.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <AccessTimeIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {store.deliveryTime.min}-{store.deliveryTime.max} min
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      • ${store.deliveryFee.toFixed(2)} Delivery Fee
                    </Typography>
                  </Box>
                  {store.offers && (
                    <Chip
                      label={store.offers[0].text}
                      size="small"
                      color="success"
                      sx={{ mt: 1 }}
                    />
                  )}
                </CardContent>
              </StoreCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default GroceryPage; 