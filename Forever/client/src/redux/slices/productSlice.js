import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  loading: false,
  error: false,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      state.loading = false;
      state.error = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
      state.error = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setProducts, setLoading, setError } = productSlice.actions;

export default productSlice.reducer;
