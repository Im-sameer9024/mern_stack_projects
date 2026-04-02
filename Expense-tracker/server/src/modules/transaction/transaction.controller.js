import ApiError from '../../shared/utils/apiError.js';
import ApiResponse from '../../shared/utils/apiResponse.js';
import { sortTypes } from '../../shared/utils/constants.js';
import Expense from '../expense/expense.schema.js';
import Income from '../income/income.schema.js';
import Transaction from './transaction.schema.js';

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

    const [allTransactions, totalTransactions, totalDetails] = await Promise.all([
      Transaction.find(filter).sort(sortOption).skip(skip).limit(limit),
      Transaction.countDocuments(filter),
      Transaction.aggregate([
        {
          $group: {
            _id: null,
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
