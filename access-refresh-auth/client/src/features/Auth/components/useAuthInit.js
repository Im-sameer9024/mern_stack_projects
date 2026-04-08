import { useEffect, useState } from "react";
import { useAuthStore } from "../authStore";
import { axiosInstance } from "../../../services/apiConnector";

const useAuthInit = () => {
  const [loading, setLoading] = useState(true);
  const { setToken } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const res = await axiosInstance.get("/api/refresh-token");
        if (res.data?.success) {
          setToken(res.data?.data?.accessToken);
        }
      } catch (error) {
        if (error.response?.status === 401) {
          // user not logged in → do nothing
          return;
        }
        // not logged in
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [setToken]);

  return loading;
};

export default useAuthInit;
