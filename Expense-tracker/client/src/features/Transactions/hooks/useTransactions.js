import { useQuery } from '@tanstack/react-query';
import { transactionApiOperations } from '../transactionsApiOperations';

export const useGetAllTransactions = ({ page, limit, sort, startDate, endDate }) => {
  const temp = localStorage.getItem('temp');

  return useQuery({
    queryKey: ['transactions',temp,page,limit,sort,startDate,endDate],
    queryFn: () =>
      transactionApiOperations.GetAllTransactions({ page, limit, sort, startDate, endDate }),
  });
};
