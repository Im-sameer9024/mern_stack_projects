import express from 'express';
import {
  GetUserDetails,
  LogIn,
  LogOut,
  RefreshAccessToken,
  ResetPassword,
  ResetPasswordToken,
  SignUp,
} from './user.controller.js';
// import { validate } from "../../middlewares/validate.middleware.js";
// import { LoginValidationSchema, SignupValidationSchema } from "./user.validationSchema.js";
import { auth } from '../../middlewares/auth.middleware.js';

const route = express.Router();

route.post('/signup', SignUp);
route.post('/login', LogIn);
route.get('/refresh-token', RefreshAccessToken);
route.get('/logout', auth, LogOut);
route.get('/user-details', auth, GetUserDetails);

//---------------- password reset--------------

route.post('/forgot-password', ResetPasswordToken);
route.post('/reset-password', ResetPassword);

export default route;
