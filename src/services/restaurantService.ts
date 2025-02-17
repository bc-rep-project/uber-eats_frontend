import api from './api';
import { Restaurant } from '../types/restaurant';

export interface RatingData {
  rating: number;
  comment?: string;
}

export const restaurantService = {
  // Get restaurant details
  async getRestaurant(id: string): Promise<Restaurant> {
    const response = await api.get<Restaurant>(`/restaurants/${id}`);
    return response.data;
  },

  // Toggle restaurant like
  async toggleLike(restaurantId: string): Promise<{ isLiked: boolean }> {
    const response = await api.post<{ isLiked: boolean }>(`/restaurants/${restaurantId}/like`);
    return response.data;
  },

  // Get user's liked restaurants
  async getLikedRestaurants(): Promise<Restaurant[]> {
    const response = await api.get<Restaurant[]>('/restaurants/liked');
    return response.data;
  },

  // Submit a rating
  async submitRating(restaurantId: string, data: RatingData): Promise<void> {
    await api.post(`/restaurants/${restaurantId}/rate`, data);
  },

  // Get user's ratings
  async getUserRatings(): Promise<Array<{
    restaurant: Restaurant;
    rating: number;
  }>> {
    const response = await api.get('/restaurants/ratings');
    return response.data;
  },

  // Get restaurant ratings
  async getRestaurantRatings(restaurantId: string): Promise<{
    average: number;
    total: number;
    ratings: Array<{
      rating: number;
      comment?: string;
      createdAt: string;
      user: {
        firstName: string;
        lastName: string;
      };
    }>;
  }> {
    const response = await api.get(`/restaurants/${restaurantId}/ratings`);
    return response.data;
  },

  // Get filtered restaurants
  async getRestaurants(params: {
    category?: string;
    rating?: number;
    priceRange?: string[];
    dietary?: string[];
    sortBy?: string;
  }): Promise<Restaurant[]> {
    const response = await api.get<Restaurant[]>('/restaurants', { params });
    return response.data;
  },

  // Search restaurants
  async searchRestaurants(query: string): Promise<Restaurant[]> {
    const response = await api.get<Restaurant[]>('/restaurants/search', {
      params: { q: query }
    });
    return response.data;
  }
};

export default restaurantService; 