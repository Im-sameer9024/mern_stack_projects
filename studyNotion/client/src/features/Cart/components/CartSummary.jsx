import CTAButton from '@/features/Home/components/CTAButton';

const CartSummary = ({ total }) => {
  return (
    <div className="bg-richBlack-800 p-6 rounded-lg h-fit w-full lg:max-w-xs flex flex-col gap-2">
      <p className="text-sm text-richBlack-300">Total:</p>

      <p className="text-2xl font-bold text-yellow-400">Rs. {total.toLocaleString()}</p>

      <p className="text-sm text-richBlack-400 line-through">Rs. 3,500</p>

      <CTAButton
        active={true}
        className="w-full mt-4 bg-yellow-400 text-black py-2 rounded-md font-semibold hover:bg-yellow-300"
      >
        Buy Now
      </CTAButton>
    </div>
  );
};

export default CartSummary;
