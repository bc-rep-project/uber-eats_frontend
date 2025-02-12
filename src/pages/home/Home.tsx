import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import Header from '../../components/layout/Header';
import BottomNav from '../../components/layout/BottomNav';
import CategoryNav from '../../components/home/CategoryNav';
import RestaurantCard from '../../components/restaurant/RestaurantCard';

// Mock data for restaurants
const restaurants = [
  {
    id: 1,
    name: "McDonald's®",
    image: "https://tb-static.uber.com/prod/image-proc/processed_images/3c3d111e7d53fa962724747d0d16fe67/719c6bd2757b08684c0faae44d43159d.jpeg",
    rating: 4.7,
    deliveryFee: 3.99,
    deliveryTime: "10-20 min",
    hasOffers: false,
  },
  {
    id: 2,
    name: "Starbucks",
    image: "https://tb-static.uber.com/prod/image-proc/processed_images/9e0c6236d4821f3b1e88b727133a F9a1/719c6bd2757b08684c0faae44d43159d.jpeg",
    rating: 4.8,
    deliveryFee: 3.99,
    deliveryTime: "10-20 min",
    hasOffers: false,
  },
  {
    id: 3,
    name: "The Posh Bagel",
    image: "https://tb-static.uber.com/prod/image-proc/processed_images/53f3e89c9c6e0b7921913bc79e0dc7a1/719c6bd2757b08684c0faae44d43159d.jpeg",
    rating: 4.8,
    deliveryFee: 0.49,
    deliveryTime: "10-20 min",
    hasOffers: true,
  },
];

const Home: React.FC = () => {
  const [favorites, setFavorites] = React.useState<number[]>([]);

  const handleFavoriteClick = (restaurantId: number) => {
    setFavorites(prev => 
      prev.includes(restaurantId)
        ? prev.filter(id => id !== restaurantId)
        : [...prev, restaurantId]
    );
  };

  return (
    <Box sx={{ pb: 7 }}>
      <Header />
      
      <Box sx={{ mt: 8 }}>
        <CategoryNav />
        
        <Container maxWidth="sm">
          {/* National Brands Section */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, px: 2 }}>
              National brands
            </Typography>
            <Grid container spacing={2}>
              {restaurants.slice(0, 2).map(restaurant => (
                <Grid item xs={12} key={restaurant.id}>
                  <RestaurantCard
                    {...restaurant}
                    isFavorite={favorites.includes(restaurant.id)}
                    onFavoriteClick={() => handleFavoriteClick(restaurant.id)}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Hot Spots Section */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, px: 2 }}>
              Hot spots
            </Typography>
            <Grid container spacing={2}>
              {restaurants.map(restaurant => (
                <Grid item xs={12} key={restaurant.id}>
                  <RestaurantCard
                    {...restaurant}
                    isFavorite={favorites.includes(restaurant.id)}
                    onFavoriteClick={() => handleFavoriteClick(restaurant.id)}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>

      <BottomNav />
    </Box>
  );
};

export default Home; 