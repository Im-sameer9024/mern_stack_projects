import { useAuthStore } from '@/app/store/authStore';
import { AuthApiOperations } from '@/features/Auth/authApiOperations';
import { axiosInstance } from '@/services/apiConnector';
import React, { useEffect } from 'react';
import { toast } from 'sonner';
import queryClient from './reactQuery';

const AuthChecker = () => {
  //-------------- zustand store ------------
  const setToken = useAuthStore((state) => state.setToken);
  const handleAutoLogout = () => {
    const { clearToken } = useAuthStore.getState();

    // clear auth
    clearToken();

    // clear queries
    queryClient.clear();

    // clear storage
    localStorage.clear();
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const res = await axiosInstance.get('/user/refresh-token', {
          __skipAuthRefresh: true,
          __skipLoader: true,
        });

        const newAccessToken = res.data?.data?.accessToken;

        if (newAccessToken) {
          setToken(newAccessToken);
        }
      } catch (error) {
        if (error?.response?.status === 401) {
          handleAutoLogout();
        } else {
          toast.error(error.response?.data?.message || 'Something went wrong');
        }
      }
    };

    initializeAuth();
  }, [setToken]);

  return null;
};

export default AuthChecker;
