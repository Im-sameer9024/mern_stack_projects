import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  user: null,
  loading:false,
  signupData: null,
  resetPasswordEmail: null,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setSignupData: (state, action) => {
      state.signupData = action.payload;
    },
    setResetPasswordEmail: (state, action) => {
      state.resetPasswordEmail = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setLoading:(state,action) =>{
      state.loading = action.payload
    }
  },
});

export const {
  setToken,
  setUser,
  setIsLoggedIn,
  setSignupData,
  setLoading,
  setResetPasswordEmail,
} = authSlice.actions;
export default authSlice.reducer;