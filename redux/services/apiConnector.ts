const { default: axios } = require("axios");
import type { AxiosRequestConfig } from "axios";

interface ApiConnectorProps {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  url: string;
  bodyData?: any | null;
  headers?: any | null;
  params?: any | null;
}

const axiosInstance = axios.create({
  timeout: 10000, // 10 seconds timeout, The timeout option sets the maximum time (in milliseconds) that Axios will wait for a request to complete.
});

// An interceptor lets you run some logic before a request is sent or after a response is received.
// It’s like middleware for Axios.

interface RequestInterceptorConfig extends AxiosRequestConfig {}

interface RequestInterceptorError {
  message?: string;
  config?: AxiosRequestConfig;
  [key: string]: any;
}

axiosInstance.interceptors.request.use(
  (config: RequestInterceptorConfig): RequestInterceptorConfig => {
    const token: string | null = localStorage.getItem("token");
    if (token) {
      if (!config.headers) {
        config.headers = {};
      }
      (
        config.headers as Record<string, string>
      ).Authorization = `Bearer ${JSON.parse(token)}`;
    }
    return config;
  },
  (error: RequestInterceptorError): Promise<RequestInterceptorError> => {
    return Promise.reject(error);
  }
);

interface ResponseInterceptorSuccess {
  data: any;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
  request?: any;
}

interface ResponseInterceptorError {
  response?: {
    status?: number;
    [key: string]: any;
  };
  [key: string]: any;
}

axiosInstance.interceptors.response.use(
  (response: ResponseInterceptorSuccess) => response,
  (error: ResponseInterceptorError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

const apiConnector = async ({
  method,
  url,
  bodyData,
  headers,
  params,
}: ApiConnectorProps) => {
  return axiosInstance({
    method: method,
    url: url,
    data: bodyData ? bodyData : null,
    headers: headers ? headers : null,
    params: params ? params : null,
  });
};

export default apiConnector;
