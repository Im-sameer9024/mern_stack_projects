import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

//------------------ import all routes here-------------------

import userRoute from './routes/user.route.js';
import categoryRoute from './routes/category.route.js';
import profileRoute from './routes/profile.route.js';
import ratingAndReviewRoute from './routes/rating.route.js';
import forgotPasswordRoute from './routes/resetPassword.route.js';
import courseRoute from './routes/course.route.js';
import cloudinaryWebhook from './routes/webhook.route.js';
import CartRoute from './routes/cart.route.js';

const app = express();

//------------------ defined all middlewares here----------------
app.use(express.json({ limit: '1gb' }));
app.use(express.urlencoded({ extended: true, limit: '1gb' }));
app.use(express.static('public'));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:4173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  })
);

//---------------- mount all routes here-------------------
app.use('/api/v1', userRoute);
app.use('/api/v1', categoryRoute);
app.use('/api/v1', profileRoute);
app.use('/api/v1', ratingAndReviewRoute);
app.use('/api/v1', forgotPasswordRoute);
app.use('/api/v1', courseRoute);
app.use('/api/webhook', cloudinaryWebhook);
app.use('/api/v1', CartRoute);

app.get('/', (req, res) => {
  return res.json({
    success: true,
    message: 'Welcome to the backend',
  });
});

export default app;
