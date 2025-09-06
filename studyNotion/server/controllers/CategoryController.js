import Category from "../models/CategoryModel.js";
import Course from "../models/CourseModel.js";

const createCategory = async (req, res) => {
  try {
    //--------- fetch data --------------
    const { name, description } = req.body;

    //--------validation data -------------
    if (!name || !description) {
      res.status(400).json({ success: false, message: "please fill all the fields" });
    }

    //--------create entry in DB -------------

    const categoryDetails = await Category.create({
      name: name,
      description: description,
    });

    return res.status(200).json({
      success: true,
      message: "Category created successfully",
      categoryDetails,
    });
  } catch (error) {
    console.log("error occur in createCategory controller", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const allCategories = await Category.find({}, { name: true, description: true })

    return res.status(200).json({
      success: true,
      message: "All Categories fetched successfully",
      allCategories,
    });
  } catch (error) {
    console.log("error occur in getAllCategories controller", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const categoryPageDetails = async (req, res) => {
  try {
    //---------- get categoryId-------------
    const { categoryId } = req.params;

    //---------- get category details -----------
    const selectedCategory = await Category.findById(categoryId).populate("course").exec();

    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    //----------- get different category-------------

    const otherCategories = await Category.find({ _id: { $ne: categoryId } })
      .populate("course")
      .exec();

    const topSellingCourses = await Course.find().sort({studentsEnrolled:-1}).limit(4).exec();

    return res.status(200).json({
      success:true,
      message: "Category page details fetched successfully",
     selectedCategory,
     otherCategories,
     topSellingCourses
    })


  } catch (error) {
    console.log("error in categoryPageDetails controller ",error)

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
};

export { createCategory, getAllCategories,categoryPageDetails };
