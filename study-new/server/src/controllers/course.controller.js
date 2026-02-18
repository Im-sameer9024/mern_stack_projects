import { courseStatus, userRoles } from '../utils/constants';
import User from '../models/user.model.js';
import ApiResponse from '../utils/ApiResponse';
import Category from '../models/category.model';
import { UploadToCloudinary } from '../utils/uploadToCloudinary';
import Course from '../models/course.model';
import ApiError from '../utils/ApiError';

const CreateCourse = async (req, res) => {
  try {
    const { title, description, whatYouWillLearn, price, category, status, tag, instructions } =
      req.body;
    const userId = req.user?._id;

    const thumbnail = req.file?.buffer;

    if (!status || status == undefined) {
      status = courseStatus.DRAFT;
    }

    // check user is a teacher

    const teacherDetail = await User.findById(userId, {
      role: userRoles.TEACHER,
    });

    if (!teacherDetail) {
      return ApiResponse(res, 403, null, 'You are not a teacher');
    }

    const categoryDetails = await Category.findById(category);

    if (!categoryDetails) {
      return ApiResponse(res, 403, null, 'Category not found');
    }

    const thumbnailImage = await UploadToCloudinary(
      thumbnail,
      String(process.env.CLOUDINARY_FOLDER_NAME_IMAGES),
      'image'
    );

    const newCourse = await Course.create({
      title: title,
      description: description,
      whatYouWillLearn: whatYouWillLearn,
      price: price,
      category: categoryDetails._id,
      tag: tag,
      thumbnail: thumbnailImage.secure_url,
      status: status,
      instructions: instructions,
    });

    // add new courses  to the user schema for teacher

    await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: {
          courses: newCourse._id,
        },
      },
      {
        new: true,
      }
    );

    // add new course in category

    await Category.findByIdAndUpdate(
      {
        _id: category,
      },
      {
        $addToSet: {
          courses: newCourse._id,
        },
      },
      {
        new: true,
      }
    );

    return ApiResponse(res, 200, newCourse, 'Course created successfully');
  } catch (error) {
    console.log(error);
    return ApiError(res, 500, null, error.message, error);
  }
};

const GetAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find(
      {},
      {
        title: true,
        description: true,
        whatYouWillLearn: true,
        price: true,
        instructions: true,
      }
    )
      .populate('instructor')
      .exec();

    return ApiResponse(res, 200, allCourses, 'All courses');
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

const GetCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.params;

    const courseDetails = await Course.findById(courseId)
      .populate({
        path: 'instructor',
        populate: {
          path: 'additionalDetails',
        },
      })
      .populate('category')
      .populate({
        path: 'courseContent',
        populate: {
          path: 'subSection',
        },
      })
      .exec();

    if (!courseDetails) {
      return ApiResponse(res, 404, null, 'Course not found');
    }

    return ApiResponse(res, 200, courseDetails, 'Course details');
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

export { CreateCourse, GetAllCourses, GetCourseDetails };
