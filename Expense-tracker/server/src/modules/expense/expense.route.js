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
import { validate } from '../../middlewares/validate.middleware.js';
import {
  AddExpenseValidationSchema,
  UpdateExpenseValidationSchema,
} from './expense.validationSchema.js';

const route = express.Router();

route.post('/add', auth, validate(AddExpenseValidationSchema), AddExpense);
route.post('/update-expense', auth, validate(UpdateExpenseValidationSchema), EditExpense);
route.get('/get-all-expenses', auth, GetAllExpense);
route.get('/get-single-expense/:expenseId', auth, GetSingleExpense);
route.delete('/delete', auth, DeleteExpense);
route.delete('/delete-all-expenses', auth, DeleteAllExpense);
route.get('/download-pdf', auth, DownloadExpense);

export default route;
