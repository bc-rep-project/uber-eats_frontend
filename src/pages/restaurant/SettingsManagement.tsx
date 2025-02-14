import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  FormGroup,
  Divider,
  Alert,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format, parse } from 'date-fns';

interface BusinessHours {
  day: string;
  open: string;
  close: string;
  isOpen: boolean;
}

interface DeliveryZone {
  id: string;
  name: string;
  radius: number;
  minimumOrder: number;
  deliveryFee: number;
}

interface TaxRule {
  id: string;
  name: string;
  description: string;
  rate: number;
  isActive: boolean;
  appliesToDelivery: boolean;
  appliesToPickup: boolean;
  minimumOrderAmount: number;
}

type TaxRuleInput = Omit<TaxRule, 'id'>;

interface TaxRuleDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (rule: TaxRuleInput) => void;
  initialData?: TaxRule;
}

const TaxRuleDialog: React.FC<TaxRuleDialogProps> = ({
  open,
  onClose,
  onSave,
  initialData,
}) => {
  const [formData, setFormData] = useState<TaxRuleInput>({
    name: initialData?.name || '',
    description: initialData?.description || '',
    rate: initialData?.rate || 0,
    isActive: initialData?.isActive ?? true,
    appliesToDelivery: initialData?.appliesToDelivery ?? true,
    appliesToPickup: initialData?.appliesToPickup ?? true,
    minimumOrderAmount: initialData?.minimumOrderAmount || 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{initialData ? 'Edit Tax Rule' : 'Add Tax Rule'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Rate (%)"
                name="rate"
                type="number"
                value={formData.rate}
                onChange={(e) => setFormData({ ...formData, rate: parseFloat(e.target.value) })}
                required
                inputProps={{ min: 0, step: 0.01 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Minimum Order Amount"
                name="minimumOrderAmount"
                type="number"
                value={formData.minimumOrderAmount}
                onChange={(e) => setFormData({ ...formData, minimumOrderAmount: parseFloat(e.target.value) })}
                inputProps={{ min: 0, step: 0.01 }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    />
                  }
                  label="Active"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.appliesToDelivery}
                      onChange={(e) => setFormData({ ...formData, appliesToDelivery: e.target.checked })}
                    />
                  }
                  label="Applies to Delivery Orders"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.appliesToPickup}
                      onChange={(e) => setFormData({ ...formData, appliesToPickup: e.target.checked })}
                    />
                  }
                  label="Applies to Pickup Orders"
                />
              </FormGroup>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

const SettingsManagement: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [businessHours, setBusinessHours] = useState<BusinessHours[]>([
    { day: 'Monday', open: '09:00', close: '22:00', isOpen: true },
    { day: 'Tuesday', open: '09:00', close: '22:00', isOpen: true },
    { day: 'Wednesday', open: '09:00', close: '22:00', isOpen: true },
    { day: 'Thursday', open: '09:00', close: '22:00', isOpen: true },
    { day: 'Friday', open: '09:00', close: '23:00', isOpen: true },
    { day: 'Saturday', open: '10:00', close: '23:00', isOpen: true },
    { day: 'Sunday', open: '10:00', close: '22:00', isOpen: true },
  ]);
  const [deliveryZones, setDeliveryZones] = useState<DeliveryZone[]>([]);
  const [taxRules, setTaxRules] = useState<TaxRule[]>([]);
  const [notifications, setNotifications] = useState({
    newOrders: true,
    orderStatus: true,
    lowStock: true,
    reviews: true,
    promotions: false,
  });
  const [openZoneDialog, setOpenZoneDialog] = useState(false);
  const [selectedZone, setSelectedZone] = useState<DeliveryZone | null>(null);
  const [openTaxDialog, setOpenTaxDialog] = useState(false);
  const [selectedTax, setSelectedTax] = useState<TaxRule | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      const response = await fetch('/api/restaurant/settings');
      const data = await response.json();
      // setBusinessHours(data.businessHours);
      setDeliveryZones(data.deliveryZones || []);
      setTaxRules(data.taxRules || []);
      // setNotifications(data.notifications);
      setError(null);
    } catch (err) {
      setError('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveBusinessHours = async () => {
    try {
      await fetch('/api/restaurant/settings/business-hours', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessHours }),
      });
      setError(null);
    } catch (err) {
      setError('Failed to save business hours');
    }
  };

  const handleSaveNotifications = async () => {
    try {
      await fetch('/api/restaurant/settings/notifications', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notifications }),
      });
      setError(null);
    } catch (err) {
      setError('Failed to save notification preferences');
    }
  };

  const handleAddZone = async (zone: Omit<DeliveryZone, 'id'>) => {
    try {
      const response = await fetch('/api/restaurant/settings/delivery-zones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(zone),
      });
      const newZone = await response.json();
      setDeliveryZones([...deliveryZones, newZone]);
      setOpenZoneDialog(false);
      setError(null);
    } catch (err) {
      setError('Failed to add delivery zone');
    }
  };

  const handleAddTaxRule = async (rule: Omit<TaxRule, 'id'>) => {
    try {
      const response = await fetch('/api/restaurant/settings/tax-rules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rule),
      });
      const newRule = await response.json();
      setTaxRules([...taxRules, newRule]);
      setOpenTaxDialog(false);
      setError(null);
    } catch (err) {
      setError('Failed to add tax rule');
    }
  };

  const handleSaveTaxRule = async (ruleInput: TaxRuleInput) => {
    try {
      const response = await fetch('/api/restaurant/settings/tax-rules', {
        method: selectedTax?.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedTax?.id ? { ...ruleInput, id: selectedTax.id } : ruleInput),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save tax rule');
      }
      
      const savedRule: TaxRule = await response.json();
      
      if (selectedTax?.id) {
        setTaxRules(taxRules.map((r) => (r.id === selectedTax.id ? savedRule : r)));
      } else {
        setTaxRules([...taxRules, savedRule]);
      }
      
      setOpenTaxDialog(false);
      setSelectedTax(null);
      setError(null);
    } catch (err) {
      setError('Failed to save tax rule');
    }
  };

  const handleDeleteTaxRule = async (id: string) => {
    try {
      await fetch('/api/restaurant/settings/tax-rules', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      setTaxRules(taxRules.filter((r) => r.id !== id));
      setOpenTaxDialog(false);
      setError(null);
    } catch (err) {
      setError('Failed to delete tax rule');
    }
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
      <Typography variant="h5" gutterBottom>
        Restaurant Settings
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Business Hours */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">Business Hours</Typography>
              <Button
                startIcon={<SaveIcon />}
                variant="contained"
                onClick={handleSaveBusinessHours}
              >
                Save Hours
              </Button>
            </Box>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Day</TableCell>
                      <TableCell>Open</TableCell>
                      <TableCell>Close</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {businessHours.map((hours, index) => (
                      <TableRow key={hours.day}>
                        <TableCell>{hours.day}</TableCell>
                        <TableCell>
                          <TimePicker
                            value={parse(hours.open, 'HH:mm', new Date())}
                            onChange={(newValue) => {
                              const newHours = [...businessHours];
                              newHours[index].open = format(newValue || new Date(), 'HH:mm');
                              setBusinessHours(newHours);
                            }}
                            disabled={!hours.isOpen}
                          />
                        </TableCell>
                        <TableCell>
                          <TimePicker
                            value={parse(hours.close, 'HH:mm', new Date())}
                            onChange={(newValue) => {
                              const newHours = [...businessHours];
                              newHours[index].close = format(newValue || new Date(), 'HH:mm');
                              setBusinessHours(newHours);
                            }}
                            disabled={!hours.isOpen}
                          />
                        </TableCell>
                        <TableCell>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={hours.isOpen}
                                onChange={(e) => {
                                  const newHours = [...businessHours];
                                  newHours[index].isOpen = e.target.checked;
                                  setBusinessHours(newHours);
                                }}
                              />
                            }
                            label={hours.isOpen ? 'Open' : 'Closed'}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </LocalizationProvider>
          </Paper>
        </Grid>

        {/* Delivery Zones */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">Delivery Zones</Typography>
              <Button
                startIcon={<AddIcon />}
                variant="contained"
                onClick={() => {
                  setSelectedZone(null);
                  setOpenZoneDialog(true);
                }}
              >
                Add Zone
              </Button>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Zone Name</TableCell>
                    <TableCell align="right">Radius (km)</TableCell>
                    <TableCell align="right">Minimum Order</TableCell>
                    <TableCell align="right">Delivery Fee</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {deliveryZones.map((zone) => (
                    <TableRow key={zone.id}>
                      <TableCell>{zone.name}</TableCell>
                      <TableCell align="right">{zone.radius}</TableCell>
                      <TableCell align="right">${zone.minimumOrder}</TableCell>
                      <TableCell align="right">${zone.deliveryFee}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          onClick={() => {
                            setSelectedZone(zone);
                            setOpenZoneDialog(true);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => {
                            setDeliveryZones(deliveryZones.filter((z) => z.id !== zone.id));
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Tax Rules */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">Tax Rules</Typography>
              <Button
                startIcon={<AddIcon />}
                variant="contained"
                onClick={() => {
                  setSelectedTax(null);
                  setOpenTaxDialog(true);
                }}
              >
                Add Tax Rule
              </Button>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Rate</TableCell>
                    <TableCell>Min. Order</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Applies To</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {taxRules.map((rule) => (
                    <TableRow key={rule.id}>
                      <TableCell>
                        {rule.name}
                        {rule.description && (
                          <Typography variant="caption" display="block" color="textSecondary">
                            {rule.description}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>{rule.rate}%</TableCell>
                      <TableCell>${rule.minimumOrderAmount.toFixed(2)}</TableCell>
                      <TableCell>
                        <Chip
                          label={rule.isActive ? 'Active' : 'Inactive'}
                          color={rule.isActive ? 'success' : 'default'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        {[
                          rule.appliesToDelivery && 'Delivery',
                          rule.appliesToPickup && 'Pickup',
                        ]
                          .filter(Boolean)
                          .join(', ')}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => {
                            setSelectedTax(rule);
                            setOpenTaxDialog(true);
                          }}
                          size="small"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDeleteTaxRule(rule.id)}
                          size="small"
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Notification Preferences */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">Notification Preferences</Typography>
              <Button
                startIcon={<SaveIcon />}
                variant="contained"
                onClick={handleSaveNotifications}
              >
                Save Preferences
              </Button>
            </Box>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.newOrders}
                    onChange={(e) =>
                      setNotifications({ ...notifications, newOrders: e.target.checked })
                    }
                  />
                }
                label="New Order Notifications"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.orderStatus}
                    onChange={(e) =>
                      setNotifications({ ...notifications, orderStatus: e.target.checked })
                    }
                  />
                }
                label="Order Status Updates"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.lowStock}
                    onChange={(e) =>
                      setNotifications({ ...notifications, lowStock: e.target.checked })
                    }
                  />
                }
                label="Low Stock Alerts"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.reviews}
                    onChange={(e) =>
                      setNotifications({ ...notifications, reviews: e.target.checked })
                    }
                  />
                }
                label="New Reviews"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.promotions}
                    onChange={(e) =>
                      setNotifications({ ...notifications, promotions: e.target.checked })
                    }
                  />
                }
                label="Promotion Updates"
              />
            </FormGroup>
          </Paper>
        </Grid>
      </Grid>

      {/* Delivery Zone Dialog */}
      <Dialog open={openZoneDialog} onClose={() => setOpenZoneDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedZone ? 'Edit Delivery Zone' : 'Add Delivery Zone'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Zone Name"
                value={selectedZone?.name || ''}
                onChange={(e) =>
                  setSelectedZone(
                    selectedZone
                      ? { ...selectedZone, name: e.target.value }
                      : {
                          id: '',
                          name: e.target.value,
                          radius: 0,
                          minimumOrder: 0,
                          deliveryFee: 0,
                        }
                  )
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="number"
                label="Radius (km)"
                value={selectedZone?.radius || ''}
                onChange={(e) =>
                  setSelectedZone(
                    selectedZone
                      ? { ...selectedZone, radius: Number(e.target.value) }
                      : {
                          id: '',
                          name: '',
                          radius: Number(e.target.value),
                          minimumOrder: 0,
                          deliveryFee: 0,
                        }
                  )
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="number"
                label="Minimum Order ($)"
                value={selectedZone?.minimumOrder || ''}
                onChange={(e) =>
                  setSelectedZone(
                    selectedZone
                      ? { ...selectedZone, minimumOrder: Number(e.target.value) }
                      : {
                          id: '',
                          name: '',
                          radius: 0,
                          minimumOrder: Number(e.target.value),
                          deliveryFee: 0,
                        }
                  )
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="number"
                label="Delivery Fee ($)"
                value={selectedZone?.deliveryFee || ''}
                onChange={(e) =>
                  setSelectedZone(
                    selectedZone
                      ? { ...selectedZone, deliveryFee: Number(e.target.value) }
                      : {
                          id: '',
                          name: '',
                          radius: 0,
                          minimumOrder: 0,
                          deliveryFee: Number(e.target.value),
                        }
                  )
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenZoneDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => {
              if (selectedZone) {
                if (selectedZone.id) {
                  setDeliveryZones(
                    deliveryZones.map((z) =>
                      z.id === selectedZone.id ? selectedZone : z
                    )
                  );
                } else {
                  handleAddZone(selectedZone);
                }
              }
              setOpenZoneDialog(false);
            }}
          >
            {selectedZone?.id ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Tax Rule Dialog */}
      <TaxRuleDialog
        open={openTaxDialog}
        onClose={() => setOpenTaxDialog(false)}
        onSave={handleSaveTaxRule}
        initialData={selectedTax || undefined}
      />
    </Box>
  );
};

export default SettingsManagement; 