import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { RootState } from '../../store';
import { updateUserProfile } from '../../store/slices/authSlice';
import { User, Address, PaymentMethod } from '../../types/auth';

interface UserFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string;
  saved_addresses: Address[];
  payment_methods: PaymentMethod[];
}

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [showAddressDialog, setShowAddressDialog] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<UserFormData>({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
    phone_number: user?.phone_number || '',
    saved_addresses: user?.saved_addresses || [],
    payment_methods: []  // Initialize as empty array since we don't edit payment methods here
  });
  const [addressForm, setAddressForm] = useState<Address>({
    type: 'home',
    address: '',
    city: '',
    state: '',
    zip: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddressForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { payment_methods, ...updateData } = formData;
      await dispatch(updateUserProfile(updateData));
      setIsEditing(false);
      setError(null);
    } catch (err) {
      setError('Failed to update profile');
    }
  };

  const handleAddAddress = async () => {
    try {
      await dispatch(updateUserProfile({
        saved_addresses: [...(user?.saved_addresses || []), addressForm]
      }));
      setShowAddressDialog(false);
      setAddressForm({
        type: 'home',
        address: '',
        city: '',
        state: '',
        zip: '',
      });
      setError(null);
    } catch (err) {
      setError('Failed to add address');
    }
  };

  const handleDeleteAddress = async (index: number) => {
    try {
      const updatedAddresses = [...(user?.saved_addresses || [])];
      updatedAddresses.splice(index, 1);
      await dispatch(updateUserProfile({
        saved_addresses: updatedAddresses
      }));
      setError(null);
    } catch (err) {
      setError('Failed to delete address');
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Profile Settings
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Personal Information</Typography>
              <Button
                startIcon={<EditIcon />}
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Cancel' : 'Edit'}
              </Button>
            </Box>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Saved Addresses
                  </Typography>
                  <List>
                    {user?.saved_addresses.map((address, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={address.type}
                          secondary={`${address.address}, ${address.city}, ${address.state} ${address.zip}`}
                        />
                        {isEditing && (
                          <ListItemSecondaryAction>
                            <IconButton
                              edge="end"
                              aria-label="delete"
                              onClick={() => handleDeleteAddress(index)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        )}
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Payment Methods
                  </Typography>
                  <List>
                    {user?.payment_methods.map((payment, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={`${payment.type} ending in ${payment.last4}`}
                          secondary={`Expires ${payment.exp_month}/${payment.exp_year}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>

              {isEditing && (
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3 }}
                >
                  Save Changes
                </Button>
              )}
            </form>
          </Paper>
        </Grid>
      </Grid>

      <Dialog open={showAddressDialog} onClose={() => setShowAddressDialog(false)}>
        <DialogTitle>Add New Address</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address Type"
                name="type"
                value={addressForm.type}
                onChange={handleAddressInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Street Address"
                name="address"
                value={addressForm.address}
                onChange={handleAddressInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                name="city"
                value={addressForm.city}
                onChange={handleAddressInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="State"
                name="state"
                value={addressForm.state}
                onChange={handleAddressInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="ZIP Code"
                name="zip"
                value={addressForm.zip}
                onChange={handleAddressInputChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddressDialog(false)}>Cancel</Button>
          <Button onClick={handleAddAddress} variant="contained" color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Profile; 