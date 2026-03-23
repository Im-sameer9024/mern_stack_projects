import { useQuery } from '@tanstack/react-query';
import { useCategoryOperations } from '../operations/useCategoryOperations';

export const useGetAllCategory = () => {
  return useQuery({
    queryKey: ['category'],
    queryFn: useCategoryOperations.GetAllCategory,
  });
};
