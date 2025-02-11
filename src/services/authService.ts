import axios from 'axios';
import { LoginCredentials, RegisterData, AuthResponse } from '../types/auth';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await authService.refreshToken();
        localStorage.setItem('token', response.token);
        originalRequest.headers.Authorization = `Bearer ${response.token}`;
        return axiosInstance(originalRequest);
      } catch (error) {
        // If refresh token fails, logout user
        authService.logout();
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export const authService = {
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await axiosInstance.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await axiosInstance.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  async refreshToken(): Promise<{ token: string }> {
    const response = await axiosInstance.post<{ token: string }>('/auth/refresh-token');
    return response.data;
  },

  async getCurrentUser() {
    const response = await axiosInstance.get('/auth/me');
    return response.data;
  },

  logout() {
    localStorage.removeItem('token');
  },
};

export default authService; 