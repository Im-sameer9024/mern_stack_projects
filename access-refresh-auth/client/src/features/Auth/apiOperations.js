import { apiConnector } from "../../services/apiConnector";
import { userApiUrls } from "../../services/apiEndPoints";

export const SignupUser = async (data) => {
  const response = await apiConnector({
    method: "POST",
    url: userApiUrls.SIGNUP_USER,
    bodyDate: data,
  });

  return response.data;
};

export const LoginUser = async (data) => {
  const response = await apiConnector({
    method: "POST",
    url: userApiUrls.LOGIN_USER,
    bodyDate: data,
  });
  return response.data;
};

export const GetUser = async () => {
  try {
    const response = await apiConnector({
      method: "GET",
      url: userApiUrls.GET_USER,
    });
    if (response?.data?.success) {
      return response.data?.data || null;
    }
  } catch (error) {
    console.log("Error in GetUser API call: ", error);
    window.alert(
      error.response?.data?.message ||
        "An error occurred during fetching user.",
    );
  }
};

export const RefreshAccessToken = async () => {
  try {
    const response = await apiConnector({
      method: "GET",
      url: userApiUrls.REFRESH_ACCESS_TOKEN,
    });
    if (response?.data?.success) {
      return response.data?.data || null;
    }
  } catch (error) {
    console.log("Error in RefreshAccessToken API call: ", error);
    window.alert(
      error.response?.data?.message ||
        "An error occurred during refreshing access token.",
    );
  }
};
