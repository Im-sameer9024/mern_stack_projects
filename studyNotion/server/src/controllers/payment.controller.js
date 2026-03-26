// import mongoose from 'mongoose';
// import Course from '../models/course.model.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import crypto from 'crypto';
import razorpay from '../config/razorpay.config.js';
import User from '../models/user.model.js';
import Course from '../models/course.model.js';
import Payment from '../models/payment.model.js';
import { mailSender } from '../utils/mailSender.js';
import { courseEnrollmentEmail } from '../mail/templates/courseEnrollmentEmail.js';
import CourseProgress from '../models/courseProgress.model.js';

// const capturePayment = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const { courseId } = req.body;

//     if (!courseId) {
//       return ApiResponse(res, 400, null, 'Course Id is required');
//     }

//     const course = await Course.findById(courseId);

//     if (!course) {
//       return ApiResponse(res, 404, null, 'Course not found');
//     }

//     // user already pay for this course / already enrolled

//     if (course.studentsEnrolled.some((id) => id.toString() === userId.toString())) {
//       return ApiResponse(res, 400, null, 'You already Enrolled in this course');
//     }

//     // order create

//     const amount = course.price * 100;
//     const currency = process.env.CURRENCY || 'INR';

//     const options = {
//       amount: amount,
//       currency: currency,
//       receipt: `receipt_${Date.now()}`,
//       notes: {
//         courseId,
//         userId,
//       },
//     };

//     // initiate the payment from razorpay

//     const paymentResponse = await razorpay.orders.create(options);
//     console.log('payment response is here', paymentResponse);
//     return ApiResponse(
//       res,
//       200,
//       {
//         courseName: course.title,
//         courseDescription: course.description,
//         courseThumbnail: course.thumbnail,
//         orderId: paymentResponse.id,
//         currency: paymentResponse.currency,
//         amount: paymentResponse.amount,
//       },
//       'Payment initiated successfully'
//     );
//   } catch (error) {
//     return ApiError(res, 500, null, error.message, error);
//   }
// };

// const verifyPaymentSignature = async (req, res) => {
//   try {
//     const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || '123456';

//     if (!webhookSecret) {
//       return ApiResponse(res, 404, null, 'Webhook secret not configured');
//     }

//     const signature = req.headers['x-razorpay-signature'];

//     const shasum = crypto.createHmac('sha256', webhookSecret);

//     shasum.update(JSON.stringify(req.body));

//     const digest = shasum.digest('hex');

//     if (signature === digest) {
//       console.log('payment is Authorized.');

//       const { courseId, userId } = req.body.payload?.payment?.entity?.notes;

//       try {
//         const enrolledCourse = await Course.findOneAndUpdate(
//           { _id: courseId },
//           {
//             $addToSet: {
//               studentsEnrolled: userId,
//             },
//           },
//           {
//             new: true,
//           }
//         );

//         if (!enrolledCourse) {
//           return ApiResponse(res, 400, null, 'Course not found');
//         }

//         // update user and update courses

//         await User.findOneAndUpdate(
//           { _id: userId },
//           {
//             $addToSet: {
//               courses: courseId,
//             },
//           },
//           {
//             new: true,
//           }
//         );

//         // send mail to the user that you have enrolled in the course

//         return ApiResponse(res, 200, null, 'Payment is verified and course is enrolled');
//       } catch (error) {
//         return ApiResponse(res, 400, null, error.message);
//       }
//     } else {
//       return ApiResponse(res, 400, null, 'Invalid Request');
//     }
//   } catch (error) {
//     return ApiError(res, 500, null, error.message, error);
//   }
// };

