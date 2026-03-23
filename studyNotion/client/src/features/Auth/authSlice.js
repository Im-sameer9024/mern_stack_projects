import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  isAuthLoading: true,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.isAuthLoading = false;
    },
    setAuthLoading: (state, action) => {
      state.isAuthLoading = action.payload;
    },

    logout: (state) => {
      state.token = null;
      state.isAuthLoading = false;
    },
  },
});

export const { setToken, setAuthLoading, logout } = authSlice.actions;

export default authSlice.reducer;
