import React from 'react';
import { Box, Card, CardContent, Typography, Grid, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

interface Store {
  id: string;
  name: string;
  deliveryTime: string;
  deliveryFee: number;
  rating: number;
  imageUrl: string;
  offers?: string;
}

interface StoreSectionProps {
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
  height: '160px',
  objectFit: 'cover',
});

const OffersChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.success.main,
  color: theme.palette.common.white,
  position: 'absolute',
  top: theme.spacing(1),
  left: theme.spacing(1),
}));

const FavoriteButton = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  backgroundColor: theme.palette.common.white,
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

const StoreSection: React.FC<StoreSectionProps> = ({ stores }) => {
  return (
    <Grid container spacing={2}>
      {stores.map((store) => (
        <Grid item xs={12} sm={6} key={store.id}>
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
              <FavoriteButton>
                <FavoriteBorderIcon />
              </FavoriteButton>
            </Box>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="h6" component="h3">
                  {store.name}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {store.rating}★
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <MonetizationOnIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    ${store.deliveryFee.toFixed(2)} Delivery Fee
                  </Typography>
                </Box>
                <Typography color="text.secondary">•</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <AccessTimeIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {store.deliveryTime} min
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </StoreCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default StoreSection; 