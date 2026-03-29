import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CTAButton from '@/features/Home/components/CTAButton';
import { useAddToCart } from '@/features/Cart/hooks/useCart';
import {
  useCreateOrder,
  useSendPaymentSuccessEmail,
  useVerifyPayment,
} from '@/features/Cart/hooks/usePayment';
import { useDispatch, useSelector } from 'react-redux';
import rzpLogo from '@/assets/Logo/rzp_logo.png';
import { useRazorpay } from 'react-razorpay';
import { toast } from 'sonner';
import { setIsPaymentLoading } from '@/features/Cart/cartSlice';
// import { useNavigate } from 'react-router-dom';

const CoursePurchaseCard = ({ course }) => {
  const { mutate: addToCart, isPending: isAddPending } = useAddToCart();

  // const navigate = useNavigate();

  //---------------------- payment related api hooks ---------------------
  const { isPaymentLoading } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { Razorpay, isLoading } = useRazorpay();

  const { mutateAsync: CreateOrder } = useCreateOrder();
  const { mutateAsync: VerifyPayment } = useVerifyPayment();
  const { mutateAsync: SendPaymentSuccessEmail } = useSendPaymentSuccessEmail();

  //  Add to Cart Handler
  const handleAddToCart = () => {
    if (!course?._id) return;

    addToCart({ courseId: course?._id });
  };

  //  Buy Now Handler
  const handleBuyNow = async () => {
    if (!course?._id) return;
    dispatch(setIsPaymentLoading(true));

    try {
      if (isLoading || !Razorpay) {
        toast.error('Razorpay script failed to load');
        return;
      }

      // Opening the Razorpay SDK

      //---------- Order create ---------------
      const orderRes = await CreateOrder({ courses: [course._id] });

      const order = orderRes.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        currency: order.currency,
        amount: order.amount,
        order_id: order.id,
        name: 'StudyNotion',
        description: 'Course Purchase',
        image: rzpLogo,
        prefill: {
          name: order.notes?.name,
          email: order.notes?.email,
        },

        //------- handle success -------------
        handler: async function (response) {
          try {
            await VerifyPayment(response);

            await SendPaymentSuccessEmail({
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              amount: order.amount,
            });
            toast.success('Payment Successful 🎉');
          } catch (error) {
            toast.error('Verification failed');
            console.log('error in payment', error);
          }
        },
      };

      const razor = new Razorpay(options);

      razor.open();
      razor.on('payment.failed', function () {
        toast.error('Oops! Payment failed');
      });
    } catch (error) {
      console.log('Payment api error ...........', error);
      toast.error('Payment failed');
    } finally {
      dispatch(setIsPaymentLoading(false));

      toast.dismiss();
    }
  };

  return (
    <Card className="bg-richBlack-800 border-richBlack-600">
      {/* Thumbnail */}
      <div className="h-44 bg-richBlack-700">
        <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
      </div>

      {/* Body */}
      <CardContent className="space-y-4 p-5 flex flex-col">
        {/* Price */}
        <p className="text-3xl font-bold text-white">₹{course.price}</p>

        {/* Add to Cart */}
        <CTAButton
          active
          onClick={handleAddToCart}
          disabled={isAddPending}
          className="w-full bg-yellow-400 text-black"
        >
          {isAddPending ? 'Adding...' : 'Add to Cart'}
        </CTAButton>

        {/* Buy Now */}
        <Button
          onClick={handleBuyNow}
          disabled={isPaymentLoading}
          className="w-full bg-slate-200 text-black hover:bg-slate-300"
        >
          {isPaymentLoading ? 'Loading...' : 'Buy Now'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CoursePurchaseCard;
