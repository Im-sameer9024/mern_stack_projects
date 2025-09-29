import RatingAndReview from "../models/RatingAndReviewModel.js";
import Product from "../models/ProductModel.js";
import Category from "../models/CategoryModel.js";
import mongoose from "mongoose";

const createRatingAndReview = async (req, res) => {
  try {
    const { productId, rating, review } = req.body;
    const userId = req.user.id;

    // check the user has already reviewed the product

    const alreadyReviewed = await RatingAndReview.findOne({
      user: userId,
      product: productId,
    });

    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this product",
      });
    }

    const newRatingAndReview = await RatingAndReview.create({
      user: userId,
      rating: rating,
      review: review,
      product: productId,
    });

    await Product.findByIdAndUpdate(
      { _id: productId },
      {
        $push: { ratingAndReviews: newRatingAndReview._id },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Rating and review created successfully",
      newRatingAndReview,
    });
  } catch (error) {
    console.log("Error occur in add rating and review", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getAverageRating = async (req, res) => {
  try {
    const productId = req.params.productId;
    // const id = new mongoose.Types.ObjectId(productId);

    const averageRating = await RatingAndReview.aggregate([
      {
        $match: {
          product: new mongoose.Types.ObjectId(productId),
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
          totalRating: { $sum: 1 },
        },
      },
    ]);

    // console.log("average rating", averageRating);

    if (averageRating.length > 0) {
      return res.status(200).json({
        success: true,
        message: "Average rating fetched successfully",
        data: averageRating[0],
      });
    }

    return res.status(200).json({
      success: true,
      message: "No rating and review found",
      averageRating: 0,
    });
  } catch (error) {
    console.log("Error occur in get average rating", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getAllRating = async (req, res) => {
  try {
    const { productId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    console.log("product Id is here", productId);

    const allRating = await RatingAndReview.find({
      product: productId,
    })
      .sort({ rating: -1 })
      .populate([{ path: "product" }, { path: "user" }])
      .exec();
    return res.status(200).json({
      success: true,
      message: "All rating fetched successfully",
      allRating,
    });
  } catch (error) {
    console.log("error occur in get all rating", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const checkUserReviewed = async (req, res) => {
  try {
    const id = req.user.id;
    const { productId } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "ProductId id not found",
      });
    }

    const userReviewed = await RatingAndReview.findOne({
      user: id,
      product: productId,
    });

    if (userReviewed) {
      return res.status(200).json({
        success: true,
        message: "User already reviewed",
        data: {
          reviewed: true,
        },
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "User not reviewed",
        data: {
          reviewed: false,
        },
      });
    }
  } catch (error) {
    console.log("error occur in check user reviewed", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export { createRatingAndReview, getAverageRating, getAllRating,checkUserReviewed };
