import express from 'express';
import { validate } from '../middlewares/validate.middleware.js';
import {
  CreateRating,
  GetAllRating,
  GetAverageRating,
} from '../controllers/ratingAndReview.controller.js';
import { auth, isStudent } from '../middlewares/auth.middleware.js';
import RatingReviewDataValidator from '../validator/ratingreview.validator.js';

const route = express.Router();

route.post(
  '/rating-review/create-review',
  validate(RatingReviewDataValidator),
  auth,
  // isStudent,
  CreateRating
);
route.get('/rating-review/get-average-rating/:courseId', GetAverageRating);
route.get('/rating-review/get-all-rating', GetAllRating);

export default route;
