import mongoose from 'mongoose';

const subSectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    timeDuration: {
      type: String,
    },
    videoUrl: {
      type: String,
    },
    publicId: {
      type: String,
    },
  },
  { timestamps: true }
);

const SubSection = mongoose.model('SubSection', subSectionSchema);

export default SubSection;
