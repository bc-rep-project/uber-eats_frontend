import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Divider,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { GroceryProduct } from '../../types/grocery';

const QuantityControl = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),
}));

interface ProductDetailProps {
  product: GroceryProduct;
  onAddToCart: (product: GroceryProduct, quantity: number) => void;
  onUpdateReplacementPreference: (
    productId: string,
    preference: 'no_replacement' | 'similar_item' | 'contact_me'
  ) => void;
  onUpdateNotes: (productId: string, notes: string) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  onAddToCart,
  onUpdateReplacementPreference,
  onUpdateNotes,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [replacementPreference, setReplacementPreference] = useState<
    'no_replacement' | 'similar_item' | 'contact_me'
  >(product.replacementPreference || 'similar_item');
  const [notes, setNotes] = useState(product.specialInstructions || '');

  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, quantity + delta);
    setQuantity(newQuantity);
  };

  const handleReplacementChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value as
      | 'no_replacement'
      | 'similar_item'
      | 'contact_me';
    setReplacementPreference(value);
    onUpdateReplacementPreference(product.id, value);
  };

  const handleNotesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNotes(event.target.value);
    onUpdateNotes(product.id, event.target.value);
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ mb: 4 }}>
        <CardMedia
          component="img"
          height="300"
          image={product.imageUrl}
          alt={product.name}
        />
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {product.name}
          </Typography>
          
          {product.description && (
            <Typography color="text.secondary" paragraph>
              {product.description}
            </Typography>
          )}

          <Typography variant="h6" color="primary" gutterBottom>
            ${product.price.toFixed(2)}
            {product.originalPrice && (
              <Typography
                component="span"
                sx={{
                  textDecoration: 'line-through',
                  color: 'text.secondary',
                  ml: 1,
                }}
              >
                ${product.originalPrice.toFixed(2)}
              </Typography>
            )}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {product.unit}
          </Typography>

          <QuantityControl>
            <IconButton
              size="small"
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
            >
              <RemoveIcon />
            </IconButton>
            <Typography>{quantity}</Typography>
            <IconButton
              size="small"
              onClick={() => handleQuantityChange(1)}
            >
              <AddIcon />
            </IconButton>
          </QuantityControl>
        </CardContent>
      </Card>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <FormControl component="fieldset">
            <FormLabel component="legend">
              If this item is unavailable
            </FormLabel>
            <RadioGroup
              value={replacementPreference}
              onChange={handleReplacementChange}
            >
              <FormControlLabel
                value="similar_item"
                control={<Radio />}
                label="Pick a similar item"
              />
              <FormControlLabel
                value="contact_me"
                control={<Radio />}
                label="Contact me about a replacement"
              />
              <FormControlLabel
                value="no_replacement"
                control={<Radio />}
                label="Don't replace"
              />
            </RadioGroup>
          </FormControl>
        </CardContent>
      </Card>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="subtitle1" gutterBottom>
            Add notes for shopper
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="Add any special instructions..."
            value={notes}
            onChange={handleNotesChange}
          />
        </CardContent>
      </Card>

      <Button
        variant="contained"
        fullWidth
        size="large"
        onClick={() => onAddToCart(product, quantity)}
      >
        Add {quantity} to cart • ${(product.price * quantity).toFixed(2)}
      </Button>
    </Container>
  );
};

export default ProductDetail; 