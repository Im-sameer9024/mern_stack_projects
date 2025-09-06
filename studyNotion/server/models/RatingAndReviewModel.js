import mongoose from "mongoose";

const ratingAndReviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
    course:{
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Course",
      required: true,
      index:true, // it is used to filtering and searching the course easy and fast using this .
    }
  },
  {
    timestamps: true,
    minimize: true,
  },
);

export default mongoose.model("RatingAndReview", ratingAndReviewSchema);
