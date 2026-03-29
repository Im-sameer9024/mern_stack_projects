import CTAButton from '@/features/Home/components/CTAButton';
import { useDispatch } from 'react-redux';
import { useRazorpay } from 'react-razorpay';
import { toast } from 'sonner';
import rzpLogo from '@/assets/Logo/rzp_logo.png';
import { setIsPaymentLoading } from '../cartSlice';

import { useCreateOrder, useVerifyPayment, useSendPaymentSuccessEmail } from '../hooks/usePayment';

const CartSummary = ({ total, cartItems }) => {
  const dispatch = useDispatch();
  const { Razorpay, isLoading } = useRazorpay();

  const { mutateAsync: CreateOrder } = useCreateOrder();
  const { mutateAsync: VerifyPayment } = useVerifyPayment();
  const { mutateAsync: SendPaymentSuccessEmail } = useSendPaymentSuccessEmail();

  const handleBuyNow = async () => {
    if (!cartItems || cartItems.length === 0) {
      toast.error('Cart is empty');
      return;
    }

    dispatch(setIsPaymentLoading(true));

    try {
      if (isLoading || !Razorpay) {
        toast.error('Razorpay not loaded');
        return;
      }

      // ✅ Extract course IDs
      const courseIds = cartItems.map((c) => c._id);

      // ✅ Create order
      const orderRes = await CreateOrder({ courses: courseIds });
      const order = orderRes.data;

      // ✅ Razorpay config
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: 'StudyNotion',
        description: 'Course Purchase',
        image: rzpLogo,
        prefill: {
          name: order.notes?.name,
          email: order.notes?.email,
        },

        handler: async function (response) {
          try {
            await VerifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            await SendPaymentSuccessEmail({
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              amount: order.amount,
            });

            toast.success('Payment Successful 🎉');
          } catch (err) {
            console.error(err);
            toast.error('Verification failed');
          }
        },
      };

      const razor = new window.Razorpay(options);

      razor.open();

      razor.on('payment.failed', function () {
        toast.error('Payment Failed ❌');
      });
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    } finally {
      dispatch(setIsPaymentLoading(false));
    }
  };

  return (
    <div className="bg-richBlack-800 p-6 rounded-lg h-fit w-full lg:max-w-xs flex flex-col gap-2">
      <p className="text-sm text-richBlack-300">Total:</p>

      <p className="text-2xl font-bold text-yellow-400">Rs. {total.toLocaleString()}</p>

      <CTAButton
        active
        onClick={handleBuyNow}
        className="w-full mt-4 bg-yellow-400 text-black py-2 rounded-md font-semibold hover:bg-yellow-300"
      >
        Buy Now
      </CTAButton>
    </div>
  );
};

export default CartSummary;
