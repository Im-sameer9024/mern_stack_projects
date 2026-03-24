import { courseStatus, userRoles } from '../utils/constants.js';
import User from '../models/user.model.js';
import ApiResponse from '../utils/ApiResponse.js';
import Category from '../models/category.model.js';
import Course from '../models/course.model.js';
import ApiError from '../utils/ApiError.js';
import Section from '../models/section.model.js';
import SubSection from '../models/subSection.model.js';
import { UploadImage } from '../utils/uploadToCloudinary.js';
import mongoose from 'mongoose';
import { cloudinary } from '../config/cloudinary.config.js';
import CourseProgress from '../models/courseProgress.model.js';
import RatingAndReview from '../models/ratingAndReview.model.js';

const CreateCourse = async (req, res) => {
  try {
    const { title, description, whatYouWillLearn, price, category, status, tag, instructions } =
      req.validatedData;

    console.log('There is actual data', whatYouWillLearn, tag, instructions);

    const userId = req.user?._id;

    if (!req.file) {
      return ApiResponse(res, 400, null, 'Please upload a thumbnail');
    }

    const thumbnailBuffer = req.file.buffer;

    let courseStatusValue = status || courseStatus.DRAFT;

    //---------- handle multiple query in a single ------------

    const [teacherDetail, categoryDetail] = await Promise.all([
      User.findOne({
        _id: userId,
        role: userRoles.TEACHER,
      }).lean(),
      Category.findById(category).lean(),
    ]);

    if (!teacherDetail) {
      return ApiResponse(res, 403, null, 'You are not a teacher');
    }

    if (!categoryDetail) {
      return ApiResponse(res, 404, null, 'Category not found');
    }

    //--------------- upload image to cloudinary-------------
    const thumbnailImage = await UploadImage(
      thumbnailBuffer,
      process.env.CLOUDINARY_FOLDER_NAME_IMAGES,
      'image'
    );

    const session = await mongoose.startSession();
    session.startTransaction();

    const newCourse = new Course({
      title: title,
      description: description,
      whatYouWillLearn: whatYouWillLearn,
      price: Number(price),
      category: categoryDetail._id,
      tag: tag,
      thumbnail: thumbnailImage.secure_url,
      thumbnail_public_id: thumbnailImage.public_id,
      status: courseStatusValue,
      instructions: instructions,
      instructor: userId,
    });

    await newCourse.save({ session });

    // course id is here
    const courseId = newCourse._id;

    // add new courses  to the user schema for teacher

    await Promise.all([
      User.findByIdAndUpdate(
        userId,
        {
          $addToSet: {
            courses: courseId,
          },
        },
        { session }
      ),
      Category.findByIdAndUpdate(
        category,
        {
          $addToSet: {
            courses: courseId,
          },
        },
        { session }
      ),
    ]);

    await session.commitTransaction();
    session.endSession();

    return ApiResponse(res, 200, newCourse, 'Course created successfully');
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.log(error);
    return ApiError(res, 500, null, error.message, error);
  }
};

