import mongoose from "mongoose";

const CartItemModel = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
  price: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
});

CartItemModel.pre("save", async function (next) {
  this.total = this.quantity * this.price;
  next();
});

export default mongoose.model("CartItem", CartItemModel);
