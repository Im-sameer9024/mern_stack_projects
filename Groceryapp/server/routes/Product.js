import express from "express";
import { auth, isAdmin, isUser } from "../middlewares/auth.middleware.js";
import {
  createProduct,
  getAllProducts,
  getProductDetails,
  getProductsByCategory,
  getBestSellerProducts
} from "../controllers/ProductController.js";

import {
  createRatingAndReview,
  getAverageRating,
  getAllRating,
} from "../controllers/RatingAndReviewController.js";

const route = express.Router();

//----------------------Routes for Products-------------------------//

route.post("/create-product", auth, isAdmin, createProduct);
route.get("/all-products", getAllProducts);
route.get("/product/:productId", getProductDetails);
route.get("/category-products/:categoryId",getProductsByCategory)
route.get("/best-seller-products", getBestSellerProducts);

//----------------------Routes for RatingAndReview-------------------------//

route.post("/create-rating-review", auth, isUser, createRatingAndReview);
route.get("/get-average-rating/:productId", getAverageRating);
route.get("/get-all-rating/:productId", getAllRating);

export default route;
