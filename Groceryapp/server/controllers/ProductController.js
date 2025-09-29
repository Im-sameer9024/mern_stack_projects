import Product from "../models/ProductModel.js";
import Category from "../models/CategoryModel.js";
import ImageUploader from "../utils/ImageUploader.js";
import "dotenv/config.js";
import mongoose from "mongoose";

const createProduct = async (req, res) => {
  try {

    const { productName, price, quantity, about, category } = req.body;
    const image1 = req.files.productImage1;
    const image2 = req.files.productImage2;
    const image3 = req.files.productImage3;
    const image4 = req.files.productImage4;




    if (!productName || !category || !price || !quantity || !about) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }

    const categoryDetails = await Category.findById(category);

    if (!categoryDetails) {
      return res
        .status(400)
        .json({ success: false, message: "Category not found" });
    }

    const product = await Product.findOne({ productName:productName });


    if (product) {
      return res
        .status(400)
        .json({ success: false, message: "Product already exists" });
    }

    if (!image1 || !image2 || !image3 || !image4) {
      return res
        .status(400)
        .json({ success: false, message: "Please upload all the images" });
    }

    const productImg1 = await ImageUploader(
      image1,
      process.env.CLOUDINARY_FOLDER_NAME
    );


    const productImg2 = await ImageUploader(
      image2,
      process.env.CLOUDINARY_FOLDER_NAME
    );
    const productImg3 = await ImageUploader(
      image3,
      process.env.CLOUDINARY_FOLDER_NAME
    );
    const productImg4 = await ImageUploader(
      image4,
      process.env.CLOUDINARY_FOLDER_NAME
    );

    const createdProduct = await Product.create({
      productName: productName,
      price: price,
      quantity: quantity,
      category: categoryDetails._id,
      images: [
        productImg1?.secure_url,
        productImg2?.secure_url,
        productImg3?.secure_url,
        productImg4?.secure_url,
      ],
      about: about,
    });

    // console.log("createProducts",createProduct)

    await Category.findByIdAndUpdate(
      { _id: categoryDetails._id },
      {
        $push: { products: createdProduct._id },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Product created successfully",
      createdProduct,
    });
  } catch (error) {
    console.log("error occur in createProduct", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find()
      .populate("category")
      .populate("ratingAndReviews")
      .exec();

    return res.status(200).json({
      success: true,
      message: "All products fetched successfully",
      allProducts,
    });
  } catch (error) {
    console.log("error occur in getAllProducts", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getProductDetails = async (req, res) => {
  try {
    const { productId } = req.params;

    const productDetails = await Product.findById(productId)
      .populate("category")
      .populate("ratingAndReviews")
      .exec();

    if (!productDetails) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product details fetched successfully",
      productDetails,
    });
  } catch (error) {
    console.log("error occur in getProductDetails", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    // Check if categoryId is provided and not the string "undefined"
    if (!categoryId || categoryId === "undefined") {
      return res.status(400).json({
        success: false,
        message: "Category id is required",
      });
    }

    // Convert to ObjectId and query
    const products = await Product.find({
      category: categoryId,
    }).populate("category");

    // console.log(products)

    // Added populate to get category details

    // Check if products were found (empty array is still a valid response)
    if (products.length == 0) {
      return res.status(200).json({
        success: true,
        message: "No products found for this category",
        products: [], // Return empty array instead of null
      });
    }

    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    console.log("error occur in getProductsByCategory", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getBestSellerProducts = async (req, res) => {
  try {
    const products = await Product.find({})
      .populate({
        path: "ratingAndReviews",
        match: {
          rating: { $gte: "4" },
        },
      })
      .populate("category")
      .exec();

    if (!products) {
      return res.status(404).json({
        success: false,
        message: "Products not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    console.log("error occur in getBestSellerProducts", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const searchProducts = async (req, res) => {
  try {
    const { q, category } = req.query;

    const filter = {};
    if (q) {
      filter.$or = [
        { productName: { $regex: q, $options: "i" } },
        { about: { $regex: q, $options: "i" } },
      ];
    }

    if(category && mongoose.Types.ObjectId.isValid(category)){
      filter.category = category
    }

    const products = await Product.find(filter).populate("category").exec();

    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data:products,
    })

  } catch (error) {
    console.log("error occur",error)
    return res.status(500).json({
      success: false,
      message: "Internal server error",

    })
  }
};

export {
  createProduct,
  getAllProducts,
  getProductDetails,
  getProductsByCategory,
  getBestSellerProducts,
  searchProducts
};
