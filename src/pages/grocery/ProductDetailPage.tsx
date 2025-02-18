import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Card,
  CardMedia,
  IconButton,
  Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { GroceryProduct } from '../../types/grocery';

const QuantityButton = styled(IconButton)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
}));

const mockProduct: GroceryProduct = {
  id: '1',
  name: 'Birch Benders Organic Buttermilk Pancake Mix',
  description: 'Organic pancake and waffle mix made with wholesome ingredients',
  price: 5.80,
  originalPrice: 7.30,
  imageUrl: 'https://example.com/pancake-mix.jpg',
  unit: '16 oz',
  calories: '110 Cal.',
  category: 'Breakfast & Cereal',
  aisle: 'Aisle 7',
  inStock: true,
};

const ProductDetailPage: React.FC = () => {
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState('');
  const [replacementPreference, setReplacementPreference] = useState<string>('SIMILAR_ITEM');

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  const handleAddToCart = () => {
    // Add to cart with note and replacement preference
    console.log({
      productId: mockProduct.id,
      quantity,
      note,
      replacementPreference,
    });
  };

  return (
    <Box sx={{ pb: 7 }}>
      {/* Product Image and Basic Info */}
      <Card elevation={0}>
        <CardMedia
          component="img"
          height="300"
          image={mockProduct.imageUrl}
          alt={mockProduct.name}
        />
      </Card>

      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          {mockProduct.name}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 2 }}>
          <Typography variant="h6" color="primary">
            ${mockProduct.price.toFixed(2)}
          </Typography>
          {mockProduct.originalPrice && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textDecoration: 'line-through' }}
            >
              ${mockProduct.originalPrice.toFixed(2)}
            </Typography>
          )}
          <Typography variant="body2" color="text.secondary">
            • {mockProduct.unit}
          </Typography>
        </Box>

        {/* Quantity Selector */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <QuantityButton onClick={() => handleQuantityChange(-1)}>
            <RemoveIcon />
          </QuantityButton>
          <Typography>{quantity}</Typography>
          <QuantityButton onClick={() => handleQuantityChange(1)}>
            <AddIcon />
          </QuantityButton>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Note Section */}
        <Typography variant="subtitle1" gutterBottom>
          Add a note (optional)
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={2}
          placeholder="Add any special instructions"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          sx={{ mb: 3 }}
        />

        {/* Replacement Preferences */}
        <Typography variant="subtitle1" gutterBottom>
          If this item is unavailable
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup
            value={replacementPreference}
            onChange={(e) => setReplacementPreference(e.target.value)}
          >
            <FormControlLabel
              value="SIMILAR_ITEM"
              control={<Radio />}
              label="Pick a similar item"
            />
            <FormControlLabel
              value="REFUND"
              control={<Radio />}
              label="Don't replace and refund"
            />
            <FormControlLabel
              value="CONTACT_ME"
              control={<Radio />}
              label="Contact me"
            />
          </RadioGroup>
        </FormControl>

        {/* Add to Cart Button */}
        <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, p: 2, bgcolor: 'background.paper' }}>
          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={handleAddToCart}
          >
            Add {quantity} to cart • ${(mockProduct.price * quantity).toFixed(2)}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetailPage; 