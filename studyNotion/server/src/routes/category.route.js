import express from 'express';
import { validate } from '../middlewares/validate.middleware.js';
import { CategoryDataValidator } from '../validator/category.validator.js';
import {
  CategoryPageDetails,
  CreateCategory,
  DeleteCategory,
  GetAllCategories,
  UpdateCategory,
} from '../controllers/category.controller.js';
import { auth, isAdmin } from '../middlewares/auth.middleware.js';

const route = express.Router();

route.post(
  '/category/create-category',
  validate(CategoryDataValidator),
  auth,
  isAdmin,
  CreateCategory
);
route.get('/category/get-categories', GetAllCategories);
route.get('/category/get-category-details/:categoryId', CategoryPageDetails);

route.delete('/category/delete-category/:categoryId', auth, isAdmin, DeleteCategory);
route.put(
  '/category/update-category/:categoryId',
  validate(CategoryDataValidator),
  auth,
  isAdmin,
  UpdateCategory
);

export default route;
