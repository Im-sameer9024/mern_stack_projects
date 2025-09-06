/* eslint-disable no-undef */
import Profile from "../models/ProfileModel.js";
import User from "../models/UserModel.js";
import uploadImageToCloudinary from "../utils/imageUploader.js";

//--------------- create profile---------

const createProfile = async (req, res) => {
  try {
    // get data from req.body
    const { gender, dateOfBirth, about, contactNumber } = req.body;

    // validate data
    if (!gender || !dateOfBirth || !about || !contactNumber) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    //--------------create the profile in db -----------------

    const profile = await Profile.create({
      gender,
      dateOfBirth,
      about,
      contactNumber,
    });

    //--------------update the user profile field in db -----------------

    const profileData = await User.findByIdAndUpdate(
      req.user.id,
      {
        additionalDetails: profile._id,
      },
      { new: true },
    )
      .populate("additionalDetails")
      .exec();

    return res.status(200).json({
      success: true,
      message: "Profile created successfully",
      profileData,
    });
  } catch (error) {
    console.log("error in createProfile", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//---------------- delete profile----------------

const deleteProfile = async (req, res) => {
  try {
    const id = req.user.id;

    const userDetails = await User.findById(id);

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // delete Profile

    await Profile.findOneAndDelete({ _id: userDetails.additionalDetails });

    // delete profile from User schema
    await User.findByIdAndDelete({ _id: id });

    return res.status(200).json({
      success: true,
      message: "Profile deleted successfully",
    });
  } catch (error) {
    console.log("error in deleteProfile controller", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//----------------getAllUserDetails ------------------

const getUserDetails = async (req, res) => {
  try {
    const id = req.user.id;
    const userDetails = await User.findById(id).populate("additionalDetails").exec();
    console.log(userDetails);
    res.status(200).json({
      success: true,
      message: "User Data fetched successfully",
      userDetails,
    });
  } catch (error) {
    console.log("error in getAllUserDetails controller", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//----------------updateDisplayPicture ------------------

const updateDisplayPicture = async (req, res) => {
  try {
    console.log("start");

    console.log("request is here", req.files?.displayPicture);

    if (!req.files || !req.files.displayPicture) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const displayPicture = req.files.displayPicture;

    console.log("displayPicture", displayPicture);

    const userId = req.user.id;

    console.log("userId", userId);

    const image = await uploadImageToCloudinary(displayPicture, process.env.FOLDER_NAME);
    console.log(image);
    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true },
    );

    console.log("updatedProfile", updatedProfile);

    return res.status(200).json({
      success: true,
      message: `Image Updated successfully`,
      updatedProfile,
    });
  } catch (error) {
    console.error("Error in updateDisplayPicture:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Image update failed",
      error: error.stack,
    });
  }
};

//-----------------all enrolled courses---------------------

const getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    const userDetails = await User.findOne({
      _id: userId,
    })
      .populate("courses")
      .exec();
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      });
    }
    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { createProfile, deleteProfile, getUserDetails, updateDisplayPicture, getEnrolledCourses };
