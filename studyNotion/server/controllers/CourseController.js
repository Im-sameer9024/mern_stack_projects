/* eslint-disable no-undef */
import Course from "../models/CourseModel.js";
import Category from "../models/CategoryModel.js";
import User from "../models/UserModel.js";
import uploadImageToCloudinary from "../utils/imageUploader.js";


//------------- Create Course------------

const createCourse = async (req, res) => {
  try {
    // fetch data
    const { courseName, courseDescription, whatYouWillLearn, category, price,status } = req.body;

    // get thumbnail
    const thumbnail = req.files.thumbnailImage;

    if (!req.files || !req.files.thumbnailImage) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    console.log("thumbnail is here",thumbnail);

    // validation for fields

    if (!courseName || !courseDescription || !whatYouWillLearn || !category || !price) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    // check for instructor to store instructor id

    const userId = req.user.id;

    if(!status || status === undefined){
      status = "Draft"
    }

    const instructorDetails = await User.findById(userId,{
      accountType:"Instructor"
    });

    if (!instructorDetails) {
      return res.status(400).json({
        success: false,
        message: "Instructor not found",
      });
    }

    const categoryDetails = await Category.findById(category);

    if (!categoryDetails) {
      return res.status(400).json({
        success: false,
        message: "Category not found",
      });
    }

    // upload image to cloudinary
    const thumbnailUrl = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

    console.log("thumbnail url", thumbnailUrl)

    // create course entry in DB

    const newCourse = await Course.create({
      courseName,
      courseDescription,
      whatYouWillLearn,
      category: categoryDetails._id,
      thumbnail: thumbnailUrl.secure_url,
      price,
      instructor: instructorDetails._id,
      status:status,
      // instructions:instructions,
    });

    // add course to instructor's courses array

    await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true },
    );

    //update the category schema with the course id

    await Category.findByIdAndUpdate(
      { _id: categoryDetails._id },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true },
    );

    return res.status(200).json({
      status: "success",
      message: "course created successfully",
      newCourse,
    });
  } catch (error) {
    console.log("error occur in create course controller",error);
    return res.status(500).json({
      status: "error",
      message: "error occur in create course controller",
    });
  }
};

//-------------- Get all courses -----------------

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({})
      .populate("instructor")
      .populate("category")
      .exec();

    return res.status(200).json({
      status: "success",
      message: "all courses",
      courses,
    });
  } catch (error) {
    console.log("error occur in get all courses controller", error);
    return res.status(500).json({
      success: false,
      message: "error occur in get all courses controller",
    });
  }
};

//---------------Get Course Details----------------

const getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;

    //-----------find the course details ------------
    const courseDetails = await Course.findById({ _id: courseId })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContext",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "course not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course details fetched successfully",
      courseDetails,
    });
  } catch (error) {
    console.log("error occur in get course details controller",error);
    return res.status(500).json({
      success: false,
      message: "error occur in get course details controller",
    });
  }
};

export { createCourse, getAllCourses, getCourseDetails };
