import mongoose from 'mongoose';
import { availableCourseStatus, courseStatus } from '../utils/constants.js';

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
      type: [String],
      trim: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    thumbnail_public_id: {
      type: String,
    },
    status: {
      type: String,
      enum: availableCourseStatus,
      default: courseStatus.DRAFT,
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

courseSchema.index({ category: 1 });
courseSchema.index({ instructor: 1 });
courseSchema.index({ status: 1 });
courseSchema.index({ price: 1 });
courseSchema.index({ createdAt: -1 });
courseSchema.index({ tag: 1 });

const Course = mongoose.model('Course', courseSchema);

export default Course;
