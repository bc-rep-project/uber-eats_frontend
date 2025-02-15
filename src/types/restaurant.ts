export interface Restaurant {
  id: string;
  name: string;
  rating: number;
  deliveryFee: number;
  deliveryTime: {
    min: number;
    max: number;
  };
  imageUrl: string;
  isLiked: boolean;
  cuisineType: string[];
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  offers?: {
    text: string;
    condition?: string;
  }[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface FilterOption {
  id: string;
  label: string;
  value: string;
}

export interface SortOption {
  id: string;
  label: string;
  value: string;
}

export interface DeliveryAddress {
  id: string;
  label: string;
  address: string;
  isDefault: boolean;
}

export type RestaurantType = 'restaurant' | 'grocery' | 'convenience' | 'alcohol'; 