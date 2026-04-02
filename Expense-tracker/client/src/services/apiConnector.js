import { useAuthStore } from '@/app/store/authStore';
import { AuthApiOperations } from '@/features/Auth/authApiOperations';
import axios from 'axios';

//----------------- Main axios instance---------------------
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: 30000, // 30 sec
  headers: {
    'Content-Type': 'application/json',
  },
});

//----------------- Refresh token axios instance---------------------

const refreshInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

//-----------------Queue Handling ---------------------------

const MAX_QUEUE_SIZE = 20;
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

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

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error?.config;
    const setToken = useAuthStore.getState().setToken;
    const clearToken = useAuthStore.getState().clearToken;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const status = error?.response?.status;

    if (
      (status === 401 || status === 403) &&
      !originalRequest.__isRetryRequest &&
      !originalRequest.url?.includes('/user/refresh-token') &&
      !originalRequest.url?.includes('/user/logout') &&
      !originalRequest.__skipAuthRefresh
    ) {
      //---------------------if already refreshing token -----------------

      if (isRefreshing) {
        if (failedQueue.length >= MAX_QUEUE_SIZE) {
          return Promise.reject(new Error('Too many requests'));
        }

        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      //--------------- start Refresh--------------------------

      originalRequest.__isRetryRequest = true;
      isRefreshing = true;

      try {
        const res = await refreshInstance.get('/user/refresh-token');
        const newAccessToken = res?.data?.data?.accessToken;

        if (!newAccessToken) {
          throw new Error('No access token received');
        }

        // save token
        setToken(newAccessToken);
        // resolve queued requests
        processQueue(null, newAccessToken);

        // retry original request
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.__skipLoader = true;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);

        //-------- logout flow ---------------
        await AuthApiOperations.LogoutUser();
        clearToken();
        localStorage.clear();
        // redirect user
        window.location.href = '/login';

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export const apiConnector = ({ method, url, bodyData, headers, params }) => {
  return axiosInstance({
    method: method,
    url: url,
    data: bodyData ? bodyData : null,
    headers: headers ? headers : null,
    params: params ? params : null,
  });
};
