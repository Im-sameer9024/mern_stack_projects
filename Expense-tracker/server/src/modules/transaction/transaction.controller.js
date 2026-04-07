import ApiError from '../../shared/utils/apiError.js';
import ApiResponse from '../../shared/utils/apiResponse.js';
import { sortTypes } from '../../shared/utils/constants.js';
import { formatDate } from '../../shared/utils/helpers.js';
import { GenerateTransactionPDF } from '../../shared/utils/pdfGenerators.js';
import Expense from '../expense/expense.schema.js';
import Income from '../income/income.schema.js';
import Transaction from './transaction.schema.js';
import mongoose from 'mongoose';

export const GetAllTransactions = async (req, res) => {
  try {
    const userId = req.user.id;
    let { startDate, endDate, sort = sortTypes.LATEST, limit = 10, page = 1 } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    let filter = {
      userId: userId,
    };

    if (startDate && endDate) {
      filter.transactionDate = {
        $gte: startDate,
        $lte: endDate,
      };
    }

    let skip = (page - 1) * limit;

    let sortOption = {};

    switch (sort) {
      case sortTypes.HIGHEST:
        sortOption.transactionAmount = -1;
        break;
      case sortTypes.LOWEST:
        sortOption.transactionAmount = 1;
        break;
      case sortTypes.OLDEST:
        sortOption.transactionDate = 1;
        break;
      default:
        sortOption.transactionDate = -1;
    }

    const matchStage = {
      userId: new mongoose.Types.ObjectId(userId), // 👈 filter by logged-in user
    };

    if (startDate && endDate) {
      matchStage.transactionDate = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const [allTransactions, totalTransactions, totalDetails] = await Promise.all([
      Transaction.find(filter).sort(sortOption).skip(skip).limit(limit),
      Transaction.countDocuments(filter),
      Transaction.aggregate([
        {
          $match: matchStage,
        },
        {
          $group: {
            _id: '$userId',
            totalIncome: {
              $sum: {
                $cond: [{ $eq: ['$transactionType', 'income'] }, '$transactionAmount', 0],
              },
            },
            totalExpense: {
              $sum: {
                $cond: [{ $eq: ['$transactionType', 'expense'] }, '$transactionAmount', 0],
              },
            },
          },
        },
        {
          $addFields: {
            totalBalance: {
              $subtract: ['$totalIncome', '$totalExpense'],
            },
          },
        },
        {
          $project: {
            _id: 0,
            userId: '$_id', // 👈 rename for clarity
            totalIncome: 1,
            totalExpense: 1,
            totalBalance: 1,
          },
        },
      ]),
    ]);

    return ApiResponse(res, 200, {
      allTransactions,
      totalDetails,
      pagination: {
        total: totalTransactions,
        page,
        limit,
        totalPages: Math.ceil(totalTransactions / limit),
      },
    });
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

export const DeleteAllData = async (req, res) => {
  try {
    const userId = req.user.id;

    await Promise.all([
      Income.deleteMany({ userId: userId }),
      Expense.deleteMany({ userId: userId }),
      Transaction.deleteMany({ userId: userId }),
    ]);

    return ApiResponse(res, 200, null, 'All data deleted successfully');
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

export const DownloadTransactionPDF = async (req, res) => {
  try {
    const userId = req.user.id;
    let { startDate, endDate } = req.query;

    // ---- Base filter ----
    const filter = { userId: userId };

    // ---- If dates NOT provided → auto set ----
    if (!startDate || !endDate) {
      const firstTransaction = await Transaction.findOne({ userId })
        .sort({ transactionDate: 1 }) // oldest first
        .select('transactionDate')
        .limit(1);

      const lastTransaction = await Transaction.findOne({ userId })
        .sort({ transactionDate: -1 })
        .select('transactionDate')
        .limit(1);

      startDate = firstTransaction?.transactionDate || new Date(); // fallback if no data
      endDate = lastTransaction?.transactionDate || new Date();
    }

    // ---- Apply date filter ----
    filter.transactionDate = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };

    // Fetch income data based on filter
    const Transactions = await Transaction.find(filter).sort({
      transactionDate: 1,
    });

    if (!Transactions.length) {
      return ApiResponse(res, 404, null, 'No Transactions found');
    }

    //--------- create pdf ---------

    return GenerateTransactionPDF(res, {
      title: 'All_Transactions_Report',
      data: Transactions,
      startDate,
      endDate,
      formatDate,
    });
  } catch (error) {
    console.error(error);
    return ApiError(res, 500, null, error.message);
  }
};
