import React from 'react';
import { Box, Container, Grid, Typography, Card, CardMedia, CardContent, Rating } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const Home: React.FC = () => {
  return (
    <Box>
      {/* Address Bar */}
      <Box sx={{ py: 2, px: 3, borderBottom: 1, borderColor: 'grey.100' }}>
        <Typography variant="subtitle1">
          Deliver now • 1226 University Dr
        </Typography>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {/* Restaurant Cards */}
          {restaurants.map((restaurant) => (
            <Grid item xs={12} sm={6} md={4} key={restaurant.id}>
              <Card 
                sx={{ 
                  cursor: 'pointer',
                  '&:hover': { transform: 'scale(1.02)' },
                  transition: 'transform 0.2s',
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={restaurant.image}
                  alt={restaurant.name}
                />
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="h6">{restaurant.name}</Typography>
                    <Rating value={restaurant.rating} precision={0.1} readOnly size="small" />
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', color: 'grey.600' }}>
                    <AccessTimeIcon sx={{ fontSize: 16, mr: 0.5 }} />
                    <Typography variant="body2">
                      {restaurant.deliveryTime} min • ${restaurant.deliveryFee} Delivery Fee
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

const restaurants = [
  {
    id: 1,
    name: "Andronico's Community Markets",
    image: "/images/andronicos.jpg",
    rating: 4.7,
    deliveryTime: "35-55",
    deliveryFee: 11.99,
  },
  // Add more restaurants...
];

export default Home; 