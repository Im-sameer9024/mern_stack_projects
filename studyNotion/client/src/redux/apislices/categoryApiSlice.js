import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export const categoryApiSlice = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/api" }),
  tagTypes: ["Categories"],

  endpoints: (builder) => ({
    //-----------------get all categories--------------------
    getAllCategories: builder.query({
      query: () => "/get-all-categories",
      providesTags: ["Categories"],
    }),

    //--------------------get single category details-------------------
    getCategoryDetails: builder.query({
      query: (categoryId) => `/category-page-details/${categoryId}`,
      providesTags: ["Categories"],
    }),

    //------------------create category-------------------
    createCategory: builder.mutation({
      query: (newCategory) => ({
        url: "/create-category",
        method: "POST",
        body: newCategory,
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetCategoryDetailsQuery,
  useCreateCategoryMutation,
} = categoryApiSlice;
