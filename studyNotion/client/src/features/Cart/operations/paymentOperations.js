import { apiConnector } from '@/services/apiConnector';
import { cartApiUrls } from '@/services/apiEndpoints';
import { toast } from 'sonner';
import rzpLogo from '@/assets/Logo/rzpLogo.png'

const { CREATE_ORDER, ORDER_VERIFY } = cartApiUrls;

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement('script');

    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export const paymentApiOperations = {
  BuyCourse: async () => {
    // load script 
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
    if(!res){
        toast.error("Razorpay script failed to load")
        return;
    }
    const orderResponse = await apiConnector({
      method: 'GET',
      url: CREATE_ORDER,
    });
    
    if(!orderResponse.data?.success){
        toast.error(orderResponse.data?.message)
    }

    // Opening the Razorypay SDK 

    const options = {
        key:import.meta.env.VITE_RAZORPAY_KEY_ID,
        currency: orderResponse.data?.data?.currency,
        amount: orderResponse.data?.data?.amount,
        order_id: orderResponse.data?.data?.id,
        name:"StudyNotion",
        description:"Thank you for Purchasing the course.",
        image:rzpLogo,
        prefill:{
            name:orderResponse.data?.data?.notes?.name,
            email:orderResponse.data?.data?.notes?.email,
        },
        
    }

  },
};
