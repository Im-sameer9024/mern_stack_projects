import express from 'express';
import { validate } from '../middlewares/validate.middleware.js';
import {
  ChangePasswordDataValidator,
  EmailValidator,
  LoginDataValidator,
  SignupDataValidator,
} from '../validator/user.validator.js';
import {
  ChangePassword,
  LoginUser,
  RegisterUser,
  SendOtp,
} from '../controllers/user.controller.js';
import { otpLimiter } from './../middlewares/rateLimiter.middleware.js';
import { ResetPassword, ResetPasswordToken } from '../controllers/resetPassword.controller.js';
import { ResetPasswordDataValidator } from '../validator/resetPassword.validator.js';
import { auth } from '../middlewares/auth.middleware.js';

const route = express.Router();

//****************************************************************//
//                          USER AUTHENTICATION
//****************************************************************//

route.post('/user/send-otp', otpLimiter, validate(EmailValidator), SendOtp);
route.post('/user/signup', validate(SignupDataValidator), RegisterUser);
route.post('/user/login', validate(LoginDataValidator), LoginUser);
route.post('/user/change-password', validate(ChangePasswordDataValidator), auth, ChangePassword);

//*******************************************************************//
//                          RESET PASSWORD
//*******************************************************************//

route.post('/reset-password-token', validate(EmailValidator), ResetPasswordToken);
route.post('/reset-password', validate(ResetPasswordDataValidator), ResetPassword);

export default route;
