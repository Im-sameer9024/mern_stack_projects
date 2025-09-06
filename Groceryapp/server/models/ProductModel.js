import mongoose from "mongoose";

const ProductModel = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    ratingAndReviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RatingAndReview",
      },
    ],
    images: [
      {
        type: String,
        trim: true,
      },
    ],
    about: {
      type: String,
      trim: true,
    },
    isStock:{
      type:Boolean,
      default:true
    }
  },
  { timestamps: true, minimize: true }
);

export default mongoose.model("Product", ProductModel);
