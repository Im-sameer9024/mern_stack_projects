import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CTAButton from '@/features/Home/components/CTAButton';
import { useAddToCart } from '@/features/Cart/hooks/useCart';

const CoursePurchaseCard = ({ course }) => {
  const { mutate: addToCart, isPending: isAddPending } = useAddToCart();

  //  Add to Cart Handler
  const handleAddToCart = () => {
    if (!course?._id) return;

    addToCart({courseId:course?._id});
  };



  //  Buy Now Handler
  const handleBuyNow = () => {
    if (!course?._id) return;

    // You can redirect to checkout OR call checkout API
    console.log('Buy Now:', course._id);
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
          disabled={isAddPending}
          className="w-full bg-slate-200 text-black hover:bg-slate-300"
        >
          Buy Now
        </Button>

        
      </CardContent>
    </Card>
  );
};

export default CoursePurchaseCard;
