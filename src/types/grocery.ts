export interface GroceryCategory {
  id: string;
  name: string;
  icon: string;
  description?: string;
}

export interface GroceryStore {
  id: string;
  name: string;
  imageUrl: string;
  rating: number;
  deliveryFee: number;
  deliveryTime: {
    min: number;
    max: number;
  };
  isLiked: boolean;
  type: 'grocery' | 'convenience' | 'pharmacy';
  offers?: {
    text: string;
    condition?: string;
  }[];
}

export interface GroceryProduct {
  id: string;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  unit: string;
  category: string;
  aisle?: string;
  inStock: boolean;
  quantity: number;
  nutritionInfo?: {
    servingSize: string;
    calories: number;
    [key: string]: any;
  };
  replacementPreference?: 'no_replacement' | 'similar_item' | 'contact_me';
  specialInstructions?: string;
}

export interface GroceryAisle {
  id: string;
  name: string;
  categories: string[];
}

export interface GroceryDepartment {
  id: string;
  name: string;
  aisles: GroceryAisle[];
}

export interface ProductReplacement {
  originalProduct: GroceryProduct;
  replacementOptions: GroceryProduct[];
  preference: 'no_replacement' | 'similar_item' | 'contact_me';
  notes?: string;
} 