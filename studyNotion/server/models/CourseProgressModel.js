import mongoose from "mongoose";

const courseProgress = new mongoose.Schema(
  {
    courseID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    completedVideos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubSection",
      },
    ],
  },
  {
    timestamps: true,
    minimize: true,
  },
);

export default mongoose.model("CourseProgress", courseProgress);
