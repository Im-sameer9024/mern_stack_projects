import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

//------------------ import all routes here-------------------

import userRoute from './routes/user.route.js';

const app = express();

//------------------ defined all middlewares here----------------
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(express.static('public'));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  })
);

//---------------- mount all routes here-------------------
app.use('/api/v1', userRoute);

app.get('/', (req, res) => {
  return res.json({
    success: true,
    message: 'Welcome to the backend',
  });
});

export default app;
