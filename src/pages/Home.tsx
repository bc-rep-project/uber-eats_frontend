import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Rating,
  Chip,
  TextField,
  InputAdornment,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

// Mock data - Replace with actual API call
const restaurants = [
  {
    id: '1',
    name: 'Burger Palace',
    image: 'https://source.unsplash.com/800x600/?burger',
    cuisine: ['American', 'Fast Food'],
    rating: 4.5,
    deliveryTime: '20-30',
    priceRange: '$$',
  },
  {
    id: '2',
    name: 'Pizza Heaven',
    image: 'https://source.unsplash.com/800x600/?pizza',
    cuisine: ['Italian', 'Pizza'],
    rating: 4.3,
    deliveryTime: '25-35',
    priceRange: '$$',
  },
  {
    id: '3',
    name: 'Sushi Master',
    image: 'https://source.unsplash.com/800x600/?sushi',
    cuisine: ['Japanese', 'Sushi'],
    rating: 4.7,
    deliveryTime: '30-40',
    priceRange: '$$$',
  },
  // Add more restaurants as needed
];

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          placeholder="Search for restaurants or cuisines"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />
        
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip label="All" color="primary" onClick={() => {}} />
          <Chip label="Fast Food" onClick={() => {}} />
          <Chip label="Italian" onClick={() => {}} />
          <Chip label="Japanese" onClick={() => {}} />
          <Chip label="Chinese" onClick={() => {}} />
          <Chip label="Indian" onClick={() => {}} />
        </Box>
      </Box>

      <Grid container spacing={3}>
        {restaurants.map((restaurant) => (
          <Grid item xs={12} sm={6} md={4} key={restaurant.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  transition: 'transform 0.2s ease-in-out',
                },
              }}
              onClick={() => navigate(`/restaurants/${restaurant.id}`)}
            >
              <CardMedia
                component="img"
                height="200"
                image={restaurant.image}
                alt={restaurant.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {restaurant.name}
                </Typography>
                <Box sx={{ mb: 1 }}>
                  {restaurant.cuisine.map((type) => (
                    <Chip
                      key={type}
                      label={type}
                      size="small"
                      sx={{ mr: 0.5, mb: 0.5 }}
                    />
                  ))}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Rating
                    value={restaurant.rating}
                    precision={0.1}
                    readOnly
                    size="small"
                  />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    {restaurant.rating}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {restaurant.deliveryTime} min
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {restaurant.priceRange}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home; 