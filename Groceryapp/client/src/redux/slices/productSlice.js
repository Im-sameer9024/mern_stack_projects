import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  singleProduct:[],
  loading: false,
  error: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      state.loading = false;
      state.error = null;
    },
    setSingleProduct:(state,action) =>{
      state.singleProduct = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setProducts, setError, setLoading,setSingleProduct } = productSlice.actions;
export default productSlice.reducer;
