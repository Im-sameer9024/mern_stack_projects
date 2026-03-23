import { apiConnector } from '@/services/apiConnector';
import { userApiUrls } from '@/services/apiEndpoints';

const {
  SIGNUP_USER,
  LOGIN_USER,
  SEND_OTP,
  REFRESH_ACCESS_TOKEN,
  GET_IN_TOUCH,
  LOGOUT_USER,
  RESET_PASSWORD_TOKEN,
  RESET_PASSWORD,
} = userApiUrls;

export const AuthApiOperations = {
  //--------------------email verify ----------------------------

  SendOtp: async (data) => {
    const response = await apiConnector({
      method: 'POST',
      url: SEND_OTP,
      bodyData: data,
    });
    return response.data;
  },

  //----------------------- user signup ----------------------------

  SignupUser: async (data) => {
    const response = await apiConnector({
      method: 'POST',
      url: SIGNUP_USER,
      bodyData: data,
    });
    return response.data;
  },

  //----------------------- user login ----------------------------

  LoginUser: async (data) => {
    const response = await apiConnector({
      method: 'POST',
      url: LOGIN_USER,
      bodyData: data,
    });
    return response.data;
  },

  //----------------------- refresh access token ----------------------------

  RefreshAccessToken: async () => {
    const response = await apiConnector({
      method: 'GET',
      url: REFRESH_ACCESS_TOKEN,
    });
    return response.data;
  },

  //----------------------- user Contact ----------------------------

  GetInTouch: async (data) => {
    const response = await apiConnector({
      method: 'POST',
      url: GET_IN_TOUCH,
      bodyData: data,
    });
    return response.data;
  },

  //----------------------- user logout ----------------------------

  LogoutUser: async () => {
    const response = await apiConnector({
      method: 'GET',
      url: LOGOUT_USER,
    });
    return response.data;
  },

  //----------------------- reset password token ----------------------------

  ResetPasswordToken: async (data) => {
    const response = await apiConnector({
      method: 'POST',
      url: RESET_PASSWORD_TOKEN,
      bodyData: data,
    });
    return response.data;
  },

  //----------------------- reset password ----------------------------

  ResetPassword: async (data) => {
    const response = await apiConnector({
      method: 'POST',
      url: RESET_PASSWORD,
      bodyData: data,
    });
    return response.data;
  },
};
