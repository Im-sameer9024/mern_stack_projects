import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    courses: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    }],
  },
  {
    timestamps: true,
    minimize: true,
  },
);

export default mongoose.model("Category", categorySchema);
