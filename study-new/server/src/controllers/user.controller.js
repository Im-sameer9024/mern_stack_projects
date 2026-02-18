import ApiError from '../utils/ApiError.js';
import ApiResponse from './../utils/ApiResponse.js';
import OtpGenerator from 'otp-generator';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';

import User from './../models/user.model.js';
import Otp from './../models/otp.model.js';
import Profile from '../models/profile.model.js';
import { AccessTokenGenerator, RefreshTokenGenerator } from '../utils/tokenGenerator.js';
import { cookieOptions } from '../utils/constants.js';

//-------------- Send otp controller--------------------

const SendOtp = async (req, res) => {
  try {
    //---------- fetch email and validate----------
    const { email } = req.validatedData;

    //------------ find user-----------

    const user = await User.findOne({
      email: email,
    });

    if (user) {
      return ApiResponse(res, 401, null, 'User already exist');
    }

    // generate otp

    let otp = OtpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    // Create entry in DB for otp

    await Otp.create({
      email: email,
      otp: otp,
    });

    return ApiResponse(res, 200, null, 'Otp sent successfully');
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

//----------------User Register ----------------------------

const RegisterUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword, contactNumber, role, otp } =
      req.validatedData;

    // check user

    const user = await User.findOne({
      email: email,
    });

    if (user) {
      return ApiResponse(res, 400, null, 'User already exist');
    }

    // find most recent otp

    const recentOtp = await Otp.find({
      email: email,
    })
      .sort({ createdAt: -1 })
      .limit(1);

    console.log('recent Otp ', recentOtp);

    if (!recentOtp.length) {
      return ApiResponse(res, 400, null, 'Otp not found');
    } else if (recentOtp[0].otp !== otp) {
      return ApiResponse(res, 400, null, 'Invalid otp');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const avatarUrl = `https://api.dicebear.com/9.x/initials/svg?seed=${firstName}%20${lastName}`;

    const userProfile = await Profile.create({
      gender: '',
      dateOfBirth: null,
      about: '',
      contactNumber: contactNumber,
    });

    const newUser = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
      role: role,
      avatar: avatarUrl,
      additionalDetails: userProfile._id,
    });

    const createdUser = await User.findById(newUser._id).select('-password');

    return ApiResponse(res, 200, createdUser, 'User registered successfully');
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

//-----------------User Login --------------------------------

const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.validatedData;

    // find user

    const user = await User.findOne({ email: email });

    if (!user) {
      return ApiResponse(res, 400, null, 'User not found');
    }

    // compare the password

    const payload = {
      _id: user._id,
      email: user.email,
      role: user.role,
    };

    const createdUser = await User.findById(user._id).select('-password');

    if (await bcrypt.compare(password, user.password)) {
      const accessToken = await AccessTokenGenerator(payload);
      const refreshToken = await RefreshTokenGenerator(payload);

      res.cookie('refreshToken', refreshToken, {
        ...cookieOptions,
        maxAge: parseInt(process.env.REFRESH_TOKEN_COOKIE_EXPIRE_IN),
      });

      return ApiResponse(res, 200, { createdUser, accessToken }, 'User logged in successfully');
    } else {
      return ApiResponse(res, 401, null, 'Invalid password');
    }
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

const RefreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return ApiResponse(res, 401, null, 'Refresh token not found');
    }

    const decoded = JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const newAccessToken = JWT.sign(decoded, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    });

    return ApiResponse(
      res,
      200,
      { accessToken: newAccessToken },
      'Access token refreshed successfully'
    );
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

const ChangePassword = async (req, res) => {
  try {
    const { _id } = req.user;
    const { oldPassword, newPassword, confirmNewPassword } = req.validatedData;

    await User.findByIdAndUpdate(
      _id,
      {
        password: await bcrypt.hash(newPassword, 10),
      },
      {
        new: true,
      }
    );

    // send mail

    return ApiResponse(res, 200, null, 'Password changed successfully');
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

export { SendOtp, RegisterUser, LoginUser, RefreshAccessToken, ChangePassword };
