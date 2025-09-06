import express from "express";
import {
  AddItemToCart,
  GetCartOfUser,
  UpdateCart,
  RemoveFromCart,
  clearAllCart,
} from "../controllers/CartController.js";
import { auth, isUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/cart/get-cart-items", auth, isUser, GetCartOfUser);
router.post("/cart/add-item", auth, isUser, AddItemToCart);
router.post("/cart/update-cart", auth, isUser, UpdateCart);
router.post("/cart/remove-item", auth, isUser, RemoveFromCart);
router.get("/cart/clear-cart", auth, isUser, clearAllCart);

export default router;
