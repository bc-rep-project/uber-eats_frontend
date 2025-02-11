import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: string;
  restaurantId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  customizations?: Array<{
    name: string;
    options: string[];
  }>;
}

interface CartState {
  items: CartItem[];
  restaurantId: string | null;
}

const initialState: CartState = {
  items: [],
  restaurantId: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      // If adding item from a different restaurant, clear cart first
      if (state.restaurantId && action.payload.restaurantId !== state.restaurantId) {
        state.items = [];
      }
      
      // Set the restaurant ID if not set
      state.restaurantId = action.payload.restaurantId;

      // Check if item already exists
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id &&
        JSON.stringify(item.customizations) === JSON.stringify(action.payload.customizations)
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter((item) => item.id !== action.payload.id);
          if (state.items.length === 0) {
            state.restaurantId = null;
          }
        } else {
          item.quantity = action.payload.quantity;
        }
      }
    },
    removeItem: (state, action: PayloadAction<{ id: string }>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      if (state.items.length === 0) {
        state.restaurantId = null;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.restaurantId = null;
    },
  },
});

export const { addItem, updateQuantity, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer; 