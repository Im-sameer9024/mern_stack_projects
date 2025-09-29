import mongoose from "mongoose";

const ProductModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    category: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
      required: true,
    },
    sizes: [
      {
        type: String,
        required: true,
      },
    ],
    bestSeller: {
      type: Boolean,
      default: false,
    },
    isStock: {
      type: Boolean,
      default: true,
    },
  },
  {
    timesStamps: true,
    minimize: true,
  }
);

ProductModel.index({
  name: 1,
});
ProductModel.index({
  description: 1,
});
ProductModel.index({
  price: 1,
});
ProductModel.index({
  category: 1,
});
ProductModel.index({
  subCategory: 1,
});

const Product = mongoose.model("Product", ProductModel);

export default Product;
