import mongoose from 'mongoose';
import { availableVideoStatus, videoStatus } from '../utils/constants.js';

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
    durationInSeconds: {
      type: Number,
    },
    videoUrl: {
      type: String,
    },
    video_publicId: {
      type: String,
    },
    videoStatus: {
      type: String,
      enum: availableVideoStatus,
      default: videoStatus.PROCESSING,
    },
  },
  { timestamps: true }
);

const SubSection = mongoose.model('SubSection', subSectionSchema);

export default SubSection;
