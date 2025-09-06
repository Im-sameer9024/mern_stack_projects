import express from "express";
import { sendOtp, signUp, logIn, changePassword,ContactUs } from "../controllers/AuthController.js";
import { resetPasswordToken, resetPassword } from "../controllers/ResetPasswordController.js";

import { auth } from "../middlewares/AuthMiddleware.js";

const router = express.Router();



//************************************************************//
//                    Authentication Routes
//************************************************************//

//--------- Route for login user-------- 
router.post("/login",logIn)

//--------- Route for signup user--------
router.post("/signup",signUp)

//--------- Route for sending otp to user--------
router.post("/send-otp",sendOtp)

//--------- Route for change password--------
router.post("/change-password",auth,changePassword)



//************************************************************//
//                   Rest Password Routes
//************************************************************//


//--------- Route for reset password token--------
router.post("/reset-password-token",resetPasswordToken)

//--------- Route for reset password--------
router.post("/reset-password",resetPassword)  

//----------Route for contact us -----------------
router.post("/contact-us",ContactUs)

export default router;