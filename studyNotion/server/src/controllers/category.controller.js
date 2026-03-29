import Category from '../models/category.model.js';
import Course from '../models/course.model.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';

const CreateCategory = async (req, res) => {
  try {
    const { name, description } = req.validatedData;

    const category = await Category.create({
      name,
      description,
    });

    return ApiResponse(res, 200, category, 'Category created successfully');
  } catch (error) {
    return ApiError(res, 500, error.message, error);
  }
};

const GetAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});

    const allCategoryNames = categories.map((category) => category.name);

    return ApiResponse(
      res,
      200,
      {
        allCategories: allCategoryNames,
        category: categories,
      },
      'Categories fetched successfully'
    );
  } catch (error) {
    return ApiError(res, 500, error.message, error);
  }
};

const CategoryPageDetails = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    if (!categoryId) {
      return ApiResponse(res, 400, null, 'Category Id is required');
    }

    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: 'courses',
        match: { status: 'published' }, // only include published courses
      })
      .exec();

    if (!selectedCategory) {
      return ApiResponse(res, 404, [], 'Category Data not found');
    }

    const differentCategories = await Category.find({
      _id: { $ne: categoryId },
    })
      .populate({
        path: 'courses',
        match: { status: 'published' }, // only include published courses
      })
      .exec();

    // top selling courses

    const topSellingCourses = await Course.find({
      status: 'published',
    })
      .sort({
        studentsEnrolled: -1,
      })
      .limit(10)
      .exec();

    return ApiResponse(
      res,
      200,
      {
        selectedCategory,
        differentCategories,
        topSellingCourses,
      },
      'Category page details fetched successfully'
    );
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

const UpdateCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name, description } = req.validatedData;

    console.log('categoryid ', categoryId);

    if (!categoryId) {
      return ApiResponse(res, 400, null, 'Category Id is required');
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { name, description },
      { new: true, runValidators: true } // 🔥 important
    );

    return ApiResponse(res, 200, updatedCategory, 'Category updated successfully');
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

const DeleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    if (!categoryId) {
      return ApiResponse(res, 400, null, 'Category Id is required');
    }
    const category = await Category.findByIdAndDelete(categoryId);
    return ApiResponse(res, 200, category, 'Category deleted successfully');
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

export { CreateCategory, GetAllCategories, UpdateCategory, DeleteCategory, CategoryPageDetails };
