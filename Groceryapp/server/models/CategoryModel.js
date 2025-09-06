import mongoose from "mongoose";

const CategoryModel = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
    trim: true,
  },
  image:{
    type:String,
    required:true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
},{ timestamps: true, minimize: true });

export default mongoose.model("Category", CategoryModel);
