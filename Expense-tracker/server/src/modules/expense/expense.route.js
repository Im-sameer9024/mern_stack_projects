import express from 'express';
import {
  AddExpense,
  DeleteAllExpense,
  DeleteExpense,
  DownloadExpense,
  EditExpense,
  GetAllExpense,
  GetSingleExpense,
} from './expense.controller.js';
import { auth } from '../../middlewares/auth.middleware.js';

const route = express.Router();

route.post('/add', auth, AddExpense);
route.post('/update-expense', auth, EditExpense);
route.get('/get-all-expenses', auth, GetAllExpense);
route.get('/get-single-expense/:expenseId', auth, GetSingleExpense);
route.delete('/delete', auth, DeleteExpense);
route.delete('/delete-all-expenses', auth, DeleteAllExpense);
route.post('/download-pdf', auth, DownloadExpense);

export default route;
