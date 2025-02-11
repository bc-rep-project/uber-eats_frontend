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
  Divider,
  Switch,
  FormControlLabel,
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
  Add as AddIcon,
} from '@mui/icons-material';
import { RootState } from '../../store';
import { updateUser } from '../../store/slices/authSlice';

interface AddressFormData {
  type: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [showAddressDialog, setShowAddressDialog] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
    phone_number: user?.phone_number || '',
  });
  const [addressForm, setAddressForm] = useState<AddressFormData>({
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
      await dispatch(updateUser(formData));
      setIsEditing(false);
      setError(null);
    } catch (err) {
      setError('Failed to update profile');
    }
  };

  const handleAddAddress = async () => {
    try {
      await dispatch(updateUser({
        ...user,
        saved_addresses: [...(user?.saved_addresses || []), addressForm],
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
      await dispatch(updateUser({
        ...user,
        saved_addresses: updatedAddresses,
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

          <Paper sx={{ p: 3, mt: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Saved Addresses</Typography>
              <Button
                startIcon={<AddIcon />}
                onClick={() => setShowAddressDialog(true)}
              >
                Add Address
              </Button>
            </Box>

            <List>
              {user?.saved_addresses?.map((address, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemText
                      primary={address.type.toUpperCase()}
                      secondary={`${address.address}, ${address.city}, ${address.state} ${address.zip}`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDeleteAddress(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  {index < (user.saved_addresses?.length || 0) - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Preferences
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={user?.preferences?.notifications || false}
                  onChange={(e) =>
                    dispatch(updateUser({
                      ...user,
                      preferences: {
                        ...user?.preferences,
                        notifications: e.target.checked,
                      },
                    }))
                  }
                />
              }
              label="Push Notifications"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={user?.preferences?.dark_mode || false}
                  onChange={(e) =>
                    dispatch(updateUser({
                      ...user,
                      preferences: {
                        ...user?.preferences,
                        dark_mode: e.target.checked,
                      },
                    }))
                  }
                />
              }
              label="Dark Mode"
            />
          </Paper>
        </Grid>
      </Grid>

      {/* Add Address Dialog */}
      <Dialog
        open={showAddressDialog}
        onClose={() => setShowAddressDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add New Address</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Type"
                name="type"
                value={addressForm.type}
                onChange={handleAddressInputChange}
                placeholder="home, work, etc."
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
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="State"
                name="state"
                value={addressForm.state}
                onChange={handleAddressInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
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
            Add Address
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Profile; 