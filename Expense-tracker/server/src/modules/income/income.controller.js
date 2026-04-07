import mongoose from 'mongoose';
import ApiError from '../../shared/utils/apiError.js';
import ApiResponse from '../../shared/utils/apiResponse.js';
import { sortTypes, TransactionTypes } from '../../shared/utils/constants.js';
import { formatDate } from '../../shared/utils/helpers.js';
import { GenerateIncomePDF } from '../../shared/utils/pdfGenerators.js';
import Transaction from '../transaction/transaction.schema.js';
import Income from './income.schema.js';

const AddIncome = async (req, res) => {
  try {
    const { id } = req.user;
    const { source, amount, date } = req.body;

    const newIncome = await Income.create({
      userId: id,
      source,
      amount,
      date: new Date(date),
    });

    //------------- Create transaction ------------

    const newTransaction = await Transaction.create({
      userId: id,
      transactionId: newIncome?._id,
      transactionType: TransactionTypes.INCOME,
      transactionAmount: amount,
      source: source,
      transactionDate: newIncome.date,
    });

    return ApiResponse(res, 201, { newIncome, newTransaction }, 'Income added successfully');
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

const EditIncome = async (req, res) => {
  try {
    const { incomeId, amount, date, source } = req.body;

    if (!incomeId) {
      return ApiResponse(res, 400, null, 'Income id is required');
    }

    const [updateTransaction, updatedIncome] = await Promise.all([
      Income.findByIdAndUpdate(
        incomeId,
        {
          amount,
          date: new Date(date),
          source,
        },
        { new: true }
      ),
      Transaction.findOneAndUpdate(
        { transactionId: incomeId, transactionType: TransactionTypes.INCOME },
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
      { updateTransaction, updatedIncome },
      'Income updated successfully'
    );
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

const GetAllIncome = async (req, res) => {
  try {
    const { id } = req.user;

    // sort = latest | oldest | highest | lowest
    let { startDate, endDate, page = 1, limit = 10, sort = sortTypes.LATEST, source } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    let filter = {
      userId: id,
    };

    //-------- date filter --------

    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    //--------- source filter =-----------

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

    // pagination

    let skip = (page - 1) * limit;

    const matchStage = {
      userId: new mongoose.Types.ObjectId(id), // 👈 filter by logged-in user
    };

    if (startDate && endDate) {
      matchStage.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    //----- parallel queries ---------

    const [incomes, total, chartData, totalDetails] = await Promise.all([
      Income.find(filter).sort(sortOption).skip(skip).limit(limit),
      Income.countDocuments(filter),
      Income.aggregate([
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
      Income.aggregate([
        {
          $match: matchStage,
        },
        {
          $group: {
            _id: '$userId',
            totalIncome: {
              $sum: '$amount',
            },
          },
        },

        {
          $project: {
            _id: 0,
            totalIncome: 1,
          },
        },
      ]),
    ]);

    return ApiResponse(
      res,
      200,
      {
        incomes,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
        chartData,
        totalDetails
      },
      'All incomes fetched successfully'
    );
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

const GetSingleIncome = async (req, res) => {
  try {
    const { incomeId } = req.params;

    if (!incomeId) {
      return ApiResponse(res, 400, null, 'IncomeId is required');
    }

    const income = await Income.findById(incomeId);

    if (!income) {
      return ApiResponse(res, 404, null, 'Income not found');
    }

    return ApiResponse(res, 200, income, 'Income fetched successfully');
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

const DeleteIncome = async (req, res) => {
  try {
    const { incomeId } = req.body;

    const [deletedIncome, deletedTransaction] = await Promise.all([
      Income.findByIdAndDelete(incomeId),
      Transaction.findOneAndDelete({
        transactionId: incomeId,
        transactionType: TransactionTypes.INCOME,
      }),
    ]);

    return ApiResponse(
      res,
      200,
      { deletedIncome, deletedTransaction },
      'Income deleted successfully'
    );
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

const DeleteAllIncome = async (req, res) => {
  try {
    const userId = req.user.id;

    await Promise.all([
      Income.deleteMany({ userId: userId }),
      Transaction.deleteMany({ userId: userId, transactionType: TransactionTypes.INCOME }),
    ]);

    return ApiResponse(res, 200, null, 'All incomes deleted successfully');
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

const DownloadIncome = async (req, res) => {
  try {
    const userId = req.user.id;
    let { startDate, endDate } = req.query;

    // ---- Base filter ----
    const filter = { userId: userId };

    // ---- If dates NOT provided → auto set ----
    if (!startDate || !endDate) {
      const firstIncome = await Income.findOne({ userId })
        .sort({ date: 1 }) // oldest first
        .select('date')
        .limit(1);

      const lastIncome = await Income.findOne({ userId })
        .sort({ date: -1 })
        .select('date')
        .limit(1);

      startDate = firstIncome?.date || new Date(); // fallback if no data
      endDate = lastIncome?.date || new Date();
    }

    // ---- Apply date filter ----
    filter.date = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };

    // Fetch income data based on filter
    const incomes = await Income.find(filter).sort({
      date: 1,
    });

    if (!incomes) {
      return ApiResponse(res, 404, null, 'No incomes found');
    }

    //--------- create pdf ---------

    return GenerateIncomePDF(res, {
      title: 'Income_Report',
      data: incomes,
      startDate,
      endDate,
      formatDate,
    });
  } catch (error) {
    console.log('Error in download pdf', error);
    return ApiError(res, 500, null, error.message, error);
  }
};

export {
  AddIncome,
  GetAllIncome,
  DeleteIncome,
  DownloadIncome,
  DeleteAllIncome,
  EditIncome,
  GetSingleIncome,
};
