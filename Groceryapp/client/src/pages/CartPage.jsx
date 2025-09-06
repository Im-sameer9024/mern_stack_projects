import React, { useState } from "react";
import { 
  useGetCartDetailsQuery, 
  useUpdateCartMutation,
  useRemoveItemFromCartMutation,
  useLazyClearCartQuery
} from "../redux/apiSlices/cartApiSlice";
import { Skeleton } from "@/components/ui/skeleton";
import { FiTrash2, FiShoppingBag, FiChevronDown } from "react-icons/fi";
import toast from "react-hot-toast";
import { MdClose } from "react-icons/md";

const CartPage = () => {
  const {
    data: cartDetails,
    isLoading,
    error,
    isError,
    refetch
  } = useGetCartDetailsQuery();

  const [updateCart] = useUpdateCartMutation();
  const [RemoveItemFromCart] = useRemoveItemFromCartMutation();
  const [clearCart] = useLazyClearCartQuery();

  const [updatingItems, setUpdatingItems] = useState({});

  const handleQuantityChange = async (itemId, quantity) => {
    if (quantity < 1) return;
    
    setUpdatingItems(prev => ({ ...prev, [itemId]: true }));
    
    try {
      await updateCart({ itemId, quantity: quantity }).unwrap();
      toast.success("Cart updated successfully");
      refetch();
    } catch (error) {
      console.error("Failed to update cart:", error);
      toast.error(error?.data?.message || "Failed to update cart");
    } finally {
      setUpdatingItems(prev => ({ ...prev, [itemId]: false }));
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      const response = await RemoveItemFromCart({ itemId }).unwrap();
      console.log('response is here', response);
      toast.success("Item removed from cart");
      refetch();
    } catch (error) {
      console.error("Failed to remove item:", error);
      toast.error(error?.data?.message || "Failed to remove item");
    }
  };

  const handleClearCart = async () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      try {
        await clearCart().unwrap();
        toast.success("Cart cleared successfully");
        refetch();
      } catch (error) {
        console.error("Failed to clear cart:", error);
        toast.error(error?.data?.message || "Failed to clear cart");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-4 md:p-6">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="border rounded-lg p-4 mb-4 flex gap-4">
                <Skeleton className="w-24 h-24 rounded-md" />
                <div className="flex-1">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-5 w-1/4 mb-3" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-10 w-32" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="md:w-1/3">
            <div className="border rounded-lg p-6">
              <Skeleton className="h-7 w-40 mb-4" />
              <Skeleton className="h-5 w-full mb-2" />
              <Skeleton className="h-5 w-full mb-2" />
              <Skeleton className="h-5 w-full mb-2" />
              <Skeleton className="h-12 w-full mt-4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-6xl mx-auto p-6 text-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-red-800 mb-2">Error Loading Cart</h2>
          <p className="text-red-600">
            {error?.data?.message || error?.message || "Unable to load your cart items"}
          </p>
          <button 
            onClick={refetch}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const cartData = cartDetails?.result?.data;
  const items = cartData?.items || [];

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Cart</h1>
        {items.length > 0 && (
          <button
            onClick={handleClearCart}
            className="flex items-center gap-2 text-red-600 hover:text-red-800"
          >
            <FiTrash2 size={18} />
            Clear Cart
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <FiShoppingBag size={48} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Start shopping to add items to your cart</p>
          <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700">
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left side - Cart items */}
          <div className="md:w-2/3">
            <div className="bg-white border rounded-lg overflow-hidden">
              {items.map((item) => (
                <div key={item._id} className="border-b last:border-b-0 p-4 flex gap-4">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.productName}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-semibold text-lg">{item.product.productName}</h3>
                      <button
                        onClick={() => handleRemoveItem(item._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <MdClose/>
                      </button>
                    </div>
                    <p className="text-gray-600 mb-3">${item.price}</p>
                    
                    <div className="flex justify-between items-center">
                      <div className="relative">
                        <select
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value))}
                          disabled={updatingItems[item._id]}
                          className="appearance-none border rounded-md py-2 px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {[1, 2, 3, 4].map((num) => (
                            <option key={num} value={num}>
                              {num}
                            </option>
                          ))}
                        </select>
                        <FiChevronDown className="absolute right-2 top-3 text-gray-400 pointer-events-none" />
                      </div>
                      <p className="font-semibold">${item.total}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Order summary */}
          <div className="md:w-1/3">
            <div className="bg-white border rounded-lg p-6 sticky top-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal ({cartData.totalItems} items)</span>
                  <span>${cartData.subTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>{cartData.subTotal > 50 ? "Free" : "$5.00"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${(cartData.subTotal * 0.08).toFixed(2)}</span>
                </div>
              </div>
              
              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>
                    $
                    {(
                      cartData.subTotal + 
                      (cartData.subTotal > 50 ? 0 : 5) + 
                      (cartData.subTotal * 0.08)
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
              
              <button className="w-full bg-green-600 text-white py-3 rounded-md font-medium hover:bg-green-700">
                Proceed to Checkout
              </button>
              
              <p className="text-sm text-gray-500 mt-4 text-center">
                Free delivery on orders over $50
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
 
export default CartPage;