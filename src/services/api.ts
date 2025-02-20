import axios from 'axios';
import { refreshToken } from './auth';

const API_BASE_URL = 'https://uber-eats-backend-mnpd.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor for token refresh and error handling
api.interceptors.response.use(
  response => response,
  async error => {
    if (!error.response) {
      // Network error
      return Promise.reject({
        message: 'Network error - please check your connection',
        code: 'NETWORK_ERROR'
      });
    }

    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshToken();
        localStorage.setItem('token', newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error.response.data || error);
  }
);

export default api;

// Error handling utility
export const handleApiError = (error: any) => {
  if (error.response) {
    // Server responded with error
    return {
      message: error.response.data.message || 'An error occurred',
      code: error.response.data.code,
      details: error.response.data.details,
    };
  } else if (error.request) {
    // Request made but no response
    return {
      message: 'No response from server',
      code: 'NETWORK_ERROR',
    };
  } else {
    // Request setup error
    return {
      message: error.message,
      code: 'REQUEST_ERROR',
    };
  }
}; 