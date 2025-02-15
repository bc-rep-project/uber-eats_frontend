import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
  Chip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Restaurant } from '../../types/restaurant';

const StyledCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-4px)',
    transition: 'transform 0.2s ease-in-out',
  },
}));

const FavoriteButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  backgroundColor: 'white',
  '&:hover': {
    backgroundColor: 'white',
  },
}));

const OfferChip = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  left: theme.spacing(1),
  backgroundColor: theme.palette.success.main,
  color: 'white',
}));

interface RestaurantCardProps {
  restaurant: Restaurant;
  onFavoriteClick: (restaurantId: string) => void;
  onClick: (restaurantId: string) => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  onFavoriteClick,
  onClick,
}) => {
  const {
    id,
    name,
    imageUrl,
    rating,
    deliveryTime,
    deliveryFee,
    isLiked,
    offers,
  } = restaurant;

  return (
    <StyledCard onClick={() => onClick(id)}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="200"
          image={imageUrl}
          alt={name}
        />
        <FavoriteButton
          onClick={(e) => {
            e.stopPropagation();
            onFavoriteClick(id);
          }}
          size="small"
        >
          {isLiked ? (
            <FavoriteIcon color="error" />
          ) : (
            <FavoriteBorderIcon />
          )}
        </FavoriteButton>
        {offers && offers.length > 0 && (
          <OfferChip
            label={offers[0].text}
            size="small"
          />
        )}
      </Box>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Typography variant="h6" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {rating}★
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AccessTimeIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
              {deliveryTime.min}-{deliveryTime.max} min
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            •
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ${deliveryFee.toFixed(2)} Delivery Fee
          </Typography>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default RestaurantCard; 