import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  step: 1,
  course: null,
  courseId: null,
  isEditCourse: false,

  // Section
  section: null,        // full section object when editing a section title
  sectionId: null,
  isEditSection: false,

  // SubSection (Lecture)
  subSection: null,     // full subSection object when editing a lecture
  subSectionId: null,
  isEditSubSection: false,

  isLoading: false,
};

export const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    setCourse: (state, action) => {
      state.course = action.payload;
    },
    setCourseId: (state, action) => {
      state.courseId = action.payload;
    },
    setIsEditCourse: (state, action) => {
      state.isEditCourse = action.payload;
    },

    // ── Section ──────────────────────────────────────────────────────────────
    setSection: (state, action) => {
      state.section = action.payload;
    },
    setSectionId: (state, action) => {
      state.sectionId = action.payload;
    },
    setIsEditSection: (state, action) => {
      state.isEditSection = action.payload;
    },

    // ── SubSection / Lecture ──────────────────────────────────────────────────
    setSubSection: (state, action) => {
      state.subSection = action.payload;
    },
    setSubSectionId: (state, action) => {
      state.subSectionId = action.payload;
    },
    setIsEditSubSection: (state, action) => {
      state.isEditSubSection = action.payload;
    },

    // ── Steps ─────────────────────────────────────────────────────────────────
    setStep: (state, action) => {
      state.step = action.payload;
    },
    nextStep: (state) => {
      if (state.step < 3) state.step += 1;
    },
    prevStep: (state) => {
      if (state.step > 1) state.step -= 1;
    },

    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    // Fully reset everything when leaving the add-course page
    clearCourseData: (state) => {
      state.course = null;
      state.courseId = null;
      state.isEditCourse = false;
      state.section = null;
      state.sectionId = null;
      state.isEditSection = false;
      state.subSection = null;
      state.subSectionId = null;
      state.isEditSubSection = false;
      state.isLoading = false;
      state.step = 1;
    },
  },
});

export const {
  setCourse,
  setCourseId,
  setIsEditCourse,
  setSection,
  setSectionId,
  setIsEditSection,
  setSubSection,
  setSubSectionId,
  setIsEditSubSection,
  setStep,
  nextStep,
  prevStep,
  setLoading,
  clearCourseData,
} = courseSlice.actions;

export default courseSlice.reducer;