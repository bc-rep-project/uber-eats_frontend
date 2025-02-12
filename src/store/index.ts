import { configureStore } from '@reduxjs/toolkit';

// Create a store with an empty reducer for now
const store = configureStore({
  reducer: {},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store }; 