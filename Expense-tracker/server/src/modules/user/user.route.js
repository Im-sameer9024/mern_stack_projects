import express from 'express';
import {
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

//---------------- password reset--------------

route.post('/forgot-password', ResetPasswordToken);
route.post('/reset-password', ResetPassword);

export default route;
