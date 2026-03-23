import { logout, setToken } from '@/features/Auth/authSlice';
import { clearUserData } from '@/features/Auth/userSlice';
import { persistor, store } from '@/store/store';
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: 600000,
});

const MAX_QUEUE_SIZE = 20;
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });

  failedQueue = [];
};

axiosInstance.interceptors.request.use((config) => {
  const token = store.getState().auth.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/user/refresh-token')
    ) {
      if (isRefreshing) {
        // ✅ Guard: reject immediately if queue is too large
        if (failedQueue.length >= MAX_QUEUE_SIZE) {
          return Promise.reject(new Error('Too many queued requests during token refresh'));
        }
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }
      originalRequest._retry = true;
      isRefreshing = true;
      try {
        const res = await axiosInstance.get(`/user/refresh-token`);
        const newAccessToken = res.data?.data?.accessToken;

        store.dispatch(setToken(newAccessToken));
        processQueue(null, newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        store.dispatch(logout());
        store.dispatch(clearUserData());
        persistor.purge();
        // window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export const apiConnector = ({ method, url, bodyData, headers, params, onUploadProgress }) => {
  return axiosInstance({
    method: method,
    url: url,
    data: bodyData,
    headers: headers,
    params: params,
    onUploadProgress,
  });
};
