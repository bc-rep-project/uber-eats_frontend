import api from './api';

export interface GroceryCategory {
  id: string;
  name: string;
  icon: string;
  order: number;
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
  offers?: string;
  isFeatured: boolean;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  operatingHours: Array<{
    day: number;
    open: string;
    close: string;
  }>;
}

export interface GroceryProduct {
  id: string;
  storeId: string;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  calories?: string;
  imageUrl: string;
  category: string;
  inStock: boolean;
  unit: string;
}

export const groceryService = {
  // Get all grocery categories
  async getCategories(): Promise<GroceryCategory[]> {
    const response = await api.get<GroceryCategory[]>('/api/grocery/categories');
    return response.data;
  },

  // Get grocery stores with optional filters
  async getStores(params?: {
    category?: string;
    featured?: boolean;
    search?: string;
  }): Promise<GroceryStore[]> {
    const response = await api.get<GroceryStore[]>('/api/grocery/stores', { params });
    return response.data;
  },

  // Get a specific grocery store
  async getStore(storeId: string): Promise<GroceryStore> {
    const response = await api.get<GroceryStore>(`/api/grocery/stores/${storeId}`);
    return response.data;
  },

  // Get products for a specific store
  async getStoreProducts(storeId: string, params?: {
    category?: string;
    search?: string;
  }): Promise<GroceryProduct[]> {
    const response = await api.get<GroceryProduct[]>(
      `/api/grocery/stores/${storeId}/products`,
      { params }
    );
    return response.data;
  },

  // Rate a grocery store
  async rateStore(storeId: string, rating: number): Promise<void> {
    await api.post(`/api/grocery/stores/${storeId}/rate`, { rating });
  }
}; 