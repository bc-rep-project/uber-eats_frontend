import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Chip,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { GroceryCategory, GroceryStore } from '../../types/grocery';

const CategoryCard = styled(Card)(({ theme }) => ({
  cursor: 'pointer',
  textAlign: 'center',
  height: '100%',
  '&:hover': {
    transform: 'translateY(-4px)',
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
  { id: 'convenience', name: 'Convenience', icon: '🏪' },
  { id: 'alcohol', name: 'Alcohol', icon: '🍷' },
  { id: 'gifts', name: 'Gifts', icon: '🎁' },
  { id: 'pharmacy', name: 'Pharmacy', icon: '💊' },
];

const featuredStores: GroceryStore[] = [
  {
    id: '1',
    name: 'Safeway',
    imageUrl: 'https://example.com/safeway.jpg',
    rating: 4.7,
    deliveryFee: 0.99,
    deliveryTime: { min: 15, max: 35 },
    isLiked: false,
    type: 'grocery',
    offers: [{ text: 'Offers available' }],
  },
  {
    id: '2',
    name: 'CVS',
    imageUrl: 'https://example.com/cvs.jpg',
    rating: 4.8,
    deliveryFee: 3.99,
    deliveryTime: { min: 20, max: 40 },
    isLiked: false,
    type: 'pharmacy',
  },
  // Add more stores as needed
];

interface GroceryPageProps {
  onCategoryClick: (categoryId: string) => void;
  onStoreClick: (storeId: string) => void;
  onFavoriteClick: (storeId: string) => void;
}

const GroceryPage: React.FC<GroceryPageProps> = ({
  onCategoryClick,
  onStoreClick,
  onFavoriteClick,
}) => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* Categories */}
        <Typography variant="h5" gutterBottom>
          Browse categories
        </Typography>
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {categories.map((category) => (
            <Grid item xs={4} sm={3} md={2} key={category.id}>
              <CategoryCard onClick={() => onCategoryClick(category.id)}>
                <CardContent>
                  <Typography variant="h4" component="div" gutterBottom>
                    {category.icon}
                  </Typography>
                  <Typography variant="body2">{category.name}</Typography>
                </CardContent>
              </CategoryCard>
            </Grid>
          ))}
        </Grid>

        {/* Featured Stores */}
        <Typography variant="h5" gutterBottom>
          Featured stores
        </Typography>
        <Grid container spacing={3}>
          {featuredStores.map((store) => (
            <Grid item xs={12} sm={6} md={4} key={store.id}>
              <StoreCard onClick={() => onStoreClick(store.id)}>
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
                      '&:hover': { backgroundColor: 'white' },
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onFavoriteClick(store.id);
                    }}
                  >
                    {store.isLiked ? (
                      <FavoriteIcon color="error" />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </IconButton>
                  {store.offers && store.offers.length > 0 && (
                    <Chip
                      label={store.offers[0].text}
                      color="success"
                      sx={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                      }}
                    />
                  )}
                </Box>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {store.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AccessTimeIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {store.deliveryTime.min}-{store.deliveryTime.max} min
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      •
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ${store.deliveryFee.toFixed(2)} Delivery Fee
                    </Typography>
                  </Box>
                </CardContent>
              </StoreCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default GroceryPage; 