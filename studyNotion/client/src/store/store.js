import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/Auth/authSlice';
import userReducer from '../features/Auth/userSlice';
import courseReducer from '../features/Dashboard/AddCourse/courseSlice';
import storageSession from 'redux-persist/lib/storage/session';
import { persistReducer, persistStore } from 'redux-persist';
import cartReducer from '../features/Cart/cartSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  course: courseReducer,
  cart:cartReducer,
});

const persistConfig = {
  key: 'root',
  storage: storageSession,
  whitelist: ['user'], // only persist user slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

export const persistor = persistStore(store);
