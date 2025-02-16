import { Address } from './address';
import { PaymentMethod } from './payment';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  addresses: Address[];
  paymentMethods: PaymentMethod[];
  preferences: UserPreferences;
}

export interface UserPreferences {
  notifications: {
    push: boolean;
    email: boolean;
    sms: boolean;
    orderUpdates: boolean;
    promotions: boolean;
    specialOffers: boolean;
  };
  privacy: {
    shareOrderHistory: boolean;
    shareLocation: boolean;
    shareReviews: boolean;
  };
  preferences: {
    language: string;
    currency: string;
    timezone: string;
  };
}

export interface UserStats {
  totalOrders: number;
  savedRestaurants: number;
  activeSubscriptions: string[];
} 