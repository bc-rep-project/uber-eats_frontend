import React from 'react';
import { Box, Typography, Container, TextField, InputAdornment } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import CategorySection from './components/CategorySection';
import FeaturedStores from './components/FeaturedStores';
import StoreList from './components/StoreList';
import DailyOffers from './components/DailyOffers';

const SearchBar = styled(TextField)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  borderRadius: theme.shape.borderRadius,
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: 'none',
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
    deliveryTime: '30-50 min',
    deliveryFee: 0.99,
    imageUrl: 'https://tb-static.uber.com/prod/image-proc/processed_images/3c3d111e7d53fa962724747d0d16fe67/719c6bd2757b08684c0faae44d43159d.jpeg',
    hasOffers: true,
  },
  {
    id: '2',
    name: 'Cardenas Market',
    deliveryTime: '40-60 min',
    deliveryFee: 0.99,
    imageUrl: 'https://tb-static.uber.com/prod/image-proc/processed_images/9e0c6236d4821f3b1e88b727133af9a1/719c6bd2757b08684c0faae44d43159d.jpeg',
    hasOffers: true,
  },
  {
    id: '3',
    name: 'Smart & Final',
    deliveryTime: '25-45 min',
    deliveryFee: 0.99,
    imageUrl: 'https://tb-static.uber.com/prod/image-proc/processed_images/53f3e89c9c6e0b7921913bc79e0dc7a1/719c6bd2757b08684c0faae44d43159d.jpeg',
    hasOffers: true,
  },
];

const GroceryPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 2 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 'bold' }}>
          Grocery
        </Typography>

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
          sx={{ mb: 3 }}
        />

        <CategorySection categories={categories} />
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 'bold' }}>
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
          <StoreList />
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 'bold' }}>
            Daily offers
          </Typography>
          <DailyOffers />
        </Box>
      </Box>
    </Container>
  );
};

export default GroceryPage; 