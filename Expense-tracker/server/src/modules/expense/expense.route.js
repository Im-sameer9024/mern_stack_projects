import express from 'express';
import { AddExpense, DeleteExpense, DownloadExpense, GetAllExpense } from './expense.controller.js';
import { auth } from '../../middlewares/auth.middleware.js';

const route = express.Router();

route.post('/add', auth, AddExpense);
route.delete('/delete', auth, DeleteExpense);
route.get('/get-all-expenses', auth, GetAllExpense);
route.post('/download-pdf', auth, DownloadExpense);

export default route;
