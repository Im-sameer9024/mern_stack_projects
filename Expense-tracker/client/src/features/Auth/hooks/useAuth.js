import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { GetApiErrorMessage, GetApiResponseMessage } from '@/shared/utils/apiMessage';
import { useAuthStore } from '@/app/store/authStore';
import { useNavigate } from 'react-router-dom';
import queryClient from '@/shared/utils/reactQuery';
import { AuthApiOperations } from '../authApiOperations';

export const useLoginUser = () => {
  //------------- zustand store----------
  const authStore = useAuthStore.getState();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: AuthApiOperations.LoginUser,
    onSuccess: (data) => {
      authStore.setToken(data?.data?.accessToken);
      localStorage.setItem('temp', data?.data?.randomByte);
      navigate('/dashboard');
      toast.success(GetApiResponseMessage(data));
    },
    onError: (error) => {
      console.log(error);
      toast.error(GetApiErrorMessage(error));
    },
  });
};

export const useSignupUser = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: AuthApiOperations.SignupUser,
    onSuccess: (data) => {
      toast.success(GetApiResponseMessage(data));
      navigate('/login');
    },
    onError: (error) => {
      toast.error(GetApiErrorMessage(error));
    },
  });
};

export const useGetUserDetails = () => {
  const temp = localStorage.getItem('temp');
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: ['userDetails', temp],
    queryFn: AuthApiOperations.GetUserDetails,
    enabled: !!token,
  });
};

export const useLogoutUser = () => {
  const navigate = useNavigate();
  const clearToken = useAuthStore((state) => state.clearToken);
  return useMutation({
    mutationFn: AuthApiOperations.LogoutUser,
    onSuccess: (data) => {
      toast.success(GetApiResponseMessage(data));
      navigate('/login');
      clearToken();
      queryClient.clear();
      localStorage.clear();
    },
    onError: (error) => {
      toast.error(GetApiErrorMessage(error));
    },
  });
};

export const useResetPasswordLink = () => {
  return useMutation({
    mutationFn: AuthApiOperations.ResetPasswordLink,
    onSuccess: (data) => {
      toast.success(GetApiResponseMessage(data));
    },
    onError: (error) => {
      toast.error(GetApiErrorMessage(error));
    },
  });
};

export const useResetPassword = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: AuthApiOperations.ResetPassword,
    onSuccess: (data) => {
      toast.success(GetApiResponseMessage(data));
      navigate('/login');
    },
    onError: (error) => {
      toast.error(GetApiErrorMessage(error));
    },
  });
};

export const useUpdateProfileImage = () => {
  const temp = localStorage.getItem('temp');
  return useMutation({
    mutationFn: AuthApiOperations.UpdateProfileImage,
    onSuccess: (data) => {
      queryClient.setQueryData(['userDetails', temp], data);
      toast.success(GetApiResponseMessage(data));
    },
    onError: (error) => {
      toast.error(GetApiErrorMessage(error));
    },
  });
};
