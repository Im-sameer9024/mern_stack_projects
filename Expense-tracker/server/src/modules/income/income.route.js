import express from 'express';
import { AddIncome, DeleteIncome, DownloadIncome, GetAllIncome } from './income.controller.js';
import { auth } from '../../middlewares/auth.middleware.js';

const route = express.Router();

route.post('/add', auth, AddIncome);
route.delete('/delete', auth, DeleteIncome);
route.get('/get-all-incomes', auth, GetAllIncome);
route.post('/download-pdf', auth, DownloadIncome);

export default route;
