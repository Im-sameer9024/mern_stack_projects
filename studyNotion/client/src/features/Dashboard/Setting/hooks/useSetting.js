import { useMutation } from '@tanstack/react-query';
import { settingApiOperations } from '../operations/settingApiOperations';
import queryClient from '@/utils/reactQuery';
import { toast } from 'sonner';
import { getErrorMessage } from '@/utils/helpers';

export const useChangePassword = () => {
  return useMutation({
    mutationFn: settingApiOperations.ChangePassword,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['userDetails'] });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};
