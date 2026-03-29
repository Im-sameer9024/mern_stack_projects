import express from 'express';
import { auth } from '../middlewares/auth.middleware.js';
import { GetDashboardData } from './dashboard.controller.js';

const route = express.Router();

route.get('/dashboard-data', auth, GetDashboardData);

export default route;
