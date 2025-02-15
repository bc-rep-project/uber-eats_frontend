import React from 'react';
import { Box, Chip, IconButton, Typography, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Category, FilterOption, SortOption } from '../../types/restaurant';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';

const ScrollContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  overflowX: 'auto',
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  scrollbarWidth: 'none',
}));

const CategoryChip = styled(Chip)(({ theme }) => ({
  borderRadius: '24px',
  padding: theme.spacing(1),
  '& .MuiChip-label': {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
}));

const FilterContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  padding: theme.spacing(0, 2),
  marginBottom: theme.spacing(2),
}));

interface CategoryNavProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string) => void;
  onFilterSelect: (filterId: string) => void;
  onSortSelect: (sortId: string) => void;
}

const defaultCategories: Category[] = [
  { id: 'breakfast', name: 'Breakfast', icon: 'FastfoodIcon' },
  { id: 'coffee', name: 'Coffee', icon: 'LocalCafeIcon' },
  { id: 'chinese', name: 'Chinese', icon: 'RestaurantIcon' },
  { id: 'healthy', name: 'Healthy', icon: 'EmojiFoodBeverageIcon' },
  { id: 'pizza', name: 'Pizza', icon: 'LocalPizzaIcon' },
  { id: 'asian', name: 'Asian', icon: 'RamenDiningIcon' },
];

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'FastfoodIcon':
      return <FastfoodIcon />;
    case 'LocalCafeIcon':
      return <LocalCafeIcon />;
    case 'RestaurantIcon':
      return <RestaurantIcon />;
    case 'LocalPizzaIcon':
      return <LocalPizzaIcon />;
    case 'RamenDiningIcon':
      return <RamenDiningIcon />;
    case 'EmojiFoodBeverageIcon':
      return <EmojiFoodBeverageIcon />;
    default:
      return <FastfoodIcon />;
  }
};

const CategoryNav: React.FC<CategoryNavProps> = ({
  categories = defaultCategories,
  selectedCategory,
  onCategorySelect,
  onFilterSelect,
  onSortSelect,
}) => {
  const theme = useTheme();

  return (
    <Box>
      <ScrollContainer>
        {categories.map((category) => (
          <CategoryChip
            key={category.id}
            icon={getIconComponent(category.icon)}
            label={category.name}
            onClick={() => onCategorySelect(category.id)}
            variant={selectedCategory === category.id ? 'filled' : 'outlined'}
            color={selectedCategory === category.id ? 'primary' : 'default'}
          />
        ))}
      </ScrollContainer>

      <FilterContainer>
        <Chip
          label="Rating"
          variant="outlined"
          onClick={() => onFilterSelect('rating')}
        />
        <Chip
          label="Price"
          variant="outlined"
          onClick={() => onFilterSelect('price')}
        />
        <Chip
          label="Dietary"
          variant="outlined"
          onClick={() => onFilterSelect('dietary')}
        />
        <Chip
          label="Sort"
          variant="outlined"
          onClick={() => onSortSelect('sort')}
        />
      </FilterContainer>
    </Box>
  );
};

export default CategoryNav; 