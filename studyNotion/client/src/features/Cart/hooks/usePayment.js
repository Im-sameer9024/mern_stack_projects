import { useMutation } from '@tanstack/react-query';
import { paymentApiOperations } from '../operations/paymentOperations';
import { toast } from 'sonner';
import { getErrorMessage } from '@/utils/helpers';

export const useCreateOrder = () => {

  return useMutation({
    mutationFn: paymentApiOperations.CreateOrder,
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};

export const useVerifyPayment = () => {
  return useMutation({
    mutationFn: paymentApiOperations.VerifyPayment,
    onSuccess: ( data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};

export const useSendPaymentSuccessEmail = () => {
  return useMutation({
    mutationFn: paymentApiOperations.SendPaymentSuccessEmail,
    onSuccess: ( data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};
