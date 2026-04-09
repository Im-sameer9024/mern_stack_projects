'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/app/store/authStore';
import { axiosInstance } from '@/services/apiConnector';

const AuthChecker = () => {
  const setToken = useAuthStore((state) => state.setToken);
  const setTokenLoading = useAuthStore((state) => state.setTokenLoading);

  useEffect(() => {
    const initAuth = async () => {
      try {
        setTokenLoading(true);

        // 🔥 call refresh token API
        const res = await axiosInstance.get('/user/refresh-token', {
          __skipAuthRefresh: true,
        });

        if (res.data?.success) {
          setToken(res.data?.data?.accessToken);
        }
      } catch (error) {
        console.log(error);
        setToken(null);
      } finally {
        setTokenLoading(false);
      }
    };

    initAuth();
  }, [setToken, setTokenLoading]);

  return null;
};

export default AuthChecker;
