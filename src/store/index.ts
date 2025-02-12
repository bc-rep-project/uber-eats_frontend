import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import restaurantReducer from './slices/restaurantSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    restaurants: restaurantReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 