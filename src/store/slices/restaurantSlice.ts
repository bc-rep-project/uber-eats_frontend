import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Restaurant {
  id: number;
  name: string;
  image: string;
  rating: number;
  deliveryFee: number;
  deliveryTime: string;
  hasOffers: boolean;
}

interface RestaurantState {
  restaurants: Restaurant[];
  loading: boolean;
  error: string | null;
}

const initialState: RestaurantState = {
  restaurants: [],
  loading: false,
  error: null,
};

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    setRestaurants: (state, action: PayloadAction<Restaurant[]>) => {
      state.restaurants = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setRestaurants, setLoading, setError } = restaurantSlice.actions;
export default restaurantSlice.reducer; 