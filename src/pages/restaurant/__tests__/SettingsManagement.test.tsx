import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import SettingsManagement from '../SettingsManagement';

// Mock the fetch function
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Sample data for tests
const sampleTaxRules = [
  {
    id: '1',
    name: 'Sales Tax',
    description: 'Standard sales tax',
    rate: 8.875,
    isActive: true,
    appliesToDelivery: true,
    appliesToPickup: true,
    minimumOrderAmount: 0,
  },
  {
    id: '2',
    name: 'Luxury Tax',
    description: 'Tax for luxury items',
    rate: 10,
    isActive: false,
    appliesToDelivery: true,
    appliesToPickup: false,
    minimumOrderAmount: 100,
  },
];

describe('SettingsManagement - Tax Rules', () => {
  beforeEach(() => {
    mockFetch.mockReset();
    // Mock initial data fetch
    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          taxRules: sampleTaxRules,
          deliveryZones: [],
          notifications: {},
        }),
      })
    );
  });

  it('renders tax rules section', async () => {
    render(<SettingsManagement />);

    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText('Tax Rules')).toBeInTheDocument();
    });

    // Check if tax rules are displayed
    expect(screen.getByText('Sales Tax')).toBeInTheDocument();
    expect(screen.getByText('Luxury Tax')).toBeInTheDocument();
    expect(screen.getByText('8.875%')).toBeInTheDocument();
    expect(screen.getByText('$0.00')).toBeInTheDocument();
  });

  it('opens add tax rule dialog', async () => {
    render(<SettingsManagement />);

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.getByText('Add Tax Rule')).toBeInTheDocument();
    });

    // Click add button
    fireEvent.click(screen.getByText('Add Tax Rule'));

    // Check if dialog is open
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Tax Rate (%)')).toBeInTheDocument();
  });

  it('creates new tax rule', async () => {
    const newTaxRule = {
      name: 'New Tax',
      description: 'New tax description',
      rate: 7.5,
      isActive: true,
      appliesToDelivery: true,
      appliesToPickup: true,
      minimumOrderAmount: 25,
    };

    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ id: '3', ...newTaxRule }),
      })
    );

    render(<SettingsManagement />);

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.getByText('Add Tax Rule')).toBeInTheDocument();
    });

    // Open dialog and fill form
    fireEvent.click(screen.getByText('Add Tax Rule'));
    
    await act(async () => {
      userEvent.type(screen.getByLabelText('Name'), newTaxRule.name);
      userEvent.type(screen.getByLabelText('Description'), newTaxRule.description);
      userEvent.type(screen.getByLabelText('Tax Rate (%)'), newTaxRule.rate.toString());
      userEvent.type(
        screen.getByLabelText('Minimum Order Amount'),
        newTaxRule.minimumOrderAmount.toString()
      );
    });

    // Submit form
    fireEvent.click(screen.getByText('Save'));

    // Verify API call
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        '/api/restaurant/settings/tax-rules',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(newTaxRule),
        })
      );
    });
  });

  it('edits existing tax rule', async () => {
    const updatedRule = {
      ...sampleTaxRules[0],
      name: 'Updated Tax',
      rate: 9.0,
    };

    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(updatedRule),
      })
    );

    render(<SettingsManagement />);

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.getByText('Sales Tax')).toBeInTheDocument();
    });

    // Click edit button
    const editButtons = screen.getAllByTestId('edit-button');
    fireEvent.click(editButtons[0]);

    // Update form
    await act(async () => {
      userEvent.clear(screen.getByLabelText('Name'));
      userEvent.type(screen.getByLabelText('Name'), updatedRule.name);
      userEvent.clear(screen.getByLabelText('Tax Rate (%)'));
      userEvent.type(screen.getByLabelText('Tax Rate (%)'), updatedRule.rate.toString());
    });

    // Submit form
    fireEvent.click(screen.getByText('Save'));

    // Verify API call
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        '/api/restaurant/settings/tax-rules/1',
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify(updatedRule),
        })
      );
    });
  });

  it('deletes tax rule', async () => {
    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'Tax rule deleted successfully' }),
      })
    );

    render(<SettingsManagement />);

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.getByText('Sales Tax')).toBeInTheDocument();
    });

    // Click delete button
    const deleteButtons = screen.getAllByTestId('delete-button');
    fireEvent.click(deleteButtons[0]);

    // Verify API call
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        '/api/restaurant/settings/tax-rules/1',
        expect.objectContaining({
          method: 'DELETE',
        })
      );
    });

    // Verify rule is removed from UI
    expect(screen.queryByText('Sales Tax')).not.toBeInTheDocument();
  });

  it('handles API errors', async () => {
    // Mock API error
    mockFetch.mockImplementationOnce(() =>
      Promise.reject(new Error('API Error'))
    );

    render(<SettingsManagement />);

    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText('Failed to load settings')).toBeInTheDocument();
    });
  });

  it('validates form inputs', async () => {
    render(<SettingsManagement />);

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.getByText('Add Tax Rule')).toBeInTheDocument();
    });

    // Open dialog
    fireEvent.click(screen.getByText('Add Tax Rule'));

    // Try to submit empty form
    fireEvent.click(screen.getByText('Save'));

    // Check for validation messages
    expect(screen.getByText('Name is required')).toBeInTheDocument();
    expect(screen.getByText('Tax rate is required')).toBeInTheDocument();

    // Try invalid tax rate
    await act(async () => {
      userEvent.type(screen.getByLabelText('Tax Rate (%)'), '101');
    });

    expect(screen.getByText('Tax rate must be between 0 and 100')).toBeInTheDocument();

    // Try negative minimum order amount
    await act(async () => {
      userEvent.type(screen.getByLabelText('Minimum Order Amount'), '-50');
    });

    expect(screen.getByText('Minimum order amount cannot be negative')).toBeInTheDocument();
  });
}); 