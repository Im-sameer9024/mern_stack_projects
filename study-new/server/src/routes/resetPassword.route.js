import express from 'express';
import { validate } from '../middlewares/validate.middleware.js';
import { EmailValidator } from '../validator/user.validator.js';
import { ResetPasswordToken } from '../controllers/resetPassword.controller.js';
import { auth } from '../middlewares/auth.middleware.js';

const route = express.Router();

route.post('/resetPassword-token', auth, validate(EmailValidator), ResetPasswordToken);

export default route;
