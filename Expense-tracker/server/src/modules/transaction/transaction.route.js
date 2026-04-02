import express from 'express';
import { auth } from '../../middlewares/auth.middleware.js';
import { GetAllTransactions } from './transaction.controller.js';

const route = express.Router();

route.get('/get-all-transactions', auth, GetAllTransactions);


export default route;
