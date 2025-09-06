import RatingAndReview from "../models/RatingAndReviewModel.js";
import Course from "../models/CourseModel.js";
import mongoose from "mongoose";

//-------------crateRating-----------------
const createRatingAndReview = async (req, res) => {
  try {
    //------ fetch data------------
    const { rating, review, courseId } = req.body;
    const userId = req.user.id;

    // check if user is enrolled or not

    const courseDetails = await Course.findOne({
      _id: courseId,
      studentsEnrolled: mongoose.Types.ObjectId(userId),
    });

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "You are not enrolled in this course",
      });
    }

    // check if user is already reviewed or not
    const alreadyReviewed = await RatingAndReview.findOne({ user: userId, course: courseId });

    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this course",
      });
    }

    // create rating and review

    const ratingAndReview = await RatingAndReview.create({
      user: userId,
      rating,
      review,
      course: courseId,
    });

    // update the course with this rating/review

    await Course.findOneAndUpdate(
      { id: courseId },
      {
        $push: {
          ratingAndReview: ratingAndReview._id,
        },
      },
      { new: true, runValidators: true }, //runValidators:true is used to adhere the validation rules of schema which is defined in RatingAndReviewSchema like required, min and max value etc .
    );

    // return response

    return res.status(200).json({
      success: true,
      message: "Rating and review added successfully",
    });
  } catch (error) {
    console.log("error occur in addRatingAndReview", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//-------------getAverageRating-----------------

const getAverageRating = async (req, res) => {
  try {
    // get courseId
    const courseId = req.body.courseId;

    // get average rating

    const averageRating = await RatingAndReview.aggregate([
      {
        $match: {
          course: mongoose.Types.ObjectId(courseId),
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    if (averageRating.length > 0) {
      return res.status(200).json({
        success: true,
        message: "Average rating fetched successfully",
        averageRating: averageRating[0].averageRating,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Average rating fetched successfully",
      averageRating: 0,
    });
  } catch (error) {
    console.log("error occur in getAverageRating", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//get all rating review by course
const getAllRating = async (req, res) => {
  try {
    const allRatingAndReviews = await RatingAndReview.find({
      rating: true,
      review: true,
    })
      .sort({ rating: -1 })
      .populate({
        path: "user",
        select: "firstName lastName email image",
      })
      .populate({
        path: "course",
        select: "courseName",
      })
      .exec();

    return res.status(200).json({
      success: true,
      message: "All rating and review",
      data: allRatingAndReviews,
    });
  } catch (error) {
    console.log("error in getAllRating controller", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export { createRatingAndReview, getAverageRating, getAllRating };
