import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: localStorage.getItem("token")|| null,
  loading: false,
  error: null,
  signupData:null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSignupData: (state, action) => {
      state.signupData = action.payload;
    }
  },
});

export const { setToken, setLoading,setSignupData } = authSlice.actions;

export default authSlice.reducer;
