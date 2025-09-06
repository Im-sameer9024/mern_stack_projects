import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import profileReducer from "./slices/profileSlice";
import cartReducer from "./slices/cartSlice";
import { categoryApiSlice } from "./apislices/categoryApiSlice";
import { authApiSlice } from "./apislices/authApiSlice";
import { profileApiSlice } from "./apislices/profileApiSlice";
import courseReducer from "./slices/courseSlice";
import { courseApiSlice } from "./apislices/courseApiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    cart: cartReducer,
    course:courseReducer,
    [categoryApiSlice.reducerPath]: categoryApiSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [profileApiSlice.reducerPath]:profileApiSlice.reducer,
    [courseApiSlice.reducerPath]:courseApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(categoryApiSlice.middleware)
      .concat(authApiSlice.middleware)
      .concat(profileApiSlice.middleware)
      .concat(courseApiSlice.middleware),
});
