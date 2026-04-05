import { useMutation, useQuery } from '@tanstack/react-query';
import { expenseApiOperations } from '../expenseApiOperations';
import { toast } from 'sonner';
import { GetApiErrorMessage, GetApiResponseMessage } from '@/shared/utils/apiMessage';
import queryClient from '@/shared/utils/reactQuery';

export const useGetAllExpense = ({ page, limit, sort, source, startDate, endDate }) => {
  const temp = localStorage.getItem('temp');
  return useQuery({
    queryKey: ['expense', temp, page, limit, sort, source, startDate, endDate],
    queryFn: () =>
      expenseApiOperations.GetAllExpense({ page, limit, sort, source, startDate, endDate }),
  });
};

export const useAddExpense = () => {
  const temp = localStorage.getItem('temp');

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
  const temp = localStorage.getItem('temp');

  return useMutation({
    mutationFn: expenseApiOperations.UpdateExpense,
    onSuccess: (data, variables) => {
      const expenseId = variables?.expenseId;
      queryClient.invalidateQueries({
        queryKey: ['expense', temp],
      });

       queryClient.invalidateQueries({
        queryKey: ['expense', temp, expenseId],
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

export const useDeleteExpense = () => {
  const temp = localStorage.getItem('temp');

  return useMutation({
    mutationFn: expenseApiOperations.DeleteExpense,
    onSuccess: (data, variables) => {
      
      const expenseId = variables?.expenseId;
      queryClient.invalidateQueries({
        queryKey: ['expense', temp,expenseId],
      });
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

export const useGetSingleExpense = (expenseId) => {
  const temp = localStorage.getItem('temp');

  return useQuery({
    queryKey: ['expense', temp, expenseId],
    queryFn: () => expenseApiOperations.GetSingleExpense(expenseId),
    enabled:!!expenseId,
  });
};

export const useDownloadExpensePdf = ({ startDate, endDate }) => {
  const temp = localStorage.getItem('temp');

  return useQuery({
    queryKey: ['expense', temp, startDate, endDate],
    queryFn: () => expenseApiOperations.DownloadExpensePdf({ startDate, endDate }),
  });
};
