import React from 'react';
import { Box, Card, CardContent, Typography, Grid, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface Store {
  id: string;
  name: string;
  deliveryTime: string;
  imageUrl: string;
  offers?: string;
}

interface FeaturedStoresProps {
  stores: Store[];
}

const StoreCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  cursor: 'pointer',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
}));

const StoreImage = styled('img')({
  width: '100%',
  height: '140px',
  objectFit: 'cover',
});

const OffersChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.success.main,
  color: theme.palette.common.white,
  position: 'absolute',
  top: theme.spacing(1),
  left: theme.spacing(1),
}));

const FeaturedStores: React.FC<FeaturedStoresProps> = ({ stores }) => {
  return (
    <Grid container spacing={2}>
      {stores.map((store) => (
        <Grid item xs={12} sm={6} md={4} key={store.id}>
          <StoreCard>
            <Box sx={{ position: 'relative' }}>
              <StoreImage
                src={store.imageUrl}
                alt={store.name}
              />
              {store.offers && (
                <OffersChip
                  label={store.offers}
                  size="small"
                />
              )}
            </Box>
            <CardContent>
              <Typography variant="h6" component="h3" gutterBottom>
                {store.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <AccessTimeIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  {store.deliveryTime} min
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