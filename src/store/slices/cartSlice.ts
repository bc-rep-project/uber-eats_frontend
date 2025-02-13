import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Customization {
  name: string;
  options: string[];
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  restaurantId: number;
  image?: string;
  customizations?: Customization[];
}

interface CartState {
  items: CartItem[];
  total: number;
  restaurantId: number | null;
}

const initialState: CartState = {
  items: [],
  total: 0,
  restaurantId: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state: CartState, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
        state.restaurantId = action.payload.restaurantId;
      }
      state.total = state.items.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0);
    },
    removeItem: (state: CartState, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.total = state.items.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0);
      if (state.items.length === 0) {
        state.restaurantId = null;
      }
    },
    updateQuantity: (state: CartState, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        state.total = state.items.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0);
      }
    },
    clearCart: (state: CartState) => {
      state.items = [];
      state.total = 0;
      state.restaurantId = null;
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer; 