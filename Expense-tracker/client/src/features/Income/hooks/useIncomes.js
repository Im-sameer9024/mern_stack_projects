import { useMutation, useQuery } from '@tanstack/react-query';
import { incomeApiOperations } from '../incomeApiOperations';
import queryClient from '@/shared/utils/reactQuery';
import { toast } from 'sonner';
import { GetApiErrorMessage, GetApiResponseMessage } from '@/shared/utils/apiMessage';
import { useAuthStore } from '@/app/store/authStore';

export const useAddIncome = () => {
  // key from the backend and store in localStorage and get by zustand
  const temp = useAuthStore((state) => state.getUserKey());
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
  const temp = useAuthStore((state) => state.getUserKey());
  return useMutation({
    mutationFn: incomeApiOperations.UpdateIncome,
    onSuccess: async (data, variables) => {
      const incomeId = variables?.incomeId;

      // invalidate list
      queryClient.invalidateQueries({
        queryKey: ['incomes', temp],
      });

      //invalidate single
      queryClient.setQueryData(['incomes', temp, incomeId], (old) => ({
        ...old,
        data: data.data?.updatedIncome,
      }));

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
  const temp = useAuthStore((state) => state.getUserKey());
  return useMutation({
    mutationFn: incomeApiOperations.DeleteIncome,
    onSuccess: async (data, variables) => {
      const incomeId = variables?.incomeId;

      (queryClient.invalidateQueries({
        queryKey: ['incomes', temp],
      }),
        //invalidate single
        queryClient.removeQueries({
          queryKey: ['incomes', temp, incomeId],
        }),
        queryClient.invalidateQueries({
          queryKey: ['transactions', temp],
        }),
        toast.success(GetApiResponseMessage(data)));
    },
    onError: (error) => {
      toast.error(GetApiErrorMessage(error));
    },
  });
};

export const useDeleteAllIncomes = () => {
  const temp = useAuthStore((state) => state.getUserKey());

  return useMutation({
    mutationFn: incomeApiOperations.DeleteAllIncomes,
    onSuccess: async (data) => {
      (queryClient.removeQueries({
        queryKey: ['incomes', temp],
      }),
        queryClient.removeQueries({
          queryKey: ['transactions', temp],
        }),
        toast.success(GetApiResponseMessage(data)));
    },
    onError: (error) => {
      toast.error(GetApiErrorMessage(error));
    },
  });
};

export const useGetSingleIncome = (incomeId) => {
  const temp = useAuthStore((state) => state.getUserKey());

  return useQuery({
    queryKey: ['incomes', temp, incomeId],
    queryFn: () => incomeApiOperations.GetSingleIncome(incomeId),
    enabled: !!incomeId,
  });
};

export const useGetAllIncomes = ({ page, limit, sort, startDate, endDate, source }) => {
  const temp = useAuthStore((state) => state.getUserKey());
  return useQuery({
    queryKey: ['incomes', temp, page, limit, sort, startDate, endDate, source],

    queryFn: () =>
      incomeApiOperations.GetAllIncomes({ page, limit, sort, startDate, endDate, source }),
  });
};

export const useDownloadIncomePdf = () => {
  return useMutation({
    mutationFn: (params) => incomeApiOperations.DownloadPdfIncome(params),
    onSuccess: (data) => {
      if (data.type !== 'application/pdf') {
    toast.error('Failed to download PDF');
    return;
  }
      const url = window.URL.createObjectURL(data); // no need new Blob

      const link = document.createElement('a');
      link.href = url;
      link.download = 'income-report.pdf';

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
