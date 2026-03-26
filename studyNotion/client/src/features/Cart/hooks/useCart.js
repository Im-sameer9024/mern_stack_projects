import { Mutation, useMutation, useQuery } from '@tanstack/react-query';
import { CartApiOperations } from '../operations/cartApiOperations';
import { toast } from 'sonner';
import { getErrorMessage } from '@/utils/helpers';
import queryClient from '@/utils/reactQuery';
import { useSelector } from 'react-redux';

export const useAddToCart = () => {
  return useMutation({
    mutationFn: CartApiOperations.AddToCart,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['cart'],
      });

      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};

export const useRemoveFromCart = () => {
  return useMutation({
    mutationFn: CartApiOperations.RemoveCartItem,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['cart'],
      });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};

export const useGetCartDetails = () => {
  const { token } = useSelector((state) => state.auth);
  return useQuery({
    queryKey: ['cart'],
    queryFn: CartApiOperations.GetCartDetails,
    enabled: !!token,
  });
};
