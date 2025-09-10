import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api", credentials: "include" }),
  tagTypes: ["Auth"],

  endpoints: (builder) => ({
    //-----------------------Login user -----------------------

    Login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),

    //------------------------Send Otp -----------------------

    SendOtp: builder.mutation({
      query: (data) => ({
        url: "/send-otp",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),

    //------------------------Sign up user ------------------------

    SignUp: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),

    //------------------------get Login User Details-----------------

    GetLoginUser: builder.query({
      query: () => ({ url: "/status", method: "GET" }),
      transformResponse:(response)=>{
        return {
          success:response.success,
          user:response.user || null,
          message:response.message
        }
      },
      providesTags: ["Auth"],
    }),

    //--------------------------Logout User-----------------

    LogoutUser: builder.mutation({
      query: () => ({ url: "/logout", method: "GET" }),
      invalidatesTags: ["Auth"],
    }),

    //--------------------------Reset - Password - Token--------------

    ResetPasswordToken: builder.mutation({
      query: (data) => ({
        url: "/reset-password-token",
        method: "POST",
        body: data,
      }),
    }),

    //--------------------------- Reset - Password ----------------------

    ResetPassword: builder.mutation({
      query: (data) => ({
        url: "/reset-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSendOtpMutation,
  useResetPasswordMutation,
  useResetPasswordTokenMutation,
  useSignUpMutation,
  useGetLoginUserQuery,
  useLogoutUserMutation
} = authApiSlice;
