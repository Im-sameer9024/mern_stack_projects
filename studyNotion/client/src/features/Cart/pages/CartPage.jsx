import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';
import { useGetCartDetails } from '../hooks/useCart';

const CartPage = () => {
  const { data: cartDetails, isPending: isCartPending, error } = useGetCartDetails();

  // ✅ Extract data safely
  const cartItems = cartDetails?.data?.cartItems ?? [];
  const total = cartDetails?.data?.totalPrice ?? 0;

  if (isCartPending) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading cart...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
        Failed to load cart
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white mt-14">
      <div className="max-w-6xl mx-auto py-16 px-4 space-y-6">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-semibold">My Cart</h1>

        {/* Count */}

        {cartItems.length > 0 && (
          <p className="text-richBlack-400 text-sm md:text-base">
            {cartItems.length > 0} Courses in Cart
          </p>
        )}

        {/* Layout */}
        <div className="flex flex-col lg:flex-row gap-10 mt-6">
          {/* Course List */}
          <div className="flex-1 space-y-4">
            {cartItems.length > 0 ? (
              cartItems.map((course) => <CartItem key={course._id} course={course} />)
            ) : (
              <p className="text-richBlack-400 text-center">Your cart is empty</p>
            )}
          </div>

          {/* Summary */}
          {cartItems.length > 0 && <CartSummary total={total} />}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
