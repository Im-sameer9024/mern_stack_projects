import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import categoryReducer from "./slices/categorySlice.js";
import cartReducer from "./slices/cartSlice.js";
import { categoryApiSlice } from "./apiSlices/categoryApiSlice.js";
import { authApiSlice } from "./apiSlices/authApiSlice.js";
import productReducer from "./slices/productSlice.js";
import { productApiSlice } from "./apiSlices/productApiSlice.js";
import { ratingApiSlice } from "./apiSlices/ratingApiSlice.js";
import { cartApiSlice } from "./apiSlices/cartApiSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    product: productReducer,
    cart:cartReducer,
    [categoryApiSlice.reducerPath]: categoryApiSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [productApiSlice.reducerPath]: productApiSlice.reducer,
    [ratingApiSlice.reducerPath]: ratingApiSlice.reducer,
    [cartApiSlice.reducerPath]:cartApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(categoryApiSlice.middleware)
      .concat(authApiSlice.middleware)
      .concat(productApiSlice.middleware)
      .concat(ratingApiSlice.middleware)
      .concat(cartApiSlice.middleware),
});

export default store;
