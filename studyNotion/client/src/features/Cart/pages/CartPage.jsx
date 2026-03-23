import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';
const cartCourses = [
  {
    id: 1,
    title: 'The Complete Python Bootcamp From Zero to Hero in Python',
    instructor: 'Name',
    rating: 4.5,
    price: 1700,
    image: '/Images/login.webp',
  },
  {
    id: 2,
    title: 'The Complete Python Bootcamp From Zero to Hero in Python',
    instructor: 'Name',
    rating: 4.5,
    price: 2100,
    image: '/Images/login.webp',
  },
  {
    id: 3,
    title: 'The Complete Python Bootcamp From Zero to Hero in Python',
    instructor: 'Name',
    rating: 4.5,
    price: 2000,
    image: '/Images/login.webp',
  },
];

const CartPage = () => {
  const total = cartCourses.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="min-h-screen text-white mt-14">
      <div className="max-w-6xl mx-auto py-16 px-4 space-y-6">
        <h1 className="text-2xl md:text-3xl font-semibold">My Cart</h1>

        <p className="text-richBlack-400 text-sm md:text-base">
          {cartCourses.length} Courses in Cart
        </p>

        <div className="flex flex-col lg:flex-row gap-10 mt-6">
          {/* Course List */}
          <div className="flex-1">
            {cartCourses.map((course) => (
              <CartItem key={course.id} course={course} />
            ))}
          </div>

          {/* Summary */}
          <CartSummary total={total} />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
