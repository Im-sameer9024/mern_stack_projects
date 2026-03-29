import ApiResponse from '../../shared/utils/apiResponse.js';
import { GenerateExpensePDF } from '../../shared/utils/pdfGenerators.js';
import Expense from './expense.schema.js';
import { formatDate } from '../../shared/utils/helpers.js';
import ApiError from '../../shared/utils/apiError.js';

const AddExpense = async (req, res) => {
  try {
    const userId = req.user.id;

    const { icon, category, amount } = req.body;

    const newExpense = await Expense.create({
      userId,
      icon,
      category,
      amount,
    });

    return ApiResponse(res, 200, newExpense, 'Expense added successfully');
  } catch (error) {
    return ApiResponse(res, 500, error, 'Something went wrong');
  }
};

const GetAllExpense = async (req, res) => {
  try {
    const userId = req.user.id;

    // sort = latest | oldest | high | low
    let { startDate, endDate, page = 1, limit = 10, sort = 'latest', category } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    let filter = {
      userId: userId,
    };

    // date filter

    if (startDate && endDate) {
      filter.date = {
        $gte: startDate,
        $lte: endDate,
      };
    }

    // category filter

    if (category) {
      filter.category = {
        $regex: category,
        $options: 'i',
      };
    }

    let sortOption = {};

    switch (sort) {
      case 'high':
        sortOption.amount = -1;
        break;
      case 'low':
        sortOption.amount = 1;
        break;
      case 'oldest':
        sortOption.date = 1;
        break;
      default:
        sortOption.date = -1; // latest
    }

    //---- pagination ------

    const skip = (page - 1) * limit;

    const [expenses, total] = await Promise.all([
      Expense.find(filter).sort(sortOption).skip(skip).limit(limit),
      Expense.countDocuments(filter),
    ]);

    return ApiResponse(
      res,
      200,
      {
        expenses,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      },
      'All Expenses fetched successfully'
    );
  } catch (error) {
    return ApiResponse(res, 500, error, 'Something went wrong');
  }
};

const DeleteExpense = async (req, res) => {
  try {
    const { expenseId } = req.body;
    const deletedExpense = await Expense.findByIdAndDelete(expenseId);

    return ApiResponse(res, 200, deletedExpense, 'Expense deleted successfully');
  } catch (error) {
    return ApiResponse(res, 500, error, 'Something went wrong');
  }
};

const DownloadExpense = async (req, res) => {
  try {
    const userId = req.user.id;

    let { startDate, endDate } = req.query;

    // ---- Base filter ----
    const filter = { userId };

    // ---- If dates NOT provided → auto set ----
    if (!startDate || !endDate) {
      const firstExpense = await Expense.findOne({ userId })
        .sort({ date: 1 }) // oldest first
        .select('date')
        .limit(1);

      startDate = firstExpense?.date || new Date(); // fallback if no data
      endDate = new Date();
    }

    // ---- Apply date filter ----
    filter.date = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };

    const expenses = await Expense.find(filter)
      .sort({
        date: -1,
      })
      .select('category amount date');

    //------- create pdf ----------

    return GenerateExpensePDF(res, {
      title: 'Expense_Report',
      data: expenses,
      startDate,
      endDate,
      formatDate,
    });
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

export { AddExpense, GetAllExpense, DeleteExpense, DownloadExpense };
