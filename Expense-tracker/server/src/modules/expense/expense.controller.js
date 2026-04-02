import ApiResponse from '../../shared/utils/apiResponse.js';
import { GenerateExpensePDF } from '../../shared/utils/pdfGenerators.js';
import Expense from './expense.schema.js';
import { formatDate } from '../../shared/utils/helpers.js';
import ApiError from '../../shared/utils/apiError.js';
import Transaction from '../transaction/transaction.schema.js';
import { sortTypes, TransactionTypes } from '../../shared/utils/constants.js';

const AddExpense = async (req, res) => {
  try {
    const userId = req.user.id;

    const { category, amount } = req.body;

    const newExpense = await Expense.create({
      userId,
      category,
      amount,
    });

    //------------- Create transaction ------------

    const newTransaction = await Transaction.create({
      userId: userId,
      transactionId: newExpense?._id,
      transactionType: TransactionTypes.EXPENSE,
      transactionAmount: amount,
      source: category,
    });

    return ApiResponse(res, 200, { newExpense, newTransaction }, 'Expense added successfully');
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

const GetAllExpense = async (req, res) => {
  try {
    const userId = req.user.id;

    // sort = latest | oldest | high | low
    let { startDate, endDate, page = 1, limit = 10, sort = sortTypes.LATEST, category } = req.query;

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
      case sortTypes.HIGHEST:
        sortOption.amount = -1;
        break;
      case sortTypes.LOWEST:
        sortOption.amount = 1;
        break;
      case sortTypes.OLDEST:
        sortOption.date = 1;
        break;
      default:
        sortOption.date = -1; // latest
    }

    //---- pagination ------

    const skip = (page - 1) * limit;

    const [expenses, total,chartData] = await Promise.all([
      Expense.find(filter).sort(sortOption).skip(skip).limit(limit),
      Expense.countDocuments(filter),
      Expense.aggregate([
              {
                $group:{
                  _id:{
                    month:{
                      $month:"$createdAt"
                    },
                    year:{
                      $year:"$createdAt"
                    }
                  },
                  totalAmount:{
                    $sum:"$amount"
                  }
                }
              },
              {
                $sort:{
                  "_id.year":1,
                  "_id.month":1
                }
              }
            ])
    ]);

    return ApiResponse(
      res,
      200,
      {
        chartData,
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

    const [deletedExpense, deletedTransaction] = await Promise.all([
      Expense.findByIdAndDelete(expenseId),
      Transaction.findOneAndDelete({
        transactionId: expenseId,
        transactionType: TransactionTypes.EXPENSE,
      }),
    ]);

    return ApiResponse(
      res,
      200,
      { deletedExpense, deletedTransaction },
      'Expense deleted successfully'
    );
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
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
