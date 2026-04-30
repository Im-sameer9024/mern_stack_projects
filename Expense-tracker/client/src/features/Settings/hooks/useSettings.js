import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { GetApiErrorMessage, GetApiResponseMessage } from '@/shared/utils/apiMessage';
import { settingsApiOperations } from '../settingsApiOperations';
import { useAuthStore } from '@/app/store/authStore';
import queryClient from '@/shared/utils/reactQuery';

export const useClearUserData = () => {
  return useMutation({
    mutationFn: settingsApiOperations.ClearUserData,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['incomes'] });
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-data'] });
      toast.success(GetApiResponseMessage(data));
    },
    onError: (error) => {
      toast.error(GetApiErrorMessage(error));
    },
  });
};

export const useDeleteAccount = () => {
  const navigate = useNavigate();
  const clearToken = useAuthStore((state) => state.clearToken);

  return useMutation({
    mutationFn: settingsApiOperations.DeleteUserAccount,
    onSuccess: (data) => {
      toast.success(GetApiResponseMessage(data));
      clearToken();
      queryClient.clear();
      localStorage.clear();
      navigate('/login');
    },
    onError: (error) => {
      toast.error(GetApiErrorMessage(error));
    },
  });
};
