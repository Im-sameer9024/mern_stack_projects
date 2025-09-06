import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user:null,
  signupData:null,
  resetPasswordEmail:null,
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
    }
  },
});

export const { setToken, setUser,setSignupData,setResetPasswordEmail } = authSlice.actions;
export default authSlice.reducer;
