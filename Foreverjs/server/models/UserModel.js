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
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin"],
      default: "user",
    },
    image: {
      type: String,
    },
  },
  {
    minimize: true,
    timestamps: true,
  }
);


const User = mongoose.model("User", UserModel);

export default User;
