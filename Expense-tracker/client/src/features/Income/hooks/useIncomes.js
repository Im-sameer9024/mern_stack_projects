import { useMutation, useQuery } from '@tanstack/react-query';
import { incomeApiOperations } from '../incomeApiOperations';
import queryClient from '@/shared/utils/reactQuery';
import { toast } from 'sonner';
import { GetApiErrorMessage, GetApiResponseMessage } from '@/shared/utils/apiMessage';

export const useAddIncome = () => {
  const temp = localStorage.getItem('temp');
  return useMutation({
    mutationFn: incomeApiOperations.AddIncome,
    onSuccess: (data) => {
      // ✅ invalidate ALL income lists (with filters)
      queryClient.invalidateQueries({
        queryKey: ['incomes', temp],
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

export const useUpdateIncome = () => {
  const temp = localStorage.getItem('temp');
  return useMutation({
    mutationFn: incomeApiOperations.UpdateIncome,
    onSuccess: (data, variables) => {
      const incomeId = variables?.incomeId;

      console.log(incomeId);
      // invalidate list
      queryClient.invalidateQueries({
        queryKey: ['incomes', temp],
      });

      //invalidate single
      queryClient.invalidateQueries({
        queryKey: ['income', temp, incomeId],
      });

      //invalidate transactions list
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

export const useDeleteIncome = () => {
  const temp = localStorage.getItem('temp');
  return useMutation({
    mutationFn: incomeApiOperations.DeleteIncome,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['incomes', temp],
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

export const useDeleteAllIncomes = () => {
  const temp = localStorage.getItem('temp');

  return useMutation({
    mutationFn: incomeApiOperations.DeleteAllIncomes,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['incomes', temp],
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

export const useGetSingleIncome = (incomeId) => {
  const temp = localStorage.getItem('temp');

  return useQuery({
    queryKey: ['income', temp, incomeId],
    queryFn: () => incomeApiOperations.GetSingleIncome(incomeId),
    enabled: !!incomeId,
  });
};

export const useGetAllIncomes = ({ page, limit, sort, startDate, endDate, source }) => {
  const temp = localStorage.getItem('temp');
  return useQuery({
    queryKey: ['incomes', temp, { page, limit, sort, startDate, endDate, source }],
    queryFn: () =>
      incomeApiOperations.GetAllIncomes({ page, limit, sort, startDate, endDate, source }),
  });
};
