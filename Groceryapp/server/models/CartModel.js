import mongoose from "mongoose";
import CartItem from "../models/CartItemModel.js";

const CartModel = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CartItem",
      },
    ],
    subTotal: {
      type: Number,
      default: 0,
    },
    totalItems: {
      type: Number,
      default: 0,
    },
  },
  {
    minimize: true,
    timestamps: true,
  }
);



export default mongoose.model("Cart", CartModel);
