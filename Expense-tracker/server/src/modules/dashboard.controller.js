import mongoose from 'mongoose';
import ApiError from '../shared/utils/apiError.js';
import ApiResponse from '../shared/utils/apiResponse.js';
import Income from './income/income.schema.js';
import Expense from './expense/expense.schema.js';

export const GetDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;

    const userObjectId = new mongoose.Types.ObjectId(userId);

    //------------------- IncomeData---------------------

    const incomeData = await Income.aggregate([
      {
        $match: { userId: userObjectId },
      },
      {
        $facet: {
          recent10: [{ $sort: { date: -1 } }, { $limit: 10 }],

          total: [
            {
              $group: {
                _id: null,
                total: { $sum: '$amount' },
              },
            },
          ],

          last60Days: [
            {
              $match: {
                date: { $gte: new Date(Date.now() - 60 * 86400000) },
              },
            },

            {
              $group: {
                _id: null,
                total: { $sum: '$amount' },
                data: { $push: '$$ROOT' },
              },
            },
          ],

          last30Days: [
            {
              $match: {
                date: { $gte: new Date(Date.now() - 30 * 86400000) },
              },
            },
            {
              $group: {
                _id: null,
                total: { $sum: '$amount' },
                data: { $push: '$$ROOT' },
              },
            },
          ],

          last7Days: [
            {
              $match: {
                date: { $gte: new Date(Date.now() - 7 * 86400000) },
              },
            },
            {
              $group: {
                _id: null,
                total: { $sum: '$amount' },
                data: { $push: '$$ROOT' },
              },
            },
          ],
        },
      },
    ]);

    //------------ total Income-------------

    const [recent10Incomes, totalIncomes, last60DaysIncomes, last30DaysIncomes, last7DaysIncomes] =
      await Promise.all([
        Income.aggregate([
          {
            $match: {
              userId: new mongoose.Types.ObjectId(userId),
            },
          },
          {
            $sort: {
              date: -1,
            },
          },
          {
            $limit: 10,
          },
        ]),
        Income.aggregate([
          {
            $match: {
              userId: new mongoose.Types.ObjectId(userId),
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: '$amount' },
            },
          },
          {
            $project: {
              _id: 0,
              total: 1,
            },
          },
        ]),
        Income.aggregate([
          {
            $match: {
              userId: new mongoose.Types.ObjectId(userId),
              date: {
                $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
              },
            },
          },
          {
            $sort: {
              date: -1,
            },
          },

          {
            $group: {
              _id: null,
              total: {
                $sum: '$amount',
              },
              data: {
                $push: {
                  date: '$date',
                  amount: '$amount',
                  source: '$source',
                  icon: '$icon',
                },
              },
            },
          },
        ]),
        Income.aggregate([
          {
            $match: {
              userId: new mongoose.Types.ObjectId(userId),
              date: {
                $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
              },
            },
          },
          {
            $sort: {
              date: -1,
            },
          },

          {
            $group: {
              _id: null,
              total: {
                $sum: '$amount',
              },
              data: {
                $push: {
                  date: '$date',
                  amount: '$amount',
                  source: '$source',
                  icon: '$icon',
                },
              },
            },
          },
        ]),
        Income.aggregate([
          {
            $match: {
              userId: new mongoose.Types.ObjectId(userId),
              date: {
                $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
              },
            },
          },
          {
            $sort: {
              date: -1,
            },
          },

          {
            $group: {
              _id: null,
              total: {
                $sum: '$amount',
              },
              data: {
                $push: {
                  date: '$date',
                  amount: '$amount',
                  source: '$source',
                  icon: '$icon',
                },
              },
            },
          },
        ]),
      ]);

    //----------------- total Expense-------------

    const [
      recent10Expenses,
      totalExpenses,
      last60DaysExpenses,
      last30DaysExpenses,
      last7DaysExpenses,
    ] = await Promise.all([
      Expense.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(userId),
          },
        },
        {
          $sort: {
            date: -1,
          },
        },
        {
          $limit: 10,
        },
      ]),
      Expense.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(userId),
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: '$amount' },
          },
        },
        {
          $project: {
            _id: 0,
            total: 1,
          },
        },
      ]),
      Expense.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(userId),
            date: {
              $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
            },
          },
        },
        {
          $sort: {
            date: -1,
          },
        },

        {
          $group: {
            _id: null,
            total: {
              $sum: '$amount',
            },
            data: {
              $push: {
                date: '$date',
                amount: '$amount',
                category: '$category',
                icon: '$icon',
              },
            },
          },
        },
      ]),
      Expense.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(userId),
            date: {
              $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            },
          },
        },
        {
          $sort: {
            date: -1,
          },
        },

        {
          $group: {
            _id: null,
            total: {
              $sum: '$amount',
            },
            data: {
              $push: {
                date: '$date',
                amount: '$amount',
                category: '$category',
                icon: '$icon',
              },
            },
          },
        },
      ]),
      Expense.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(userId),
            date: {
              $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            },
          },
        },
        {
          $sort: {
            date: -1,
          },
        },

        {
          $group: {
            _id: null,
            total: {
              $sum: '$amount',
            },
            data: {
              $push: {
                date: '$date',
                amount: '$amount',
                category: '$category',
                icon: '$icon',
              },
            },
          },
        },
      ]),
    ]);

    const TotalBalance = totalIncomes[0]?.total - totalExpenses[0]?.total;
    const last60DaysBalance = last60DaysIncomes[0]?.total - last60DaysExpenses[0]?.total;
    const last30DaysBalance = last30DaysIncomes[0]?.total - last30DaysExpenses[0]?.total;
    const last7DaysBalance = last7DaysIncomes[0]?.total - last7DaysExpenses[0]?.total;

    const finalData = {
      total: {
        totalBalance: TotalBalance,
        totalIncomes: totalIncomes[0]?.total,
        totalExpenses: totalExpenses[0]?.total,
        recent10Incomes: recent10Incomes,
        recent10Expenses: recent10Expenses,
      },
      last60Days: {
        totalBalance: last60DaysBalance,
        totalIncomes: last60DaysIncomes[0]?.total,
        totalExpenses: last60DaysExpenses[0]?.total,
        last60DaysIncomes: last60DaysIncomes[0]?.data,
        last60DaysExpenses: last60DaysExpenses[0]?.data,
      },
      last30Days: {
        totalBalance: last30DaysBalance,
        totalIncomes: last30DaysIncomes[0]?.total,
        totalExpenses: last30DaysExpenses[0]?.total,
        last30DaysIncomes: last30DaysIncomes[0]?.data,
        last30DaysExpenses: last30DaysExpenses[0]?.data,
      },
      last7Days: {
        totalBalance: last7DaysBalance,
        totalIncomes: last7DaysIncomes[0]?.total,
        totalExpenses: last7DaysExpenses[0]?.total,
        last7DaysIncomes: last7DaysIncomes[0]?.data,
        last7DaysExpenses: last7DaysExpenses[0]?.data,
      },
    };

    return ApiResponse(res, 200, incomeData, 'Dashboard Data Fetched Successfully');
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};
