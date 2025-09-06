import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  course: null,
  activeStep: 0,
  editCourse:false,
  paymentLoading:false,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCourse: (state, action) => {
      state.course = action.payload;
    },
    setActiveStep: (state, action) => {
      state.activeStep = action.payload;
    },
    setEditCourse: (state, action) => {
      state.editCourse = action.payload;
    }
  },
});

export const { setCourse,setActiveStep,setEditCourse } = courseSlice.actions;

export default courseSlice.reducer;
