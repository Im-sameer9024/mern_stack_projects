import mongoose from 'mongoose';
import Course from '../models/course.model.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError';
import crypto from 'crypto';
import razorpay from '../config/razorpay.config';
import User from '../models/user.model.js';

const capturePayment = async (req, res) => {
  try {
    const userId = req.user._id;
    const { courseId } = req.body;

    if (!courseId) {
      return ApiResponse(res, 400, null, 'Course Id is required');
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return ApiResponse(res, 404, null, 'Course not found');
    }

    // user already pay for this course / already enrolled

    if (course.studentsEnrolled.some((id) => id.toString() === userId.toString())) {
      return ApiResponse(res, 400, null, 'You already Enrolled in this course');
    }

    // order create

    const amount = course.price * 100;
    const currency = process.env.CURRENCY || 'INR';

    const options = {
      amount: amount,
      currency: currency,
      receipt: `receipt_${Date.now()}`,
      notes: {
        courseId,
        userId,
      },
    };

    // initiate the payment from razorpay

    const paymentResponse = await razorpay.orders.create(options);
    console.log('payment response is here', paymentResponse);
    return ApiResponse(
      res,
      200,
      {
        courseName: course.title,
        courseDescription: course.description,
        courseThumbnail: course.thumbnail,
        orderId: paymentResponse.id,
        currency: paymentResponse.currency,
        amount: paymentResponse.amount,
      },
      'Payment initiated successfully'
    );
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

const verifyPaymentSignature = async (req, res) => {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || '123456';

    if (!webhookSecret) {
      return ApiResponse(res, 404, null, 'Webhook secret not configured');
    }

    const signature = req.headers['x-razorpay-signature'];

    const shasum = crypto.createHmac('sha256', webhookSecret);

    shasum.update(JSON.stringify(req.body));

    const digest = shasum.digest('hex');

    if (signature === digest) {
      console.log('payment is Authorized.');

      const { courseId, userId } = req.body.payload?.payment?.entity?.notes;

      try {
        const enrolledCourse = await Course.findOneAndUpdate(
          { _id: courseId },
          {
            $addToSet: {
              studentsEnrolled: userId,
            },
          },
          {
            new: true,
          }
        );

        if (!enrolledCourse) {
          return ApiResponse(res, 400, null, 'Course not found');
        }

        // update user and update courses

        await User.findOneAndUpdate(
          { _id: userId },
          {
            $addToSet: {
              courses: courseId,
            },
          },
          {
            new: true,
          }
        );

        // send mail to the user that you have enrolled in the course

        return ApiResponse(res, 200, null, 'Payment is verified and course is enrolled');
      } catch (error) {
        return ApiResponse(res, 400, null, error.message);
      }
    } else {
      return ApiResponse(res, 400, null, 'Invalid Request');
    }
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

export { capturePayment, verifyPaymentSignature };
