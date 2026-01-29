import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';

// Create a Redux store using configureStore from Redux Toolkit
const store = configureStore({
  reducer: {
    // 'cart' คือชื่อ slice ใน global state
    cart: cartReducer,
  },
});

export default store;
