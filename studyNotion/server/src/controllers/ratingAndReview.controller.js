import Course from '../models/course.model.js';
import RatingAndReview from '../models/ratingAndReview.model.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import mongoose from 'mongoose';

const CreateRating = async (req, res) => {
  try {
    const userId = req.user._id;

    const { rating, review, courseId } = req.validatedData;

    const course = await Course.findOne({
      _id: courseId,
      studentsEnrolled: userId,
    });

    if (!course) {
      return ApiResponse(res, 404, null, 'Student is not enrolled in the course');
    }

    const alreadyReview = await RatingAndReview.findOne({
      user: userId,
      course: courseId,
    });

    if (alreadyReview) {
      return ApiResponse(res, 400, null, 'Student already reviewed the course');
    }

    const newRating = await RatingAndReview.create({
      user: userId,
      course: courseId,
      rating: rating,
      review: review,
    });

    // update course details

    await Course.findByIdAndUpdate(
      courseId,
      {
        $addToSet: {
          ratingAndReviews: newRating._id,
        },
      },
      { new: true }
    );

    return ApiResponse(res, 200, newRating, 'Rating and review created successfully');
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

const GetAverageRating = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    const result = await RatingAndReview.aggregate([
      {
        $match: {
          course: new mongoose.Types.ObjectId(courseId),
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: '$rating' },
        },
      },
    ]);

    console.log('result', result);

    return ApiResponse(res, 200, result, 'Average rating fetched successfully');
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

const GetAllRating = async (req, res) => {
  try {
    const allReviews = await RatingAndReview.find()
      .sort({ rating: -1 })
      .populate({
        path: 'user',
        select: 'firstName lastName email image',
      })
      .populate({
        path: 'course',
        select: 'title',
      });

    return ApiResponse(res, 200, allReviews, 'All reviews fetched successfully');
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

export { CreateRating, GetAverageRating, GetAllRating };
