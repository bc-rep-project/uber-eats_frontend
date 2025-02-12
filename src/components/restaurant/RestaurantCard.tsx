import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  Rating,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

interface RestaurantCardProps {
  name: string;
  image: string;
  rating: number;
  deliveryFee: number;
  deliveryTime: string;
  hasOffers?: boolean;
  isFavorite?: boolean;
  onFavoriteClick?: () => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  name,
  image,
  rating,
  deliveryFee,
  deliveryTime,
  hasOffers = false,
  isFavorite = false,
  onFavoriteClick,
}) => {
  return (
    <Card sx={{ position: 'relative', mb: 2 }}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="160"
          image={image}
          alt={name}
          sx={{ objectFit: 'cover' }}
        />
        <IconButton
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: 'white',
            '&:hover': { backgroundColor: 'white' },
          }}
          onClick={onFavoriteClick}
        >
          {isFavorite ? (
            <FavoriteIcon color="error" />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>
        {hasOffers && (
          <Chip
            icon={<LocalOfferIcon />}
            label="Offers available"
            size="small"
            color="success"
            sx={{
              position: 'absolute',
              bottom: 8,
              left: 8,
              backgroundColor: '#00a082',
              color: 'white',
            }}
          />
        )}
      </Box>

      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
              {name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
              <Rating value={rating} precision={0.1} size="small" readOnly />
              <Typography variant="body2" color="text.secondary">
                {rating}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <AccessTimeIcon fontSize="small" />
              {deliveryTime}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            ${deliveryFee.toFixed(2)} Delivery Fee
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RestaurantCard; 