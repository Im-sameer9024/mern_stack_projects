import express from 'express';
import {
  AddIncome,
  DeleteAllIncome,
  DeleteIncome,
  DownloadIncome,
  EditIncome,
  GetAllIncome,
  GetSingleIncome,
} from './income.controller.js';
import { auth } from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import {
  AddIncomeValidationSchema,
  UpdateIncomeValidationSchema,
} from './income.validationSchema.js';

const route = express.Router();

route.post('/add', auth, validate(AddIncomeValidationSchema), AddIncome);
route.delete('/delete', auth, DeleteIncome);
route.get('/get-all-incomes', auth, GetAllIncome);
route.get('/download-pdf', auth, DownloadIncome);
route.put('/update-income', auth, validate(UpdateIncomeValidationSchema), EditIncome);
route.delete('/delete-all-incomes', auth, DeleteAllIncome);
route.get('/get-single-income/:incomeId', auth, GetSingleIncome);

export default route;
