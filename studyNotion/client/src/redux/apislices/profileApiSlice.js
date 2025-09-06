import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const profileApiSlice = createApi({
  reducerPath: "profileApi",
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
  tagTypes: ["Profile"],

  endpoints: (builder) => ({
    //-------------upload profile image---------------
    uploadProfileImage: builder.mutation({
      query: (data) => ({
        url: "/update-display-picture",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),

    //------------------update the user details ---------------
    updateProfileDetails: builder.mutation({
      query: (data) => ({
        url: "/create-profile",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),

    //-------------------get the user details ---------------
    getUserDetails: builder.query({
      query: () => "/get-user-details",
      providesTags: ["Profile"],
    }),
  }),
});

export const {
  useUploadProfileImageMutation,
  useUpdateProfileDetailsMutation,
  useGetUserDetailsQuery,
} = profileApiSlice;
