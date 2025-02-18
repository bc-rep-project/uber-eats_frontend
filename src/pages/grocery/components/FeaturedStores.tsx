import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Chip, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

interface Store {
  id: string;
  name: string;
  deliveryTime: string;
  deliveryFee: number;
  imageUrl: string;
  hasOffers: boolean;
}

interface FeaturedStoresProps {
  stores: Store[];
}

const StoreCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-4px)',
    transition: 'transform 0.2s ease-in-out',
  },
}));

const OfferChip = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  left: theme.spacing(1),
  backgroundColor: theme.palette.success.main,
  color: 'white',
}));

const FeaturedStores: React.FC<FeaturedStoresProps> = ({ stores }) => {
  return (
    <Grid container spacing={2}>
      {stores.map((store) => (
        <Grid item xs={12} sm={6} md={4} key={store.id}>
          <StoreCard>
            <Box sx={{ position: 'relative' }}>
              <CardMedia
                component="img"
                height="160"
                image={store.imageUrl}
                alt={store.name}
              />
              {store.hasOffers && (
                <OfferChip
                  icon={<LocalOfferIcon />}
                  label="Offers available"
                  size="small"
                />
              )}
            </Box>
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom>
                {store.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
            </CardContent>
          </StoreCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default FeaturedStores; 