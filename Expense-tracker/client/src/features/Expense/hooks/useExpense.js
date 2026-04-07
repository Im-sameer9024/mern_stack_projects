import { useMutation, useQuery } from '@tanstack/react-query';
import { expenseApiOperations } from '../expenseApiOperations';
import { toast } from 'sonner';
import { GetApiErrorMessage, GetApiResponseMessage } from '@/shared/utils/apiMessage';
import queryClient from '@/shared/utils/reactQuery';
import { useAuthStore } from '@/app/store/authStore';

export const useGetAllExpense = ({ page, limit, sort, source, startDate, endDate }) => {
  // key from the backend and store in localStorage and get by zustand
  const temp = useAuthStore((state) => state.getUserKey());

  return useQuery({
    queryKey: ['expense', temp, page, limit, sort, source, startDate, endDate],
    queryFn: () =>
      expenseApiOperations.GetAllExpense({ page, limit, sort, source, startDate, endDate }),
  });
};

export const useAddExpense = () => {
  const temp = useAuthStore((state) => state.getUserKey());

  return useMutation({
    mutationFn: expenseApiOperations.AddExpense,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['expense', temp],
      });

      queryClient.invalidateQueries({
        queryKey: ['transactions', temp],
      });
      toast.success(GetApiResponseMessage(data));
    },

    onError: (error) => {
      toast.error(GetApiErrorMessage(error));
    },
  });
};

export const useUpdateExpense = () => {
  const temp = useAuthStore((state) => state.getUserKey());

  return useMutation({
    mutationFn: expenseApiOperations.UpdateExpense,
    onSuccess: (data, variables) => {
      const expenseId = variables?.expenseId;

      console.log('data in update expense', data);
      queryClient.invalidateQueries({
        queryKey: ['expense', temp],
      });

      queryClient.setQueryData(['expense', temp, expenseId], (old) => ({
        ...old,
        data: data.data?.updatedExpense,
      }));

      queryClient.invalidateQueries({
        queryKey: ['transactions', temp],
        exact: false,
      });

      toast.success(GetApiResponseMessage(data));
    },

    onError: (error) => {
      toast.error(GetApiErrorMessage(error));
    },
  });
};

export const useDeleteExpense = () => {
  const temp = useAuthStore((state) => state.getUserKey());

  return useMutation({
    mutationFn: expenseApiOperations.DeleteExpense,
    onSuccess: (data, variables) => {
      const expenseId = variables?.expenseId;
      queryClient.removeQueries({
        queryKey: ['expense', temp, expenseId],
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: ['expense', temp],
      });

      queryClient.invalidateQueries({
        queryKey: ['transactions', temp],
        exact: false,
      });

      toast.success(GetApiResponseMessage(data));
    },
    onError: (error) => {
      toast.error(GetApiErrorMessage(error));
    },
  });
};

export const useGetSingleExpense = (expenseId) => {
  const temp = useAuthStore((state) => state.getUserKey());
  return useQuery({
    queryKey: ['expense', temp, expenseId],
    queryFn: () => expenseApiOperations.GetSingleExpense(expenseId),
    enabled: !!expenseId,
  });
};

export const useDownloadExpensePdf = () => {
  return useMutation({
    mutationFn: (params) => expenseApiOperations.DownloadExpensePdf(params),
    onSuccess: (data) => {
      const url = window.URL.createObjectURL(data); // no need new Blob

      const link = document.createElement('a');
      link.href = url;
      link.download = 'expense-report.pdf';

      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);

      toast.success('PDF downloaded successfully');
    },
    onError: (error) => {
      toast.error(GetApiErrorMessage(error));
    },
  });
};
