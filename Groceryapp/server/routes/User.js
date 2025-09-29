import express from "express";
import {
  login,
  sendOtp,
  logout,
  signup,
  getLoginUserDetails,
} from "../controllers/AuthController.js";
import {
  resetPasswordToken,
  resetPassword,
} from "../controllers/ResetPasswordController.js";
import { auth, isUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

//--------------------------Authentication Routes is here --------------------------

router.post("/send-otp", sendOtp);
router.post("/register", signup);
router.post("/login", login);
router.get("/logout", auth, isUser, logout);
router.get("/status", auth, isUser, getLoginUserDetails);

//--------------------------Routes for user password reset is here --------------------------
router.post("/reset-password-token", auth, isUser, resetPasswordToken);
router.post("/reset-password/:token", auth, isUser, resetPassword);

export default router;
