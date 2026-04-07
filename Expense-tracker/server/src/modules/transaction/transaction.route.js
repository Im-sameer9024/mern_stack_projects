import express from 'express';
import { auth } from '../../middlewares/auth.middleware.js';
import { DownloadTransactionPDF, GetAllTransactions } from './transaction.controller.js';

const route = express.Router();

route.get('/get-all-transactions', auth, GetAllTransactions);
route.get('/download-pdf', auth, DownloadTransactionPDF);

export default route;
