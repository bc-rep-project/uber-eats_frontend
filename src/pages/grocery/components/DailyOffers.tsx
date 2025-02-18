import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Button, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  calories?: string;
  imageUrl: string;
}

const products: Product[] = [
  {
    id: '1',
    name: 'Birch Benders Organic Buttermilk Pancake Mix',
    price: 5.80,
    originalPrice: 7.30,
    calories: '110 Cal.',
    imageUrl: 'https://tb-static.uber.com/prod/image-proc/processed_images/2e7f4b23c6d9d8f9c05d8573ab50a8b1/719c6bd2757b08684c0faae44d43159d.jpeg',
  },
  {
    id: '2',
    name: 'Pearl Milling Company Complete Pancake Mix',
    price: 5.21,
    originalPrice: 6.51,
    calories: '160 Cal.',
    imageUrl: 'https://tb-static.uber.com/prod/image-proc/processed_images/ec9d81e31e4e558e7c6b5f3c6f2a3cb3/719c6bd2757b08684c0faae44d43159d.jpeg',
  },
];

const ProductCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-4px)',
    transition: 'transform 0.2s ease-in-out',
  },
}));

const AddButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(1),
  right: theme.spacing(1),
  minWidth: 'auto',
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  padding: 0,
}));

const DailyOffers: React.FC = () => {
  return (
    <Grid container spacing={2}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={3} key={product.id}>
          <ProductCard>
            <CardMedia
              component="img"
              height="160"
              image={product.imageUrl}
              alt={product.name}
            />
            <CardContent>
              <Typography variant="body1" component="div" gutterBottom noWrap>
                {product.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 1 }}>
                <Typography variant="h6" color="primary">
                  ${product.price.toFixed(2)}
                </Typography>
                {product.originalPrice && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ textDecoration: 'line-through' }}
                  >
                    ${product.originalPrice.toFixed(2)}
                  </Typography>
                )}
              </Box>
              {product.calories && (
                <Typography variant="body2" color="text.secondary">
                  {product.calories}
                </Typography>
              )}
              <AddButton variant="contained" color="primary">
                +
              </AddButton>
            </CardContent>
          </ProductCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default DailyOffers; 