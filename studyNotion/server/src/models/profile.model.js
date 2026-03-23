import mongoose from 'mongoose';
import { availableGender } from '../utils/constants.js';

const profileSchema = new mongoose.Schema(
  {
    gender: {
      type: String,
      // enum: availableGender,
    },
    dateOfBirth: {
      type: String,
    },
    about: {
      type: String,
      trim: true,
    },
    contactNumber: {
      type: String,
    },
  },
  { timestamps: true }
);

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
