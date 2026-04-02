import { apiConnector } from '@/services/apiConnector';
import { userApiUrls } from '@/services/apiEndpoints';

const { SIGNUP_USER, LOGIN_USER, REFRESH_TOKEN, LOGOUT_USER, GET_USER_DETAILS } = userApiUrls;

export const AuthApiOperations = {
  //------------------ user register --------------
  SignupUser: async (data) => {
    const response = await apiConnector({
      method: 'POST',
      url: SIGNUP_USER,
      bodyData: data,
    });
    return response.data;
  },

  //--------------------- user Login ---------------------

  LoginUser: async (data) => {
    const response = await apiConnector({
      method: 'POST',
      url: LOGIN_USER,
      bodyData: data,
    });
    return response.data;
  },

  // --------------  Token refresh ------------------

  RefreshToken: async () => {
    const response = await apiConnector({
      method: 'GET',
      url: REFRESH_TOKEN,
    });
    return response.data;
  },

  //----------------------- user Logout ----------------------

  LogoutUser: async () => {
    const response = await apiConnector({
      method: 'GET',
      url: LOGOUT_USER,
    });
    return response.data;
  },

  //-------------------- user Details ------------------

  GetUserDetails: async () => {
    const response = await apiConnector({
      method: 'GET',
      url: GET_USER_DETAILS,
    });
    return response.data;
  },
};
