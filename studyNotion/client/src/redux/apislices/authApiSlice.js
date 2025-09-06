import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const authApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/api" }),
  tagTypes: ["Auth"],

  endpoints: (builder) => ({
    //-----------------send otp----------------
    sendOtp: builder.mutation({
      query: (otpData) => ({
        url: "/send-otp",
        method: "POST",
        body: otpData,
      }),
      invalidatesTags: ["Auth"],
    }),

    //---------------Login----------------
    login: builder.mutation({
      query: (loginData) => ({
        url: "/login",
        method: "POST",
        body: loginData,
      }),
      invalidatesTags: ["Auth"],
    }),

    //---------------Signup----------------
    signup: builder.mutation({
      query: (signupData) => ({
        url: "/signup",
        method: "POST",
        body: signupData,
      }),
      invalidatesTags: ["Auth"],
    }),

    //---------------reset password token ----------------
    resetPasswordToken:builder.mutation({
      query:(email) =>({
        url:"/reset-password-token",
        method:"POST",
        body:email
      }),
      invalidatesTags:["Auth"]
    }),

    //---------------reset password ----------------
    resetPassword:builder.mutation({
      query:(resetPasswordData) =>({
        url:"/reset-password",
        method:"POST",
        body:resetPasswordData
      }),
      invalidatesTags:["Auth"]
    }),

    contactUs:builder.mutation({
      query:(contactData) =>({
        url:"/contact-us",
        method:"POST",
        body:contactData
      }),
      invalidatesTags:["Auth"]
    })
  }),
});

export const {
  useSendOtpMutation,
  useLoginMutation,
  useSignupMutation,
  useResetPasswordTokenMutation,
  useResetPasswordMutation,
  useContactUsMutation
} = authApiSlice;
