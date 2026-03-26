import express from 'express';
import { auth, isStudent } from '../middlewares/auth.middleware.js';
import { AddToCart, GetCart, RemoveFromCart } from '../controllers/cart.controller.js';
import { capturePayment, verifyPayment } from '../controllers/payment.controller.js';

const route = express.Router();

route.post('/course/add-to-cart', auth, isStudent, AddToCart);
route.post('/course/remove-from-cart', auth, isStudent, RemoveFromCart);
route.get('/course/get-cart', auth, isStudent, GetCart);
route.get('/payment/capture', auth, isStudent, capturePayment);
route.get('/payment/verify', auth, isStudent, verifyPayment);

export default route;
