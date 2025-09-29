import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import authReducer from "./slices/authSlice";
import { authApiSlice } from "./apiSlices/authApiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApiSlice.middleware),
});
