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
  GetInTouch,
  LoginUser,
  LogoutUser,
  RefreshAccessToken,
  RegisterUser,
  SendOtp,
} from '../controllers/user.controller.js';
import { otpLimiter } from './../middlewares/rateLimiter.middleware.js';
import { auth } from '../middlewares/auth.middleware.js';
import { GetInTouchFormSchema } from '../validator/contact.validator.js';

const route = express.Router();

//****************************************************************//
//                          USER AUTHENTICATION
//****************************************************************//

route.post('/user/send-otp', otpLimiter, validate(EmailValidator), SendOtp);
route.post('/user/signup', validate(SignupDataValidator), RegisterUser);
route.post('/user/login', validate(LoginDataValidator), LoginUser);
route.get('/user/logout', auth, LogoutUser);
route.post('/user/change-password', validate(ChangePasswordDataValidator), auth, ChangePassword);
route.get('/user/refresh-token', RefreshAccessToken);
route.post('/user/get-in-touch', validate(GetInTouchFormSchema), GetInTouch);

export default route;
