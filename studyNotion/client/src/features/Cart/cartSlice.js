import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orderData: null,
  isPaymentLoading: false,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setOrderData: (state, action) => {
      state.orderData = action.payload;
    },
    setIsPaymentLoading: (state, action) => {
      state.isPaymentLoading = action.payload;
    },
  },
});

export const { setOrderData, setIsPaymentLoading } = cartSlice.actions;

export default cartSlice.reducer;
