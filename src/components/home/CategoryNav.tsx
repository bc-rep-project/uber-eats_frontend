import React from 'react';
import { Box, Chip, Typography, IconButton, Stack, Divider } from '@mui/material';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';
import TakeoutDiningIcon from '@mui/icons-material/TakeoutDining';
import StarIcon from '@mui/icons-material/Star';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';

const categories = [
  { icon: <FastfoodIcon />, label: 'Fast Food' },
  { icon: <LocalCafeIcon />, label: 'Coffee' },
  { icon: <RestaurantIcon />, label: 'Chinese' },
  { icon: <LocalPizzaIcon />, label: 'Pizza' },
  { icon: <RamenDiningIcon />, label: 'Korean' },
  { icon: <SoupKitchenIcon />, label: 'Thai' },
  { icon: <TakeoutDiningIcon />, label: 'Mexican' },
];

const filters = [
  { icon: <StarIcon />, label: 'Rating' },
  { icon: <AttachMoneyIcon />, label: 'Price' },
  { icon: <FilterListIcon />, label: 'Dietary' },
  { icon: <SortIcon />, label: 'Sort' },
];

const CategoryNav: React.FC = () => {
  return (
    <Box sx={{ py: 2 }}>
      {/* Food Categories */}
      <Box sx={{ mb: 2, overflowX: 'auto', whiteSpace: 'nowrap', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}>
        <Stack 
          direction="row" 
          spacing={1} 
          sx={{ 
            px: 2,
            '&::-webkit-scrollbar': { display: 'none' }
          }}
        >
          {categories.map((category, index) => (
            <Chip
              key={index}
              icon={category.icon}
              label={category.label}
              clickable
              sx={{
                borderRadius: '20px',
                px: 1,
                '&:hover': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                  '& .MuiSvgIcon-root': {
                    color: 'white',
                  },
                },
              }}
            />
          ))}
        </Stack>
      </Box>

      <Divider />

      {/* Filters */}
      <Box sx={{ pt: 1, overflowX: 'auto', whiteSpace: 'nowrap' }}>
        <Stack 
          direction="row" 
          spacing={1}
          sx={{ 
            px: 2,
            '&::-webkit-scrollbar': { display: 'none' }
          }}
        >
          {filters.map((filter, index) => (
            <Chip
              key={index}
              icon={filter.icon}
              label={filter.label}
              variant="outlined"
              clickable
              sx={{
                borderRadius: '20px',
                px: 1,
              }}
            />
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default CategoryNav; 