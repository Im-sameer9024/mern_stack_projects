import ApiError from '../../shared/utils/apiError.js';
import ApiResponse from '../../shared/utils/apiResponse.js';
import { formatDate } from '../../shared/utils/helpers.js';
import { GenerateIncomePDF } from '../../shared/utils/pdfGenerators.js';
import Income from './income.schema.js';

const AddIncome = async (req, res) => {
  try {
    const { id } = req.user;
    const { icon, source, amount } = req.body;

    const newIncome = await Income.create({
      userId: id,
      icon,
      source,
      amount,
    });

    return ApiResponse(res, 201, newIncome, 'Income added successfully');
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

const GetAllIncome = async (req, res) => {
  try {
    const { id } = req.user;

    // sort = latest | oldest | highest | lowest
    let { startDate, endDate, page = 1, limit = 10, sort = 'latest', source } = req.query;

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

    // pagination

    let skip = (page - 1) * limit;

    //----- parallel queries ---------

    const [incomes, total] = await Promise.all([
      Income.find(filter).sort(sortOption).skip(skip).limit(limit),
      Income.countDocuments(filter),
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
      },
      'All incomes fetched successfully'
    );
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

const DeleteIncome = async (req, res) => {
  try {
    const { incomeId } = req.body;

    const deletedIncome = await Income.findByIdAndDelete(incomeId);

    return ApiResponse(res, 200, deletedIncome, 'Income deleted successfully');
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

const DownloadIncome = async (req, res) => {
  try {
    const userId = req.user.id;
    let { startDate, endDate } = req.query;

    // ---- Base filter ----
    const filter = { userId };

    // ---- If dates NOT provided → auto set ----
    if (!startDate || !endDate) {
      const firstIncome = await Income.findOne({ userId })
        .sort({ date: 1 }) // oldest first
        .select('date')
        .limit(1);

      startDate = firstIncome?.date || new Date(); // fallback if no data
      endDate = new Date();
    }

    // ---- Apply date filter ----
    filter.date = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };

    // Fetch income data based on filter
    const incomes = await Income.find(filter)
      .sort({
        date: -1, // Sort by date in descending order
      })
      .select('source amount date'); // Select only specific fields

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

export { AddIncome, GetAllIncome, DeleteIncome, DownloadIncome };
