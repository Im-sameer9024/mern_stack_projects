import { useQuery } from '@tanstack/react-query';
import { useCategoryOperations } from '../operations/useCategoryOperations';

export const useGetAllCategory = () => {
  return useQuery({
    queryKey: ['category'],
    queryFn: useCategoryOperations.GetAllCategory,
  });
};

export const useGetCategoryDetails = (categoryId) => {
  return useQuery({
    queryKey: ['category', categoryId],
    queryFn: () => useCategoryOperations.GetCategoryDetails(categoryId),
  });
};
