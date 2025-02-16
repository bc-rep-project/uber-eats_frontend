import { api } from './api';
import { User, UserPreferences, UserStats } from '../types/user';
import { Address, DeliveryLocation } from '../types/address';
import { PaymentMethod } from '../types/payment';

export const userService = {
  // Profile Management
  async updateProfile(data: Partial<User>): Promise<User> {
    const response = await api.put<User>('/users/profile', data);
    return response.data;
  },

  async updatePreferences(preferences: Partial<UserPreferences>): Promise<UserPreferences> {
    const response = await api.put<UserPreferences>('/users/preferences', preferences);
    return response.data;
  },

  async getUserStats(): Promise<UserStats> {
    const response = await api.get<UserStats>('/users/stats');
    return response.data;
  },

  // Address Management
  async addAddress(address: Omit<Address, 'id'>): Promise<Address> {
    const response = await api.post<Address>('/users/addresses', address);
    return response.data;
  },

  async updateAddress(id: string, address: Partial<Address>): Promise<Address> {
    const response = await api.put<Address>(`/users/addresses/${id}`, address);
    return response.data;
  },

  async deleteAddress(id: string): Promise<void> {
    await api.delete(`/users/addresses/${id}`);
  },

  async setDefaultAddress(id: string): Promise<void> {
    await api.put(`/users/addresses/${id}/default`);
  },

  // Payment Methods
  async addPaymentMethod(paymentMethod: Omit<PaymentMethod, 'id'>): Promise<PaymentMethod> {
    const response = await api.post<PaymentMethod>('/users/payment-methods', paymentMethod);
    return response.data;
  },

  async updatePaymentMethod(id: string, paymentMethod: Partial<PaymentMethod>): Promise<PaymentMethod> {
    const response = await api.put<PaymentMethod>(`/users/payment-methods/${id}`, paymentMethod);
    return response.data;
  },

  async deletePaymentMethod(id: string): Promise<void> {
    await api.delete(`/users/payment-methods/${id}`);
  },

  async setDefaultPaymentMethod(id: string): Promise<void> {
    await api.put(`/users/payment-methods/${id}/default`);
  },

  // Social Integration
  async connectSocialAccount(platform: string, token: string): Promise<void> {
    await api.post('/users/social/connect', { platform, token });
  },

  async disconnectSocialAccount(platform: string): Promise<void> {
    await api.delete(`/users/social/${platform}`);
  },

  async getSocialConnections(): Promise<string[]> {
    const response = await api.get<string[]>('/users/social/connections');
    return response.data;
  }
}; 