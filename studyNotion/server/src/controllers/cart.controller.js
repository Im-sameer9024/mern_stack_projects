import User from '../models/user.model.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';

const AddToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { courseId } = req.body;

    if (!userId) {
      return ApiResponse(res, 401, null, 'User UnAuthorized');
    }

    if (!courseId) {
      return ApiResponse(res, 400, null, 'Please provide course id');
    }

    const user = await User.findById(userId);

    if (!user) {
      return ApiResponse(res, 404, null, 'User not found');
    }

    if (user.cart.some((c) => c.toString() === courseId)) {
      return ApiResponse(res, 400, null, 'Course already in cart');
    }

    user.cart.push(courseId);
    await user.save();

    return ApiResponse(res, 200, null, 'Course added to cart');
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

const GetCart = async (req, res) => {
  try {
    const userId = req.user?._id;

    const user = await User.findById(userId).populate('cart');

    let totalPrice = 0;

    const cartItems =
      user.cart.map((course) => {
        totalPrice += course.price;
        return course;
      }) ?? [];

    return ApiResponse(res, 200, { cartItems, totalPrice }, 'Cart fetched successfully');
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

const RemoveFromCart = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user._id;

    if (!userId) {
      return ApiResponse(res, 401, null, 'User UnAuthorized');
    }

    if (!courseId) {
      return ApiResponse(res, 400, null, 'Please provide course id');
    }

    const user = await User.findById(userId);

    if (!user) {
      return ApiResponse(res, 404, null, 'User not found');
    }

    if (!user.cart.includes(courseId)) {
      return ApiResponse(res, 400, null, 'Course not in cart');
    }

    user.cart = user.cart.filter((course) => course.toString() !== courseId.toString());
    await user.save();

    return ApiResponse(res, 200, null, 'Course removed from cart');
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

export { AddToCart, GetCart, RemoveFromCart };
