import express from 'express';
import { validate } from '../middlewares/validate.middleware.js';
import { EmailValidator } from '../validator/user.validator.js';
import { ResetPassword, ResetPasswordToken } from '../controllers/resetPassword.controller.js';
import { auth } from '../middlewares/auth.middleware.js';
import { ResetPasswordDataValidator } from '../validator/resetPassword.validator.js';

const route = express.Router();

route.post('/password/resetPassword-token', validate(EmailValidator), ResetPasswordToken);
route.post('/password/resetPassword', validate(ResetPasswordDataValidator), ResetPassword);

export default route;
