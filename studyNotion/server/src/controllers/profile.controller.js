import Profile from '../models/profile.model.js';
import User from '../models/user.model.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import { v2 as cloudinary } from 'cloudinary';
import { UploadImage } from '../utils/uploadToCloudinary.js';

const UpdateProfile = async (req, res) => {
  try {
    const { gender, dateOfBirth, about, contactNumber } = req.validatedData;

    const id = req.user._id;

    const userDetails = await User.findById(id);

    const profileId = userDetails.additionalDetails._id;

    const profileDetails = await Profile.findByIdAndUpdate(
      profileId,
      {
        gender: gender,
        dateOfBirth: dateOfBirth,
        about: about,
        contactNumber: contactNumber,
      },
      {
        new: true,
      }
    );

    return ApiResponse(res, 200, profileDetails, 'Profile Updated Successfully');
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

//-------------- Delete User account permanently --------------------
const DeleteUserAccount = async (req, res) => {
  try {
    const id = req.user?._id;
    const user = await User.findById(id);
    const profileId = user.additionalDetails._id;

    //delete user profile
    await Profile.findByIdAndDelete(profileId);

    //delete user
    await User.findByIdAndDelete(id);

    return ApiResponse(res, 200, null, 'User Account Deleted Successfully');
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

const GetUserDetails = async (req, res) => {
  try {
    const id = req.user?._id;
    const user = await User.findById(id).populate('additionalDetails').select('-password').exec();

    return ApiResponse(res, 200, user, 'User Details fetched successfully');
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

const UpdateProfileImage = async (req, res) => {
  try {
    const id = req.user._id;

    if (!req.file) {
      return ApiResponse(res, 400, null, 'Profile image is required');
    }

    const fileBuffer = req.file.buffer;
    const user = await User.findById(id).select('avatar_public_id').lean();

    if (!user) {
      return ApiResponse(res, 404, null, 'User not found');
    }

    const [imageUrl] = await Promise.all([
      UploadImage(req.file.buffer, process.env.CLOUDINARY_FOLDER_NAME_IMAGES, 'image'),
      // delete old image only if it exists — runs at same time as upload
      user.avatar_public_id
        ? cloudinary.uploader.destroy(user.avatar_public_id)
        : Promise.resolve(),
    ]);

    // update user model with profile image

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        avatar: imageUrl.secure_url,
        avatar_public_id: imageUrl.public_id,
      },
      { new: true, select: '-password' } // ✅ exclude password at DB level
    );

    return ApiResponse(res, 200, updatedUser, 'Profile Image Updated Successfully');
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

const GetEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate('courses').exec();

    const courses = user.courses;

    return ApiResponse(res, 200, courses, 'Courses fetched successfully');
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

export { UpdateProfile, DeleteUserAccount, GetUserDetails, UpdateProfileImage, GetEnrolledCourses };
