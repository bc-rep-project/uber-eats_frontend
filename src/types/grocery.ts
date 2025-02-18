export interface GroceryCategory {
  id: string;
  name: string;
  icon: string;
}

export interface GroceryStore {
  id: string;
  name: string;
  imageUrl: string;
  rating: number;
  deliveryTime: {
    min: number;
    max: number;
  };
  deliveryFee: number;
  isLiked: boolean;
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
  unit?: string;
  calories?: string;
  category: string;
  aisle?: string;
  inStock: boolean;
}

export interface GroceryOrder {
  id: string;
  productId: string;
  quantity: number;
  note?: string;
  replacementPreference?: 'SIMILAR_ITEM' | 'REFUND' | 'CONTACT_ME';
}

export interface GroceryAisle {
  id: string;
  name: string;
  products: GroceryProduct[];
} 