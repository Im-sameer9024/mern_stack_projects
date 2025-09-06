import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ratingApiSlice = createApi({
  reducerPath: "ratingApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Rating"],

  endpoints: (builder) => ({
    //---------------------------Create Rating---------------------
    CreateRating: builder.mutation({
      query: (data) => ({
        url: "/create-rating-review",
        method: "POST",
        body: data,
      }),
    }),

    //----------------------------Get Average Rating of a Product---------------------
    GetAverageRating: builder.query({
      query: (productId) => `/get-average-rating/${productId}`,
      providesTags: ["Rating"],
    }),

    //----------------------------Get All Ratings of a Product---------------------

    GetAllRatings: builder.query({
      query:(productId)=> `/get-all-rating/${productId}`,
      providesTags: ["Rating"],
    })
  }),
});

export const { useCreateRatingMutation, useGetAverageRatingQuery,useGetAllRatingsQuery } =
  ratingApiSlice;
