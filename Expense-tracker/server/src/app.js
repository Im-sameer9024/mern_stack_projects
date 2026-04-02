import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

//------------------- import all routes here-------------------

import userRoute from './modules/user/user.route.js';
import incomeRoute from './modules/income/income.route.js';
import expenseRoute from './modules/expense/expense.route.js';
import dashboardRoute from './modules/dashboard.route.js';
import transactionRoute from './modules/transaction/transaction.route.js';

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(
  cors({
    origin: process.env.CLIENT_URL || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

//------------------ mount all routes here------------------------

app.use('/api/v1/user', userRoute);
app.use('/api/v1/income', incomeRoute);
app.use('/api/v1/expense', expenseRoute);
app.use('/api/v1/dashboard', dashboardRoute);
app.use('/api/v1/transactions', transactionRoute);

app.get('/', (req, res) => {
  return res.json({
    success: true,
    message: 'Welcome to the Expense Tracker API',
  });
});

export default app;
