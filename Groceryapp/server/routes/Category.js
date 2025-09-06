import express from "express";
import { auth, isAdmin } from "../middlewares/auth.middleware.js";
import {
  createCategory,
  getAllCategories,
} from "../controllers/CategoryController.js";

const router = express.Router();

//-----------------------Routes for Category-----------------------//
router.post("/create-category", auth, isAdmin, createCategory);
router.get("/get-all-category", getAllCategories);

export default router;
