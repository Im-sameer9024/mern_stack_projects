import express from 'express';
import { auth } from '../../middlewares/auth.middleware.js';
import { DeleteAllData, DownloadTransactionPDF, GetAllTransactions } from './transaction.controller.js';

const route = express.Router();

route.get('/get-all-transactions', auth, GetAllTransactions);
route.get('/download-pdf', auth, DownloadTransactionPDF);
route.delete('/delete-all-data', auth, DeleteAllData);

export default route;
