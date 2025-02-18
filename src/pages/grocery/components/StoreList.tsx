import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Rating, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface Store {
  id: string;
  name: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  imageUrl: string;
  offerText?: string;
}

const stores: Store[] = [
  {
    id: '1',
    name: 'Lucky California',
    rating: 4.6,
    deliveryTime: '30-50 min',
    deliveryFee: 0.99,
    imageUrl: 'https://tb-static.uber.com/prod/image-proc/processed_images/3c3d111e7d53fa962724747d0d16fe67/719c6bd2757b08684c0faae44d43159d.jpeg',
    offerText: 'Save on Select Items',
  },
  {
    id: '2',
    name: 'Target',
    rating: 4.7,
    deliveryTime: '25-45 min',
    deliveryFee: 0.49,
    imageUrl: 'https://tb-static.uber.com/prod/image-proc/processed_images/9e0c6236d4821f3b1e88b727133af9a1/719c6bd2757b08684c0faae44d43159d.jpeg',
    offerText: 'Save on Select Items',
  },
];

const StoreCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-4px)',
    transition: 'transform 0.2s ease-in-out',
  },
}));

const FavoriteButton = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  backgroundColor: 'white',
  borderRadius: '50%',
  padding: theme.spacing(0.5),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.grey[100],
  },
}));

const StoreList: React.FC = () => {
  return (
    <Grid container spacing={2}>
      {stores.map((store) => (
        <Grid item xs={12} key={store.id}>
          <StoreCard>
            <Box sx={{ position: 'relative', width: 200, flexShrink: 0 }}>
              <CardMedia
                component="img"
                height="160"
                image={store.imageUrl}
                alt={store.name}
              />
              <FavoriteButton>
                <FavoriteBorderIcon />
              </FavoriteButton>
            </Box>
            <CardContent sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Typography variant="h6" component="div">
                  {store.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Rating value={store.rating} precision={0.1} size="small" readOnly />
                  <Typography variant="body2" color="text.secondary">
                    {store.rating}
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                <AccessTimeIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  {store.deliveryTime}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  •
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ${store.deliveryFee.toFixed(2)} Delivery Fee
                </Typography>
              </Box>

              {store.offerText && (
                <Typography 
                  variant="body2" 
                  color="success.main" 
                  sx={{ mt: 1 }}
                >
                  {store.offerText}
                </Typography>
              )}
            </CardContent>
          </StoreCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default StoreList; 