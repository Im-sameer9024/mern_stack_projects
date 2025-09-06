import mongoose from "mongoose";

const UserModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      trim: true,
    },

    accountType: {
      type: String,
      required: true,
      enum: ["user", "admin"],
      default: "user",
    },
    cartItems: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
    },

    image: {
      type: String,
      trim: true,
    },
    token: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
  },
  {
    timestamps: true,
    minimize: true,
  }
);

export default mongoose.model("User", UserModel);
