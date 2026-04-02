import { useQuery } from '@tanstack/react-query';
import { expenseApiOperations } from '../expenseApiOperations';

export const useGetAllExpense = ({ page, limit, sort, category, startDate, endDate }) => {
  const temp = localStorage.getItem('temp');
  return useQuery({
    queryKey: ['expense', temp, page, limit, sort, category, startDate, endDate],
    queryFn: () =>
      expenseApiOperations.GetAllExpense({ page, limit, sort, category, startDate, endDate }),
  });
};
