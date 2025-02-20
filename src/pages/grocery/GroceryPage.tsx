import React from 'react';
import {
  Box,
  Typography,
  Container,
  TextField,
  InputAdornment,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

// Components
import CategoryScroll from './components/CategoryScroll';
import FeaturedStores from './components/FeaturedStores';
import StoreSection from './components/StoreSection';
import DailyOffers from './components/DailyOffers';

// Constants
import { STORE_IMAGES, PRODUCT_IMAGES } from './constants';

const SearchBar = styled(TextField)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  borderRadius: theme.shape.borderRadius,
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'transparent',
    },
    '&:hover fieldset': {
      borderColor: 'transparent',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'transparent',
    },
  },
}));

const categories = [
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

const featuredStores = [
  {
    id: '1',
    name: 'Lucky California',
    deliveryTime: '30-50',
    imageUrl: STORE_IMAGES.LUCKY,
    offers: 'Offers available',
  },
  {
    id: '2',
    name: 'Cardenas Market',
    deliveryTime: '40-60',
    imageUrl: STORE_IMAGES.CARDENAS,
    offers: 'Offers available',
  },
  {
    id: '3',
    name: 'Smart & Final',
    deliveryTime: '25-45',
    imageUrl: STORE_IMAGES.SMART_FINAL,
    offers: 'Offers available',
  },
];

const quickEssentials = [
  {
    id: '1',
    name: 'CVS',
    deliveryTime: '20-40',
    deliveryFee: 4.49,
    rating: 4.7,
    imageUrl: STORE_IMAGES.CVS,
    offers: '2 Offers Available',
  },
  {
    id: '2',
    name: 'Chevron ExtraMile',
    deliveryTime: '15-35',
    deliveryFee: 0,
    rating: 4.8,
    imageUrl: STORE_IMAGES.CHEVRON,
    offers: 'Save on Select Items',
  },
];

const products = [
  {
    id: '1',
    name: 'Birch Benders Organic Buttermilk Pancake Mix',
    price: 5.80,
    originalPrice: 7.30,
    calories: '110 Cal.',
    imageUrl: PRODUCT_IMAGES.PANCAKE_MIX,
  },
  {
    id: '2',
    name: 'Signature Select Grade A Pure Maple Syrup',
    price: 10.11,
    calories: '110 Cal.',
    imageUrl: PRODUCT_IMAGES.MAPLE_SYRUP,
  },
  {
    id: '3',
    name: 'Pearl Milling Company Complete Pancake Mix',
    price: 5.21,
    originalPrice: 6.51,
    calories: '160 Cal.',
    imageUrl: PRODUCT_IMAGES.PANCAKE_MIX_2,
  },
];

const GroceryPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Grocery
        </Typography>

        <SearchBar
          fullWidth
          placeholder="Search grocery, drinks, stores"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 3 }}
        />

        <CategoryScroll categories={categories} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            Featured stores
          </Typography>
          <FeaturedStores stores={featuredStores} />
        </Box>

        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
              Stock up on groceries
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Fresh groceries delivered to your door
            </Typography>
          </Box>
          <StoreSection stores={quickEssentials} />
        </Box>

        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
              Quick essentials
            </Typography>
            <Typography variant="body2" color="text.secondary">
              From snacks and drinks to daily needs
            </Typography>
          </Box>
          <StoreSection stores={quickEssentials} />
        </Box>

        <DailyOffers products={products} />
      </Box>
    </Container>
  );
};

export default GroceryPage; 