import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface CategoryScrollProps {
  categories: Category[];
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

const CategoryItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(1),
  cursor: 'pointer',
  minWidth: '80px',
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
  marginBottom: theme.spacing(0.5),
}));

const CategoryScroll: React.FC<CategoryScrollProps> = ({ categories }) => {
  return (
    <ScrollContainer>
      {categories.map((category) => (
        <CategoryItem key={category.id}>
          <IconContainer>
            {category.icon}
          </IconContainer>
          <Typography
            variant="body2"
            align="center"
            sx={{
              fontSize: '0.875rem',
              fontWeight: 500,
              whiteSpace: 'nowrap',
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