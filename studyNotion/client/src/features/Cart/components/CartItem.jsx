import { Button } from '@/components/ui/button';
import { FaStar } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';

const CartItem = ({ course }) => {
  return (
    <div className="flex gap-5 py-6 border-b border-richBlack-700">
      <img src={course.image} alt="course" className="w-40 h-28 rounded-md object-cover" />

      <div className="flex flex-col flex-1 gap-2">
        <h3 className="text-lg font-semibold max-w-lg">{course.title}</h3>

        <p className="text-sm text-richBlack-300">{course.instructor}</p>

        <div className="flex items-center gap-2 text-sm">
          <span className="text-yellow-400">{course.rating}</span>

          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} size={14} />
            ))}
          </div>

          <span className="text-richBlack-400">(Review Count)</span>
        </div>

        <p className="text-xs text-richBlack-400">Total Courses • Lesson • Beginner</p>
      </div>

      <div className="flex flex-col items-end justify-between">
        <Button className="flex items-center gap-1 text-red-400 hover:text-red-500">
          <MdDeleteOutline size={20} />
          Remove
        </Button>

        <p className="text-xl text-yellow-400 font-semibold">Rs. {course.price.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default CartItem;
