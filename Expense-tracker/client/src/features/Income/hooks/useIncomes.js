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
      queryClient.invalidateQueries({
        queryKey: ['incomes', temp],
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
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['incomes', temp],
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
      toast.success(GetApiResponseMessage(data));
    },
    onError: (error) => {
      toast.error(GetApiErrorMessage(error));
    },
  });
};

export const useGetSingleIncome = (incomeId) => {
  return useQuery({
    queryKey: ['incomes', incomeId],
    queryFn: () => incomeApiOperations.GetSingleIncome(incomeId),
    enabled: !!incomeId,
  });
};

export const useGetAllIncomes = ({ page, limit, sort, startDate, endDate, source }) => {
  const temp = localStorage.getItem('temp');
  return useQuery({
    queryKey: ['incomes', temp, page, limit, sort, startDate, endDate],
    queryFn: () =>
      incomeApiOperations.GetAllIncomes({ page, limit, sort, startDate, endDate, source }),
  });
};
