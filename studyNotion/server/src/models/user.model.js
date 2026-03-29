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
    active: {
      type: Boolean,
      default: true,
    },
    approved: {
      type: Boolean,
      default: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    avatar_public_id: {
      type: String,
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
    cart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
      },
    ],
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

userSchema.index({ email: 1 }); // login
userSchema.index({ role: 1 }); // filter teacher/student
userSchema.index({ active: 1 }); // admin filtering
userSchema.index({ createdAt: -1 }); // newest users
userSchema.index({ _id: 1, role: 1 });
const User = mongoose.model('User', userSchema);

export default User;
