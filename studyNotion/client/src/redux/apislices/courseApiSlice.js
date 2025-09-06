import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const courseApiSlice = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api",

    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      // console.log("token in the profile api slice",token)
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Course"],

  endpoints: (builder) => ({
    //-------------Create Course api ---------------

    addCourseDetails: builder.mutation({
      query: (data) => ({
        url: "/create-course",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useAddCourseDetailsMutation } = courseApiSlice;
