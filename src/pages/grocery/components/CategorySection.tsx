import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface CategorySectionProps {
  categories: Category[];
}

const ScrollContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  overflowX: 'auto',
  gap: theme.spacing(4),
  padding: theme.spacing(2, 0),
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  scrollbarWidth: 'none',
}));

const CategoryItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(1),
  cursor: 'pointer',
  minWidth: '60px',
  '&:hover': {
    opacity: 0.8,
  },
}));

const IconContainer = styled(Box)(({ theme }) => ({
  width: '48px',
  height: '48px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '24px',
  backgroundColor: theme.palette.grey[100],
  borderRadius: '12px',
}));

const CategorySection: React.FC<CategorySectionProps> = ({ categories }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <ScrollContainer>
        {categories.map((category) => (
          <CategoryItem key={category.id}>
            <IconContainer>
              {category.icon}
            </IconContainer>
            <Typography variant="body2" align="center" sx={{ fontSize: '0.875rem' }}>
              {category.name}
            </Typography>
          </CategoryItem>
        ))}
      </ScrollContainer>
    </Box>
  );
};

export default CategorySection; 