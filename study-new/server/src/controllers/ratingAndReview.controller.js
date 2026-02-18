import Course from '../models/course.model';
import RatingAndReview from '../models/ratingAndReview.model';
import ApiError from '../utils/ApiError';
import ApiResponse from '../utils/ApiResponse';

const CreateRating = async (req, res) => {
  try {
    const userId = req.user._id;

    const { rating, review, courseId } = req.body;

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
    return ApiError(res, 500, error.message, error);
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
  } catch (error) {}
};

export { CreateRating };
