import React from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  calories?: string;
  imageUrl: string;
}

interface DailyOffersProps {
  products: Product[];
}

const ProductCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
  transition: 'transform 0.2s ease-in-out',
}));

const ProductImage = styled('img')({
  width: '100%',
  height: '160px',
  objectFit: 'cover',
});

const AddButton = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(1),
  right: theme.spacing(1),
  backgroundColor: theme.palette.common.white,
  borderRadius: '50%',
  width: '32px',
  height: '32px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  boxShadow: theme.shadows[2],
  '&:hover': {
    backgroundColor: theme.palette.grey[100],
  },
}));

const DailyOffers: React.FC<DailyOffersProps> = ({ products }) => {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
          Prep brunch for Mom
        </Typography>
        <Typography variant="body2" color="text.secondary">
          From Safeway
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard>
              <Box sx={{ position: 'relative' }}>
                <ProductImage
                  src={product.imageUrl}
                  alt={product.name}
                />
                <AddButton>
                  <AddIcon />
                </AddButton>
              </Box>
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom noWrap>
                  {product.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 1 }}>
                  <Typography variant="body1" color="primary" sx={{ fontWeight: 500 }}>
                    ${product.price.toFixed(2)}
                  </Typography>
                  {product.originalPrice && (
                    <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                      ${product.originalPrice.toFixed(2)}
                    </Typography>
                  )}
                  {product.calories && (
                    <>
                      <Typography color="text.secondary">•</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {product.calories}
                      </Typography>
                    </>
                  )}
                </Box>
              </CardContent>
            </ProductCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DailyOffers; 