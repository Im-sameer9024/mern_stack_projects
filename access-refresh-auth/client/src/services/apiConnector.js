import axios from "axios";
import { useAuthStore } from "../features/Auth/authStore";

const BASE_URL = import.meta.env.VITE_API_URL;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 50000,
});

// ---------------- REQUEST ----------------
axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// ---------------- RESPONSE ----------------
let isRefreshing = false;
let isLoggingOut = false;

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;
    const { setToken } = useAuthStore.getState();

    // ❌ No response (network error)
    if (!error.response) {
      return Promise.reject(error);
    }

    // ❌ No config
    if (!originalRequest) {
      return Promise.reject(error);
    }

    const status = error.response.status;

    // 🔥 IMPORTANT: Skip refresh API itself
    if (originalRequest.url?.includes("/api/refresh-token")) {
      return Promise.reject(error);
    }

    // ---------------- HANDLE 401 ----------------
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return Promise.reject(error);
      }

      isRefreshing = true;

      try {
        const res = await axiosInstance.get("/api/refresh-token");
        const newAccessToken = res.data?.data?.accessToken;

        if (!newAccessToken) throw new Error("No token");

        setToken(newAccessToken);

        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // 🔴 LOGOUT ONLY ONCE
        if (!isLoggingOut) {
          isLoggingOut = true;

          setToken(null);
          window.location.assign("/login");
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

// ---------------- API CONNECTOR ----------------
export const apiConnector = ({ method, url, bodyDate, headers, params }) => {
  return axiosInstance({
    method,
    url,
    data: bodyDate || null,
    headers: headers || {},
    params: params || {},
  });
};
