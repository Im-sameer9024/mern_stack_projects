import Profile from '../models/profile.model';
import User from '../models/user.model';
import ApiError from '../utils/ApiError';
import ApiResponse from '../utils/ApiResponse';

const UpdateProfile = async (req, res) => {
  try {
    const { gender, dateOfBirth, about, contactNumber } = req.body;

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
    const user = await User.findById(id).populate('additionalDetails').exec();

    return ApiResponse(res, 200, user, 'User Details fetched successfully');
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

export { UpdateProfile, DeleteUserAccount, GetUserDetails };
