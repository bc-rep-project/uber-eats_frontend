import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { GroceryCategory } from '../../../services/groceryService';

interface CategoryScrollProps {
  categories: GroceryCategory[];
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string) => void;
}

const ScrollContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  overflowX: 'auto',
  gap: theme.spacing(3),
  padding: theme.spacing(2, 0),
  marginBottom: theme.spacing(3),
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  scrollbarWidth: 'none',
}));

const CategoryItem = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isSelected',
})<{ isSelected?: boolean }>(({ theme, isSelected }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(1),
  cursor: 'pointer',
  minWidth: '80px',
  opacity: isSelected ? 1 : 0.7,
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    opacity: 1,
    transform: 'translateY(-2px)',
  },
}));

const IconContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isSelected',
})<{ isSelected?: boolean }>(({ theme, isSelected }) => ({
  width: '48px',
  height: '48px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '24px',
  marginBottom: theme.spacing(0.5),
  borderRadius: '50%',
  backgroundColor: isSelected ? theme.palette.primary.main : 'transparent',
  color: isSelected ? theme.palette.primary.contrastText : 'inherit',
  transition: 'all 0.2s ease-in-out',
}));

const CategoryScroll: React.FC<CategoryScrollProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
}) => {
  return (
    <ScrollContainer>
      {categories.map((category) => (
        <CategoryItem
          key={category.id}
          isSelected={selectedCategory === category.id}
          onClick={() => onCategorySelect(category.id)}
        >
          <IconContainer isSelected={selectedCategory === category.id}>
            {category.icon}
          </IconContainer>
          <Typography
            variant="body2"
            align="center"
            sx={{
              fontSize: '0.875rem',
              fontWeight: selectedCategory === category.id ? 600 : 500,
              whiteSpace: 'nowrap',
              color: selectedCategory === category.id ? 'primary.main' : 'text.primary',
            }}
          >
            {category.name}
          </Typography>
        </CategoryItem>
      ))}
    </ScrollContainer>
  );
};

export default CategoryScroll; 