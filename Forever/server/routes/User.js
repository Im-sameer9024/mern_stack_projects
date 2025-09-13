import express from 'express'
import { getLoginUserDetails, login, sendOtp, signup } from '../controllers/AuthController.js';
import { auth, isUser } from '../middlewares/AuthMiddleware.js';

const router  = express.Router();

router.post('/sendOtp', sendOtp);
router.post('/signup', signup);
router.post('/login', login);
router.get('/user-details',auth,getLoginUserDetails)

export default router;