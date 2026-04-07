import ApiResponse from '../../shared/utils/apiResponse.js';
import { GenerateExpensePDF } from '../../shared/utils/pdfGenerators.js';
import Expense from './expense.schema.js';
import { formatDate } from '../../shared/utils/helpers.js';
import ApiError from '../../shared/utils/apiError.js';
import Transaction from '../transaction/transaction.schema.js';
import { sortTypes, TransactionTypes } from '../../shared/utils/constants.js';
import mongoose from 'mongoose';

const AddExpense = async (req, res) => {
  try {
    const userId = req.user.id;

    const { source, amount, date } = req.body;

    const newExpense = await Expense.create({
      userId,
      source,
      amount,
      date: date,
    });

    //------------- Create transaction ------------

    const newTransaction = await Transaction.create({
      userId: userId,
      transactionId: newExpense?._id,
      transactionType: TransactionTypes.EXPENSE,
      transactionAmount: amount,
      source: source,
      transactionDate: newExpense.date,
    });

    return ApiResponse(res, 200, { newExpense, newTransaction }, 'Expense added successfully');
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

const EditExpense = async (req, res) => {
  try {
    const { expenseId, amount, date, source } = req.body;

    const [updatedExpense, updatedTransaction] = await Promise.all([
      Expense.findByIdAndUpdate(
        expenseId,
        {
          amount,
          date: new Date(date),
          source,
        },
        { new: true }
      ),
      Transaction.findOneAndUpdate(
        {
          transactionId: expenseId,
          transactionType: TransactionTypes.EXPENSE,
        },
        {
          transactionAmount: amount,
          source: source,
          transactionDate: new Date(date),
        },
        { new: true }
      ),
    ]);

    return ApiResponse(
      res,
      200,
      { updatedExpense, updatedTransaction },
      'Expense updated successfully'
    );
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

const GetAllExpense = async (req, res) => {
  try {
    const { id } = req.user;

    // sort = latest | oldest | high | low
    let { startDate, endDate, page = 1, limit = 10, sort = sortTypes.LATEST, source } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    let filter = {
      userId: id,
    };

    // date filter

    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    // source filter

    if (source) {
      filter.source = {
        $regex: source,
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

    const matchStage = {
      userId: new mongoose.Types.ObjectId(id), // 👈 filter by logged-in user
    };

    if (startDate && endDate) {
      matchStage.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const [expenses, total, chartData,totalDetails] = await Promise.all([
      Expense.find(filter).sort(sortOption).skip(skip).limit(limit),
      Expense.countDocuments(filter),
      Expense.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(id),
          },
        },
        {
          $group: {
            _id: {
              month: {
                $month: '$date',
              },
              year: {
                $year: '$date',
              },
            },
            totalAmount: {
              $sum: '$amount',
            },
          },
        },
        {
          $sort: {
            '_id.year': 1,
            '_id.month': 1,
          },
        },
      ]),
      Expense.aggregate([
        {
          $match: matchStage,
        },
        {
          $group: {
            _id: '$userId',
            totalExpense: {
              $sum: '$amount',
            },
          },
        },

        {
          $project: {
            _id: 0,
            totalExpense: 1,
          },
        },
      ]),
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
        totalDetails
      },
      'All Expenses fetched successfully'
    );
  } catch (error) {
    return ApiResponse(res, 500, error, 'Something went wrong');
  }
};

const GetSingleExpense = async (req, res) => {
  try {
    const { expenseId } = req.params;

    if (!expenseId) {
      return ApiResponse(res, 404, null, 'ExpenseId not found');
    }

    const expense = await Expense.findById(expenseId);

    if (!expense) {
      return ApiResponse(res, 404, null, 'Expense not found');
    }

    return ApiResponse(res, 200, expense, 'Expense fetched successfully');
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
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

const DeleteAllExpense = async (req, res) => {
  try {
    const userId = req.user.id;

    await Promise.all([
      Expense.deleteMany({ userId: userId }),
      Transaction.deleteMany({ userId: userId, transactionType: TransactionTypes.EXPENSE }),
    ]);

    return ApiResponse(res, 200, null, 'All Expense deleted successfully');
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

      const lastExpense = await Expense.findOne({ userId })
        .sort({
          date: -1,
        })
        .select('date')
        .limit(1);

      startDate = firstExpense?.date || new Date(); // fallback if no data
      endDate = lastExpense?.date || new Date();
    }

    // ---- Apply date filter ----
    filter.date = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };

    const expenses = await Expense.find(filter)
      .sort({
        date: 1,
      })
      .select('source amount date');

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

export {
  AddExpense,
  GetAllExpense,
  GetSingleExpense,
  DeleteExpense,
  DownloadExpense,
  EditExpense,
  DeleteAllExpense,
};
