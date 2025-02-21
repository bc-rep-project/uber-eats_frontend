import api, { handleApiError } from './api';

export interface GroceryCategory {
  id: string;
  name: string;
  icon: string;
  imageUrl: string;
  order?: number;
}

export interface GroceryStore {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  deliveryTime: string;
  deliveryFee: number;
  minimumOrder: number;
  rating: number;
  totalRatings: number;
  categories: string[];
  offers: string[];
  isFeatured: boolean;
  address: string;
  operatingHours: string;
}

export interface GroceryProduct {
  id: string;
  storeId: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  calories: number;
  imageUrl: string;
  category: string;
  inStock: boolean;
  unit: string;
}

const groceryService = {
  // Get all grocery categories
  async getCategories(): Promise<GroceryCategory[]> {
    try {
      const response = await api.get('/grocery/categories');
      return response.data || [];
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      return [];
    }
  },

  // Get grocery stores with optional filters
  async getStores(params?: {
    category?: string;
    featured?: boolean;
    search?: string;
  }): Promise<GroceryStore[]> {
    try {
      const response = await api.get('/grocery/stores', { params });
      return response.data || [];
    } catch (error) {
      console.error('Failed to fetch stores:', error);
      return [];
    }
  },

  // Get a specific grocery store
  async getStore(storeId: string): Promise<GroceryStore | null> {
    try {
      const response = await api.get(`/grocery/stores/${storeId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch store:', error);
      return null;
    }
  },

  // Get products for a specific store
  async getStoreProducts(storeId: string, params?: {
    category?: string;
    search?: string;
  }): Promise<GroceryProduct[]> {
    try {
      const response = await api.get(`/grocery/stores/${storeId}/products`, { params });
      return response.data || [];
    } catch (error) {
      console.error('Failed to fetch products:', error);
      return [];
    }
  },

  // Rate a grocery store
  async rateStore(storeId: string, rating: number): Promise<void> {
    try {
      await api.post(`/grocery/stores/${storeId}/rate`, { rating });
    } catch (error) {
      console.error('Failed to rate store:', error);
      throw handleApiError(error);
    }
  }
};

export default groceryService; 