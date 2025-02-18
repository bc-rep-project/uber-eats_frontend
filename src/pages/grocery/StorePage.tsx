import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  TextField,
  InputAdornment,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Chip,
  Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import { GroceryProduct, GroceryAisle, GroceryStore } from '../../types/grocery';

const ProductCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  '&:hover': {
    transform: 'translateY(-4px)',
    transition: 'transform 0.2s ease-in-out',
  },
}));

const drawerWidth = 280;

interface StorePageProps {
  store: GroceryStore;
  aisles: GroceryAisle[];
  products: GroceryProduct[];
  onProductClick: (productId: string) => void;
  onAddToCart: (product: GroceryProduct) => void;
}

const StorePage: React.FC<StorePageProps> = ({
  store,
  aisles,
  products,
  onProductClick,
  onAddToCart,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAisle, setSelectedAisle] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesAisle = !selectedAisle || product.aisle === selectedAisle;
    return matchesSearch && matchesAisle;
  });

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setIsDrawerOpen(open);
    };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Aisles Drawer */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Aisles
          </Typography>
          <List>
            {aisles.map((aisle) => (
              <ListItem key={aisle.id} disablePadding>
                <ListItemButton
                  selected={selectedAisle === aisle.id}
                  onClick={() => {
                    setSelectedAisle(aisle.id);
                    setIsDrawerOpen(false);
                  }}
                >
                  <ListItemText primary={aisle.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Container maxWidth="lg">
          {/* Store header */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" gutterBottom>
              {store.name}
            </Typography>
            <Typography color="text.secondary">
              {store.deliveryTime.min}-{store.deliveryTime.max} min •{' '}
              ${store.deliveryFee.toFixed(2)} Delivery Fee
            </Typography>
          </Box>

          {/* Search and filter */}
          <Box sx={{ mb: 4 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Button
                  variant="outlined"
                  startIcon={<MenuIcon />}
                  onClick={toggleDrawer(true)}
                >
                  Aisles
                </Button>
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth
                  placeholder="Search items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </Box>

          {/* Selected aisle chip */}
          {selectedAisle && (
            <Box sx={{ mb: 2 }}>
              <Chip
                label={aisles.find((a) => a.id === selectedAisle)?.name}
                onDelete={() => setSelectedAisle(null)}
              />
            </Box>
          )}

          {/* Products grid */}
          <Grid container spacing={3}>
            {filteredProducts.map((product) => (
              <Grid item xs={6} sm={4} md={3} key={product.id}>
                <ProductCard>
                  <CardMedia
                    component="img"
                    height="160"
                    image={product.imageUrl}
                    alt={product.name}
                    onClick={() => onProductClick(product.id)}
                    sx={{ cursor: 'pointer' }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      ${product.price.toFixed(2)}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      {product.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {product.unit}
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 1 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={() => onAddToCart(product)}
                    >
                      Add
                    </Button>
                  </Box>
                </ProductCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default StorePage; 