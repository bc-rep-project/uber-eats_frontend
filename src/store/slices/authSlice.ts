import { createSlice, createAsyncThunk, PayloadAction, ActionReducerMapBuilder } from '@reduxjs/toolkit';

interface Address {
  type: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

interface PaymentMethod {
  method: string;
  details: string;
}

interface User {
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

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

interface AuthResponse {
  user: User;
  token: string;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  loading: false,
  error: null,
  isAuthenticated: !!localStorage.getItem('token'),
};

// Async thunk for login
export const login = createAsyncThunk<AuthResponse, LoginCredentials>(
  'auth/login',
  async (credentials: LoginCredentials) => {
    try {
      // TODO: Replace with actual API call
      const response = await new Promise<AuthResponse>((resolve) => {
        setTimeout(() => {
          resolve({
            user: {
              _id: '1',
              email: credentials.email,
              first_name: 'John',
              last_name: 'Doe',
              role: 'customer',
              is_active: true,
              is_verified: true,
              preferences: {
                notifications: true,
                language: 'en',
                dark_mode: false
              },
              saved_addresses: [],
              payment_methods: [],
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            },
            token: 'dummy-token',
          });
        }, 1000);
      });

      localStorage.setItem('token', response.token);
      return response;
    } catch (error) {
      throw new Error('Login failed');
    }
  }
);

// Async thunk for register
export const register = createAsyncThunk<AuthResponse, RegisterCredentials>(
  'auth/register',
  async (credentials: RegisterCredentials) => {
    try {
      // TODO: Replace with actual API call
      const response = await new Promise<AuthResponse>((resolve) => {
        setTimeout(() => {
          resolve({
            user: {
              _id: '2',
              email: credentials.email,
              first_name: credentials.firstName,
              last_name: credentials.lastName,
              role: 'customer',
              is_active: true,
              is_verified: false,
              preferences: {
                notifications: true,
                language: 'en',
                dark_mode: false
              },
              saved_addresses: [],
              payment_methods: [],
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            },
            token: 'dummy-token',
          });
        }, 1000);
      });

      localStorage.setItem('token', response.token);
      return response;
    } catch (error) {
      throw new Error('Registration failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state: AuthState, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    setToken: (state: AuthState, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
      state.isAuthenticated = true;
    },
    setLoading: (state: AuthState, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state: AuthState, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    updateUserProfile: (state: AuthState, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    logout: (state: AuthState) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<AuthState>) => {
    builder
      // Login cases
      .addCase(login.pending, (state: AuthState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state: AuthState, action: PayloadAction<AuthResponse>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state: AuthState, action: any) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
        state.isAuthenticated = false;
      })
      // Register cases
      .addCase(register.pending, (state: AuthState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state: AuthState, action: PayloadAction<AuthResponse>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state: AuthState, action: any) => {
        state.loading = false;
        state.error = action.error.message || 'Registration failed';
        state.isAuthenticated = false;
      });
  },
});

export const { setUser, setToken, setLoading, setError, updateUserProfile, logout } = authSlice.actions;
export default authSlice.reducer; 