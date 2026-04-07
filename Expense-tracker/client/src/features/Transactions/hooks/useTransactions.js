import { useMutation, useQuery } from '@tanstack/react-query';
import { transactionApiOperations } from '../transactionsApiOperations';
import { toast } from 'sonner';
import { GetApiErrorMessage } from '@/shared/utils/apiMessage';

export const useGetAllTransactions = ({ page, limit, sort, startDate, endDate }) => {
  const temp = localStorage.getItem('temp');

  return useQuery({
    queryKey: ['transactions', temp, page, limit, sort, startDate, endDate],
    queryFn: () =>
      transactionApiOperations.GetAllTransactions({ page, limit, sort, startDate, endDate }),
  });
};

export const useDownloadTransactionPdf = () => {
  return useMutation({
    mutationFn: (params) => transactionApiOperations.DownloadPdfTransaction(params),
    onSuccess: (data) => {
      const url = window.URL.createObjectURL(data); // no need new Blob

      const link = document.createElement('a');
      link.href = url;
      link.download = 'Transactions-report.pdf';

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
