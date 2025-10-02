import { createSlice } from "@reduxjs/toolkit";

interface initialStateProps {
  user: null | object;
  token: null | string;
}

const initialState: initialStateProps = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setToken } = authSlice.actions;

export default authSlice.reducer;
