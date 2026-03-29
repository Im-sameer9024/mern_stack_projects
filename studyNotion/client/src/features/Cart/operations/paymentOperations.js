import { apiConnector } from '@/services/apiConnector';
import { cartApiUrls } from '@/services/apiEndpoints';
import { toast } from 'sonner';

const { CREATE_ORDER, ORDER_VERIFY, SEND_PAYMENT_SUCCESS_EMAIL } = cartApiUrls;

export function loadScript(src) {
  return new Promise((resolve) => {
    // ✅ prevent duplicate load
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');

    script.src = src;
    script.async = true;

    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export const paymentApiOperations = {
  CreateOrder: async (data) => {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
      toast.error('Razorpay script failed to load');
      return;
    }

    const response = await apiConnector({
      method: 'POST',
      url: CREATE_ORDER,
      bodyData: data,
    });
    return response.data;
  },

  VerifyPayment: async (data) => {
    const response = await apiConnector({
      method: 'POST',
      url: ORDER_VERIFY,
      bodyData: data,
    });
    return response.data;
  },

  SendPaymentSuccessEmail: async (data) => {
    const response = await apiConnector({
      method: 'POST',
      url: SEND_PAYMENT_SUCCESS_EMAIL,
      bodyData: data,
    });
    return response.data;
  },
};
