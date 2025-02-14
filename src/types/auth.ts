export interface User {
  _id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
  is_active: boolean;
  is_verified: boolean;
  role: string;
  preferences: {
    notifications: boolean;
    language: string;
    dark_mode: boolean;
  };
  saved_addresses: Address[];
  payment_methods: PaymentMethod[];
  created_at: string;
  updated_at: string;
}

export interface Address {
  type: 'home' | 'work' | 'other';
  address: string;
  city: string;
  state: string;
  zip: string;
}

export interface PaymentMethod {
  type: string;
  last4: string;
  exp_month: number;
  exp_year: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
}

export interface RegisterFormValues extends RegisterData {
  confirmPassword?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface AuthResponse {
  user: User;
  token: string;
} 