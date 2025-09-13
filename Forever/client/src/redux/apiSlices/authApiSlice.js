import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Auth"],

  endpoints: (builder) => ({
    //------------------send-otp api --------------------
    SendOtp: builder.mutation({
      query: (data) => ({
        url: "/sendOtp",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),

    //------------------signup api --------------------
    Signup: builder.mutation({
      query: (data) => ({
        url: "/signup",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),

    //------------------login api --------------------
    Login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),

    //------------------get-login-user-details api --------------------
    GetLoginUserDetails: builder.query({
      query: () => "/user-details",
      providesTags: ["Auth"],
    }),
  }),
});

export const {
  useSendOtpMutation,
  useSignupMutation,
  useLoginMutation,
  useGetLoginUserDetailsQuery,
} = authApiSlice;
