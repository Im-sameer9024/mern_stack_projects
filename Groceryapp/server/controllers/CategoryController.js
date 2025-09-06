import Category from "../models/CategoryModel.js";
// import Product from "../models/ProductModel.js";
import ImageUploader from "../utils/ImageUploader.js";
import 'dotenv/config.js'

const createCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;
    const categoryImage = req.files.categoryImage;

    if (!categoryName || !categoryImage) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the required fields",
      });
    }

    const uploadImage = await ImageUploader(
      categoryImage,
      process.env.CLOUDINARY_FOLDER_NAME
    );

    console.log("upload Image",uploadImage)

    const category = await Category.create({
      categoryName: categoryName,
      image: uploadImage.secure_url,
    });

    return res.status(200).json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.log("error occur in createCategory");
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).populate("products").exec()


    return res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      categories,
    });
  } catch (error) {
    console.log("error occur in getAllCategories",error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};



export { createCategory, getAllCategories };
