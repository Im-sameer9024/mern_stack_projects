import { useAuthStore } from '@/app/store/authStore';
import { AuthApiOperations } from '@/features/Auth/authApiOperations';
import axios from 'axios';

//----------------- Main axios instance---------------------
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: 30000, // 30 sec
});

//------------------------- Request Interceptor -----------------------------

axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

//------------------------- Response Interceptor -----------------------------

let isRefreshing = false;
let isLoggingOut = false;

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error?.config;
    const { setToken, clearToken } = useAuthStore.getState();

    // ❌ Network / unknown error
    if (!error?.response || !originalRequest) {
      return Promise.reject(error);
    }

    const status = error?.response?.status;

    if (originalRequest.__skipAuthRefresh) {
      return Promise.reject(error);
    }

    if (status === 401 && !originalRequest._retry && !originalRequest.__skipAuthRefresh) {
      originalRequest._retry = true;
      //---------------------if already refreshing token -----------------

      if (isRefreshing) {
        return  new Promise(() => {});
      }

      //--------------- start Refresh--------------------------

      isRefreshing = true;

      try {
        const res = await axiosInstance.get('/user/refresh-token', {
          __skipAuthRefresh: true,
        });
        const newAccessToken = res?.data?.data?.accessToken;

        if (!newAccessToken) {
          throw new Error('No access token received');
        }

        // save token
        setToken(newAccessToken);
        // resolve queued requests

        // retry original request
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        if (!isLoggingOut) {
          isLoggingOut = true;

          await AuthApiOperations.LogoutUser();
          clearToken();
          localStorage.removeItem('temp');
          // redirect user
          window.location.replace("/login")
        }
        //-------- logout flow ---------------

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export const apiConnector = ({ method, url, bodyData, headers, params, responseType }) => {
  return axiosInstance({
    method: method,
    url: url,
    data: bodyData ,
    headers: headers ? headers : {},
    params: params ? params : {},
    responseType: responseType ? responseType : null,
  });
};
