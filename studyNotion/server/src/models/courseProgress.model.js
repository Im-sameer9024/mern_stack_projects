import mongoose from 'mongoose';

const courseProgressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
    completedVideos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubSection',
      },
    ],
  },
  { timestamps: true }
);

const CourseProgress = mongoose.model('CourseProgress', courseProgressSchema);

export default CourseProgress;