//---------------------- order create ------------------------------
const capturePayment = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).populate('cart');

    if (!user || user.cart.length === 0) {
      return ApiResponse(res, 400, null, 'Cart is empty');
    }

    const courseIds = user.cart.map((course) => course._id.toString());

    console.log('courseIds', courseIds);

    const validCourses = courseIds.filter((id) => !user.courses.some((c) => c.toString() === id));

    if (validCourses.length === 0) {
      return ApiResponse(res, 400, null, 'Student already enrolled');
    }

    let totalAmount = 0;

    user.cart.forEach((course) => {
      if (validCourses.some((id) => id.toString() === course._id.toString())) {
        totalAmount += course.price;
      }
    });

    console.log('actual amount', totalAmount);

    const options = {
      amount: totalAmount * 100,
      currency: process.env.CURRENCY || 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: {
        userId: userId.toString(),
        courses: validCourses.join(','),
        name: `${user.firstName} ${user.lastName}`,
        email: user?.email,
      },
    };

    //------------------- order create ----------------

    try {
      const paymentResponse = await razorpay.orders.create(options);

      return ApiResponse(res, 200, paymentResponse, 'Payment initiated successfully');
    } catch (error) {
      return ApiResponse(res, 400, null, error.message);
    }
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

const verifyPayment = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const userId = req.user._id;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return ApiResponse(res, 400, null, 'Payment Failed');
    }

    const paymentDetails = await razorpay.payments.fetch(razorpay_payment_id);

    if (paymentDetails.status !== 'captured') {
      throw new Error('Payment not captured');
    }

    const amount = paymentDetails.amount / 100;
    const currency = paymentDetails.currency;

    // 🔐 Signature verify
    const body = razorpay_order_id + '|' + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return ApiResponse(res, 400, null, 'Invalid signature');
    }

    // 🔥 Idempotency check
    const existingPayment = await Payment.findOne({
      paymentId: razorpay_payment_id,
    }).session(session);

    if (existingPayment) {
      await session.commitTransaction();
      session.endSession();
      return ApiResponse(res, 200, null, 'Already processed');
    }

    const user = await User.findById(userId).populate('cart').session(session);

    if (!user || user.cart.length === 0) {
      throw new Error('Cart is empty');
    }

    const courseIds = user.cart.map((c) => c._id.toString());

    // 🔥 Amount validation
    const expectedAmount = user.cart.reduce((acc, c) => acc + c.price, 0);
    if (amount !== expectedAmount) {
      throw new Error('Amount mismatch');
    }

    // 🔥 Remove duplicates
    const newCourses = courseIds.filter((id) => !user.courses.some((c) => c.toString() === id));

    // ✅ Update courses (bulk)
    await Course.updateMany(
      { _id: { $in: newCourses } },
      { $addToSet: { studentsEnrolled: userId } },
      { session }
    );

    // ✅ Create course progress (bulk)
    const progressDocs = newCourses.map((courseId) => ({
      courseId,
      userId,
      completedVideos: [],
    }));

    const createdProgress = await CourseProgress.insertMany(progressDocs, { session });

    // ✅ Add courses
    user.courses.push(...newCourses);
    user.courseProgress.push(...createdProgress.map((p) => p._id));
    user.cart = [];
    await user.save({ session });

    // ✅ Save payment record
    await Payment.create(
      [
        {
          userId,
          courses: newCourses,
          paymentId: razorpay_payment_id,
          orderId: razorpay_order_id,
          amount,
          currency,
          status: 'success',
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    const courseNames = user.cart.map((c) => c.title);
    const actualNames = courseNames.join(',');

    await mailSender(
      user.email,
      `Successfully Enrolled into ${actualNames} courses`,
      courseEnrollmentEmail(actualNames, `${user.firstName} ${user.lastName}`)
    );

    return ApiResponse(res, 200, null, 'Payment verified & enrolled');
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    return ApiError(res, 500, null, error.message, error);
  }
};

// Send Payment Success Email
exports.sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body;

  const userId = req.user.id;

  if (!orderId || !paymentId || !amount || !userId) {
    return res.status(400).json({ success: false, message: 'Please provide all the details' });
  }

  try {
    const enrolledStudent = await User.findById(userId);

    await mailSender(
      enrolledStudent.email,
      `Payment Received`,
      paymentSuccessEmail(
        `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
        amount / 100,
        orderId,
        paymentId
      )
    );
  } catch (error) {
    console.log('error in sending mail', error);
    return res.status(400).json({ success: false, message: 'Could not send email' });
  }
};

export { capturePayment, verifyPayment ,sendPaymentSuccessEmail};
