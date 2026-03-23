import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { axiosInstance } from '@/services/apiConnector';
import { logout, setAuthLoading, setToken } from '@/features/Auth/authSlice';
import { persistor } from '@/store/store';
import queryClient from './reactQuery';

const AuthInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const res = await axiosInstance.get('/user/refresh-token');

        const newAccessToken = res.data?.data?.accessToken;

        if (newAccessToken) {
          dispatch(setToken(newAccessToken));
        }
      } catch (error) {
        if (error.response?.status === 401) {
          // refresh token expired → logout user
          dispatch(logout());
          persistor.purge();
          queryClient.clear();
        } else {
          console.error('Auth initialization error:', error);
        }
      } finally {
        dispatch(setAuthLoading(false));
      }
    };

    initializeAuth();
  }, [dispatch]);

  return null;
};

export default AuthInitializer;
