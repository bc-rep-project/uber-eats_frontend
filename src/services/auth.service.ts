import api from './api';
import { User, LoginCredentials, RegisterData } from '../types/auth';

export const AuthService = {
  async register(data: RegisterData): Promise<{ user: User; token: string }> {
    const response = await api.post('/auth/register', data);
    const { user, token } = response.data;
    localStorage.setItem('token', token);
    return { user, token };
  },

  async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    const response = await api.post('/auth/login', credentials);
    const { user, token } = response.data;
    localStorage.setItem('token', token);
    return { user, token };
  },

  async logout(): Promise<void> {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  },

  async getCurrentUser(): Promise<User> {
    const response = await api.get('/auth/me');
    return response.data.user;
  },

  async refreshToken(): Promise<string> {
    const response = await api.post('/auth/refresh-token');
    const { token } = response.data;
    localStorage.setItem('token', token);
    return token;
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}; 