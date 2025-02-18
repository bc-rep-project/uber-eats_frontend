import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  Grid,
  IconButton,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { GroceryProduct, GroceryAisle } from '../../types/grocery';

const SearchBar = styled(TextField)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  borderRadius: theme.shape.borderRadius,
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: 'none',
    },
  },
}));

const mockAisles: GroceryAisle[] = [
  {
    id: '1',
    name: 'Breakfast & Cereal',
    products: [
      {
        id: '1',
        name: 'Birch Benders Organic Buttermilk Pancake Mix',
        price: 5.80,
        originalPrice: 7.30,
        imageUrl: 'https://example.com/pancake.jpg',
        unit: '16 oz',
        category: 'Breakfast',
        inStock: true,
      },
      {
        id: '2',
        name: 'Pearl Milling Company Complete Pancake Mix',
        price: 5.21,
        originalPrice: 6.51,
        imageUrl: 'https://example.com/pearl.jpg',
        unit: '16 oz',
        category: 'Breakfast',
        inStock: true,
      },
    ],
  },
  {
    id: '2',
    name: 'Fresh Produce',
    products: [
      {
        id: '3',
        name: 'Organic Blueberries',
        price: 10.11,
        imageUrl: 'https://example.com/blueberries.jpg',
        unit: '18 oz',
        category: 'Produce',
        inStock: true,
      },
    ],
  },
];

const StoreDetailPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAisle, setSelectedAisle] = useState<string | null>(null);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Implement search logic
  };

  const handleAisleSelect = (aisleId: string) => {
    setSelectedAisle(aisleId === selectedAisle ? null : aisleId);
  };

  const handleAddToCart = (productId: string) => {
    // Add to cart logic
  };

  const filteredAisles = mockAisles.map(aisle => ({
    ...aisle,
    products: aisle.products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(aisle => aisle.products.length > 0);

  return (
    <Box sx={{ pb: 7 }}>
      {/* Search Bar */}
      <Box sx={{ p: 2, position: 'sticky', top: 0, bgcolor: 'background.paper', zIndex: 1 }}>
        <SearchBar
          fullWidth
          placeholder="Search items in store"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Aisle Navigation */}
      <Box sx={{ overflowX: 'auto', whiteSpace: 'nowrap', p: 2 }}>
        {mockAisles.map((aisle) => (
          <Chip
            key={aisle.id}
            label={aisle.name}
            onClick={() => handleAisleSelect(aisle.id)}
            variant={selectedAisle === aisle.id ? 'filled' : 'outlined'}
            sx={{ mr: 1 }}
          />
        ))}
      </Box>

      {/* Products List */}
      <Box sx={{ p: 2 }}>
        {filteredAisles.map((aisle) => (
          <Box key={aisle.id} sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              {aisle.name}
            </Typography>
            <List>
              {aisle.products.map((product, index) => (
                <React.Fragment key={product.id}>
                  {index > 0 && <Divider />}
                  <ListItem>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={3}>
                        <Card>
                          <CardContent sx={{ p: 1 }}>
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              style={{ width: '100%', height: 'auto' }}
                            />
                          </CardContent>
                        </Card>
                      </Grid>
                      <Grid item xs={9}>
                        <ListItemText
                          primary={product.name}
                          secondary={
                            <Box>
                              <Typography variant="body2" color="text.secondary">
                                {product.unit}
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                                <Typography variant="subtitle1">
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
                            </Box>
                          }
                        />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            onClick={() => handleAddToCart(product.id)}
                          >
                            <AddIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </Grid>
                    </Grid>
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default StoreDetailPage; 