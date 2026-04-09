import axios from "axios";
import { useAuthStore } from "@/app/store/authStore";
import { AuthApiOperations } from "@/features/Auth/authApiOperations";

// ---------------- AXIOS INSTANCE ----------------
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: 30000,
});

// ---------------- REQUEST ----------------
axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ---------------- RESPONSE ----------------
let isRefreshing = false;
let isLoggingOut = false;

axiosInstance.interceptors.response.use(
  (res) => res,

  async (error) => {
    const originalRequest = error?.config;
    const { setToken, clearToken } = useAuthStore.getState();

    // ❌ Network / unknown error
    if (!error?.response || !originalRequest) {
      return Promise.reject(error);
    }

    const status = error.response.status;

    // 🔥 Skip refresh API itself
    if (originalRequest.url?.includes("/refresh-token")) {
      return Promise.reject(error);
    }

    // ---------------- HANDLE 401 ----------------
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // 🔒 Prevent multiple refresh calls
      if (isRefreshing) {
        return Promise.reject(error);
      }

      isRefreshing = true;

      try {
        const res = await axiosInstance.get("/refresh-token", {
          __skipAuthRefresh: true,
        });

        const newToken = res?.data?.data?.accessToken;

        if (!newToken) throw new Error("No token");

        // ✅ Save token
        setToken(newToken);

        // ✅ Retry original request
        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${newToken}`,
        };

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // 🔴 Logout only once
        if (!isLoggingOut) {
          isLoggingOut = true;

          try {
            await AuthApiOperations.LogoutUser();
          } catch (e) {
            console.warn("Logout API failed");
          }

          clearToken();
          localStorage.removeItem("auth-storage");

          window.location.assign("/login");
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// ---------------- API CONNECTOR ----------------
export const apiConnector = ({
  method,
  url,
  bodyData,
  headers,
  params,
  responseType,
}) => {
  return axiosInstance({
    method,
    url,
    data: bodyData || undefined,
    headers: headers || {},
    params: params || {},
    responseType: responseType || "json",
  });
};
