import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema(
  {
    sectionName: {
      type: String,
      required: true,
      trim: true,
    },
    subSections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubSection",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
    minimize: true,
  },
);

export default mongoose.model("Section", sectionSchema);
