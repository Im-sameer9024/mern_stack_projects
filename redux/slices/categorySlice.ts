import { createSlice } from "@reduxjs/toolkit";
import { GetAllCategories } from "../services/operations/categoryApi";

interface CategoryState {
  categories: any[];
  categoryLoading: boolean;
  categoryError: string | null;
}

const initialState: CategoryState = {
  categories: [],
  categoryLoading: false,
  categoryError: null,
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
      state.categoryLoading = false;
      state.categoryError = null;
    },
    setCategoryLoading: (state, action) => {
      state.categoryLoading = action.payload;
      state.categoryError = null;
    },
  },
  extraReducers: (builder) => {
    builder

      //----------case for category api----------
    
      .addCase(GetAllCategories.pending, (state) => {
        state.categoryLoading = true;
        state.categoryError = null;
      })
      .addCase(GetAllCategories.fulfilled, (state, action) => {
        state.categoryLoading = false;
        state.categories = action.payload;
        state.categoryError = null;
      })
      .addCase(GetAllCategories.rejected, (state, action) => {
        state.categoryLoading = false;
        state.categoryError = action.payload as string;
      });
  },
});

export const { setCategories, setCategoryLoading } = categorySlice.actions;

export default categorySlice.reducer;
