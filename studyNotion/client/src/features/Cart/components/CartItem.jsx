import { Button } from '@/components/ui/button';
import { FaStar } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import { useRemoveFromCart } from '../hooks/useCart';
import CourseDetailSkeleton from '@/features/Course/components/Coursedetailskeleton';

const CartItem = ({ course }) => {
  const {
    mutate: removeItemFromCart,
    isPending: isRemoving,
  } = useRemoveFromCart();

  if (!course) return null;

  // 🔄 Loading skeleton while removing
  if (isRemoving) return <CourseDetailSkeleton />;

  return (
    <div className="flex gap-5 py-6 border-b border-richBlack-700">
      {/* Thumbnail */}
      <img
        src={course.thumbnail}
        alt={course.title}
        className="w-40 h-28 rounded-md object-cover"
      />

      {/* Details */}
      <div className="flex flex-col flex-1 gap-2">
        <h3 className="text-lg font-semibold max-w-lg">
          {course.title}
        </h3>

        <p className="text-sm text-richBlack-300">
          {course.instructor?.firstName || 'Instructor'}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-yellow-400">
            {course.rating || '4.5'}
          </span>

          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} size={14} />
            ))}
          </div>

          <span className="text-richBlack-400">(Reviews)</span>
        </div>

        <p className="text-xs text-richBlack-400">
          Beginner • Full Course
        </p>
      </div>

      {/* Right Section */}
      <div className="flex flex-col items-end justify-between">
        <Button
          onClick={() =>
            removeItemFromCart({ courseId: course._id })
          }
          disabled={isRemoving}
          className="flex items-center gap-1 text-red-400 hover:text-red-500"
        >
          <MdDeleteOutline size={20} />
          Remove
        </Button>

        <p className="text-xl text-yellow-400 font-semibold">
          Rs. {course.price?.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default CartItem;