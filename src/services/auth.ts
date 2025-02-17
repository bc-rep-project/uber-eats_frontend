import api from './api';
import { User } from '../types/user';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Event to notify components of auth state changes
const authStateChange = new EventTarget();
export const AUTH_STATE_CHANGE = 'authStateChange';

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/login', credentials);
  handleAuthResponse(response.data);
  return response.data;
};

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/register', data);
  handleAuthResponse(response.data);
  return response.data;
};

export const logout = async (): Promise<void> => {
  try {
    await api.post('/auth/logout');
  } finally {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    notifyAuthStateChange();
  }
};

export const refreshToken = async (): Promise<string> => {
  try {
    const response = await api.post<{ token: string }>('/auth/refresh');
    const { token } = response.data;
    localStorage.setItem('token', token);
    return token;
  } catch (error) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    notifyAuthStateChange();
    throw error;
  }
};

export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('token');
};

// Helper functions
const handleAuthResponse = (data: AuthResponse) => {
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data.user));
  notifyAuthStateChange();
};

const notifyAuthStateChange = () => {
  authStateChange.dispatchEvent(new Event(AUTH_STATE_CHANGE));
};

// Subscribe to auth state changes
export const onAuthStateChange = (callback: () => void) => {
  authStateChange.addEventListener(AUTH_STATE_CHANGE, callback);
  return () => {
    authStateChange.removeEventListener(AUTH_STATE_CHANGE, callback);
  };
}; 