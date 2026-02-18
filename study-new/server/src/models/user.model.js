import mongoose from 'mongoose';
import { availableRole } from '../utils/constants.js';

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
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
    },
    role: {
      type: String,
      required: true,
      default: 'student',
      enum: availableRole,
    },
    avatar: {
      type: String,
      required: true,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    additionalDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile',
    },
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
      },
    ],
    courseProgress: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CourseProgress',
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