const UpdateCourse = async (req, res) => {
  try {
    const {
      courseId,
      title,
      description,
      whatYouWillLearn,
      price,
      category,
      status,
      tag,
      instructions,
    } = req.validatedData;

    const course = await Course.findById(courseId);

    if (!course) {
      return ApiResponse(res, 404, null, 'Course not found');
    }

    if (req.file) {
      const thumbnailBuffer = req.file.buffer;
      const [thumbnailImage] = await Promise.all([
        UploadImage(thumbnailBuffer, process.env.CLOUDINARY_FOLDER_NAME_IMAGES, 'image'),
        // delete old image only if it exists — runs at same time as upload
        course.thumbnail_public_id
          ? cloudinary.uploader.destroy(course.thumbnail_public_id)
          : Promise.resolve(),
      ]);
      course.thumbnail = thumbnailImage.secure_url;
      course.thumbnail_public_id = thumbnailImage.public_id;
    }

    let courseStatusValue = status || courseStatus.DRAFT;

    course.title = title;
    course.description = description;
    course.whatYouWillLearn = whatYouWillLearn;
    course.price = Number(price);
    course.category = category;
    course.status = courseStatusValue;
    course.tag = tag;
    course.instructions = instructions;

    await course.save();

    return ApiResponse(res, 200, course, 'Course updated successfully');
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

const GetAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find({})
      .select('title price thumbnail status ratingAndReview')
      .populate({ path: 'instructor', select: 'firstName lastName' })
      .populate({
        path: 'category',
        select: 'name',
      })
      .sort({
        createdAt: -1,
      })
      .lean();

    return ApiResponse(res, 200, allCourses, 'All courses');
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

const GetAllCoursesByInstructor = async (req, res) => {
  try {
    const userId = req.user?._id;

    //----------- query params------------------

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;
    const totalCourses = await Course.countDocuments({ instructor: userId });

    const courses = await Course.find({ instructor: userId })
      .populate('ratingAndReviews')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    if (!courses) {
      return ApiResponse(res, 404, null, 'No courses found');
    }

    return ApiResponse(
      res,
      200,
      {
        courses,
        pagination: {
          total: totalCourses,
          page,
          limit,
          totalPages: Math.ceil(totalCourses / limit),
        },
      },
      'All courses'
    );
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

const GetCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.params;

    if (!courseId) {
      return ApiResponse(res, 400, null, 'Course id is required');
    }

    const courseDetails = await Course.findById(courseId)
      .populate({
        path: 'instructor',
        select: 'firstName lastName email active approved avatar',
        populate: {
          path: 'additionalDetails',
          select: 'gender about contactNumber',
        },
      })
      .populate({
        path: 'category',
        select: 'name description',
      })
      .populate({
        path: 'courseContent',
        populate: {
          path: 'subSection',
        },
      })
      .lean();

    if (!courseDetails) {
      return ApiResponse(res, 404, null, 'Course not found');
    }

    return ApiResponse(res, 200, courseDetails, 'Course details');
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

const DeleteCourse = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { courseId } = req.body;

    const course = await Course.findById(courseId).session(session);

    if (!course) {
      return ApiResponse(res, 404, null, 'Course not found');
    }

    const category = await Category.findById(course.category).session(session);

    if (!category) {
      return ApiResponse(res, 404, null, 'Category not found');
    }

    // Unenroll students
    await User.updateMany(
      { _id: { $in: course.studentsEnrolled } },
      { $pull: { courses: courseId } },
      { session }
    );

    await User.updateOne({ _id: course.instructor }, { $pull: { courses: courseId } }, { session });

    const sectionsIds = course.courseContent;

    const sections = await Section.find({
      _id: { $in: sectionsIds },
    }).session(session);

    const subSectionsIds = sections.flatMap((sec) => sec.subSection);

    await Promise.all([
      SubSection.deleteMany({ _id: { $in: subSectionsIds } }, { session }),
      Section.deleteMany({ _id: { $in: sectionsIds } }, { session }),
      Course.findByIdAndDelete(courseId).session(session),
      Category.findByIdAndUpdate(
        category._id,
        { $pull: { courses: courseId } },
        { new: true, session }
      ),
      CourseProgress.deleteMany({ courseId }, { session }),
      RatingAndReview.deleteMany({ course: courseId }, { session }),
    ]);

    await session.commitTransaction();
    session.endSession();

    return ApiResponse(res, 200, null, 'Course deleted successfully');
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    return ApiError(res, 500, null, error.message, error);
  }
};

const UpdateCourseStatus = async (req, res) => {
  try {
    const { status, courseId } = req.body;

    if (!status) {
      return ApiResponse(res, 400, null, 'Status is required');
    }

    if (!courseId) {
      return ApiResponse(res, 400, null, 'Course id is required');
    }

    const course = await Course.findByIdAndUpdate(courseId, { status }, { new: true }).lean();

    if (!course) {
      return ApiResponse(res, 404, null, 'Course not found');
    }

    const mess =
      status === 'published' ? 'Course published successfully' : 'Course draft successfully';

    return ApiResponse(res, 200, course, mess);
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

export {
  CreateCourse,
  GetAllCourses,
  GetCourseDetails,
  GetAllCoursesByInstructor,
  UpdateCourse,
  DeleteCourse,
  UpdateCourseStatus,
};
