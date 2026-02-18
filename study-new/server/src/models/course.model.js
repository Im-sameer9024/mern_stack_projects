import mongoose from 'mongoose';
import { availableCourseStatus } from '../utils/constants';

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    whatYouWillLearn: {
      type: String,
      trim: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: availableCourseStatus,
    },
    instructions: {
      type: [String],
    },
    ratingAndReviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RatingAndReview',
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    tag: {
      type: [String],
    },

    courseContent: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Section',
      },
    ],
    studentsEnrolled: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
);

const Course = mongoose.model('Course', courseSchema);

export default Course;
