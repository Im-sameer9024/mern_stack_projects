import { useMutation } from '@tanstack/react-query';
import { AuthApiOperations } from '../authApiOperations';
import { toast } from 'sonner';
import { GetApiErrorMessage, GetApiResponseMessage } from '@/shared/utils/apiMessage';
import { useAuthStore } from '@/app/store/authStore';
import { useNavigate } from 'react-router-dom';

export const useLoginUser = () => {
  //------------- zustand store----------
  const authStore = useAuthStore.getState();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: AuthApiOperations.LoginUser,
    onSuccess: (data) => {
      authStore.setToken(data?.data?.accessToken);
      navigate('/dashboard');
      toast.success(GetApiResponseMessage(data));
    },
    onError: (error) => {
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
