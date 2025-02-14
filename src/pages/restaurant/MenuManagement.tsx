import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Chip,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface CustomizationOption {
  name: string;
  price: number;
}

interface Customization {
  name: string;
  required: boolean;
  multiple_select: boolean;
  options: CustomizationOption[];
}

interface MenuItemType {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url?: string;
  is_available: boolean;
  preparation_time: number;
  customizations: Customization[];
}

interface FormValues {
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  is_available: boolean;
  preparation_time: number;
  customizations: Customization[];
}

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
  price: Yup.number()
    .required('Price is required')
    .min(0, 'Price must be greater than or equal to 0'),
  category: Yup.string().required('Category is required'),
  preparation_time: Yup.number()
    .required('Preparation time is required')
    .min(1, 'Preparation time must be at least 1 minute'),
});

const MenuManagement: React.FC = () => {
  const [items, setItems] = useState<MenuItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItemType | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  const formik = useFormik<FormValues>({
    initialValues: {
      name: '',
      description: '',
      price: 0,
      category: '',
      image_url: '',
      is_available: true,
      preparation_time: 15,
      customizations: [],
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (selectedItem) {
          // Update existing item
          const response = await fetch(`/api/menu-items/${selectedItem.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          });
          
          if (!response.ok) throw new Error('Failed to update menu item');
          
          // Update local state
          setItems(items.map(item => 
            item.id === selectedItem.id ? { ...item, ...values } : item
          ));
        } else {
          // Create new item
          const response = await fetch('/api/menu-items', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          });
          
          if (!response.ok) throw new Error('Failed to create menu item');
          
          const newItem = await response.json();
          setItems([...items, newItem]);
        }
        
        handleCloseDialog();
      } catch (err) {
        setError('Failed to save menu item');
      }
    },
  });

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        // Replace with actual API call
        const response = await fetch('/api/menu-items');
        const data = await response.json();
        setItems(data);
        
        // Extract unique categories
        const menuCategories = data.map((item: MenuItemType) => item.category);
        const uniqueCategories: string[] = Array.from(new Set(menuCategories));
        setCategories(uniqueCategories);
        
        setError(null);
      } catch (err) {
        setError('Failed to load menu items');
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  const handleOpenDialog = (item?: MenuItemType) => {
    if (item) {
      setSelectedItem(item);
      formik.setValues({
        name: item.name,
        description: item.description,
        price: item.price,
        category: item.category,
        image_url: item.image_url || '',
        is_available: item.is_available,
        preparation_time: item.preparation_time,
        customizations: item.customizations,
      });
    } else {
      setSelectedItem(null);
      formik.resetForm();
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedItem(null);
    formik.resetForm();
  };

  const handleDeleteItem = async (itemId: string) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      const response = await fetch(`/api/menu-items/${itemId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete menu item');

      setItems(items.filter(item => item.id !== itemId));
      setError(null);
    } catch (err) {
      setError('Failed to delete menu item');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Menu Items</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add New Item
        </Button>
      </Box>

      <Grid container spacing={3}>
        {items.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card>
              {item.image_url && (
                <CardMedia
                  component="img"
                  height="140"
                  image={item.image_url}
                  alt={item.name}
                />
              )}
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Typography variant="h6" gutterBottom>
                    {item.name}
                  </Typography>
                  <Box>
                    <IconButton size="small" onClick={() => handleOpenDialog(item)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDeleteItem(item.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {item.description}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" color="primary">
                    ${item.price.toFixed(2)}
                  </Typography>
                  <Chip
                    label={item.is_available ? 'Available' : 'Unavailable'}
                    color={item.is_available ? 'success' : 'error'}
                    size="small"
                  />
                </Box>
                <Typography variant="caption" display="block">
                  Category: {item.category}
                </Typography>
                <Typography variant="caption" display="block">
                  Prep Time: {item.preparation_time} mins
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle>
            {selectedItem ? 'Edit Menu Item' : 'Add New Menu Item'}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="name"
                  label="Item Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  name="description"
                  label="Description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  error={formik.touched.description && Boolean(formik.errors.description)}
                  helperText={formik.touched.description && formik.errors.description}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="price"
                  label="Price"
                  type="number"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  error={formik.touched.price && Boolean(formik.errors.price)}
                  helperText={formik.touched.price && formik.errors.price}
                  InputProps={{
                    startAdornment: '$',
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="category"
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    error={formik.touched.category && Boolean(formik.errors.category)}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                    <MenuItem value="new">
                      <AddIcon /> Add New Category
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="image_url"
                  label="Image URL"
                  value={formik.values.image_url}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="preparation_time"
                  label="Preparation Time (minutes)"
                  type="number"
                  value={formik.values.preparation_time}
                  onChange={formik.handleChange}
                  error={formik.touched.preparation_time && Boolean(formik.errors.preparation_time)}
                  helperText={formik.touched.preparation_time && formik.errors.preparation_time}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      name="is_available"
                      checked={formik.values.is_available}
                      onChange={formik.handleChange}
                    />
                  }
                  label="Item Available"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              {selectedItem ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default MenuManagement; 