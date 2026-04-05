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

const route = express.Router();

route.post('/add', auth, AddIncome);
route.delete('/delete', auth, DeleteIncome);
route.get('/get-all-incomes', auth, GetAllIncome);
route.get('/download-pdf', auth, DownloadIncome);
route.put('/update-income', auth, EditIncome);
route.delete('/delete-all-incomes', auth, DeleteAllIncome);
route.get('/get-single-income/:incomeId', auth, GetSingleIncome);

export default route;
