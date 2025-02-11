import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Alert,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  reorderPoint: number;
  cost: number;
  supplier: string;
  lastRestocked: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  quantity: Yup.number().min(0, 'Quantity must be positive').required('Quantity is required'),
  unit: Yup.string().required('Unit is required'),
  reorderPoint: Yup.number().min(0, 'Reorder point must be positive').required('Reorder point is required'),
  cost: Yup.number().min(0, 'Cost must be positive').required('Cost is required'),
  supplier: Yup.string().required('Supplier is required'),
});

const InventoryManagement: React.FC = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  useEffect(() => {
    fetchInventoryItems();
  }, []);

  const fetchInventoryItems = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      const response = await fetch('/api/inventory');
      const data = await response.json();
      setItems(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch inventory items');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: Partial<InventoryItem>, { resetForm }: any) => {
    try {
      // TODO: Replace with actual API call
      if (selectedItem) {
        await fetch(`/api/inventory/${selectedItem.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });
      } else {
        await fetch('/api/inventory', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });
      }
      
      await fetchInventoryItems();
      handleCloseDialog();
      resetForm();
    } catch (err) {
      setError('Failed to save inventory item');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      // TODO: Replace with actual API call
      await fetch(`/api/inventory/${id}`, {
        method: 'DELETE',
      });
      await fetchInventoryItems();
    } catch (err) {
      setError('Failed to delete inventory item');
    }
  };

  const handleOpenDialog = (item?: InventoryItem) => {
    setSelectedItem(item || null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedItem(null);
    setOpenDialog(false);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5">Inventory Management</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Item
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Unit</TableCell>
              <TableCell>Reorder Point</TableCell>
              <TableCell>Cost</TableCell>
              <TableCell>Supplier</TableCell>
              <TableCell>Last Restocked</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow
                key={item.id}
                sx={{ backgroundColor: item.quantity <= item.reorderPoint ? '#fff3e0' : 'inherit' }}
              >
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.unit}</TableCell>
                <TableCell>{item.reorderPoint}</TableCell>
                <TableCell>${item.cost.toFixed(2)}</TableCell>
                <TableCell>{item.supplier}</TableCell>
                <TableCell>{new Date(item.lastRestocked).toLocaleDateString()}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenDialog(item)} size="small">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(item.id)} size="small" color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedItem ? 'Edit Inventory Item' : 'Add Inventory Item'}
        </DialogTitle>
        <Formik
          initialValues={{
            name: selectedItem?.name || '',
            quantity: selectedItem?.quantity || 0,
            unit: selectedItem?.unit || '',
            reorderPoint: selectedItem?.reorderPoint || 0,
            cost: selectedItem?.cost || 0,
            supplier: selectedItem?.supplier || '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form>
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="name"
                      label="Item Name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      name="quantity"
                      label="Quantity"
                      type="number"
                      value={values.quantity}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.quantity && Boolean(errors.quantity)}
                      helperText={touched.quantity && errors.quantity}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      name="unit"
                      label="Unit"
                      value={values.unit}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.unit && Boolean(errors.unit)}
                      helperText={touched.unit && errors.unit}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      name="reorderPoint"
                      label="Reorder Point"
                      type="number"
                      value={values.reorderPoint}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.reorderPoint && Boolean(errors.reorderPoint)}
                      helperText={touched.reorderPoint && errors.reorderPoint}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      name="cost"
                      label="Cost"
                      type="number"
                      value={values.cost}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.cost && Boolean(errors.cost)}
                      helperText={touched.cost && errors.cost}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="supplier"
                      label="Supplier"
                      value={values.supplier}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.supplier && Boolean(errors.supplier)}
                      helperText={touched.supplier && errors.supplier}
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>Cancel</Button>
                <Button type="submit" variant="contained" color="primary">
                  {selectedItem ? 'Update' : 'Add'}
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </Box>
  );
};

export default InventoryManagement; 