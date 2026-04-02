import mongoose from 'mongoose';
import ApiError from '../shared/utils/apiError.js';
import ApiResponse from '../shared/utils/apiResponse.js';
import Income from './income/income.schema.js';
import Expense from './expense/expense.schema.js';

export const GetDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;

    const userObjectId = new mongoose.Types.ObjectId(userId);

   

    return ApiResponse(res, 200, null, 'Dashboard Data Fetched Successfully');
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};
