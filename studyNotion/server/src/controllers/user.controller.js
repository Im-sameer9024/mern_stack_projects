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
import { mailSender } from '../utils/mailSender.js';
import { getInTouchEmailTemplate } from '../mail/templates/contactEmail.js';
import { changePasswordTemplate } from '../mail/templates/changePassword.js';

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
      return ApiResponse(res, 400, null, 'User already exist');
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

    if (password !== confirmPassword) {
      return ApiResponse(res, 400, null, 'Password and confirm password does not match');
    }

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

    if (!recentOtp) {
      return ApiResponse(res, 400, null, 'Otp not found');
    }

    const isValidOtp = await bcrypt.compare(otp, recentOtp[0].otp);
    if (!isValidOtp) {
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

    newUser.password = undefined;

    return ApiResponse(res, 200, newUser, 'User registered successfully');
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

      res.cookie('refreshToken', refreshToken, cookieOptions);

      return ApiResponse(res, 200, { createdUser, accessToken }, 'User logged in successfully');
    } else {
      return ApiResponse(res, 403, null, 'Invalid password');
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

    const newAccessToken = JWT.sign(
      {
        _id: decoded._id,
        email: decoded.email,
        role: decoded.role,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
      }
    );

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
    const { _id, email } = req.user;
    const { oldPassword, newPassword, confirmNewPassword } = req.validatedData;

    const user = await User.findById(_id);

    // compare the old password

    if (!(await bcrypt.compare(oldPassword, user.password))) {
      return ApiResponse(res, 403, null, 'Invalid Old Password');
    } else if (oldPassword === newPassword) {
      return ApiResponse(res, 403, null, 'Old password and NewPassword are same');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.save();

    // send mail
    await mailSender(
      email,
      'Password Changed Successfully',
      changePasswordTemplate(email, `${user.firstName} ${user.lastName}`)
    );

    return ApiResponse(res, 200, null, 'Password changed successfully');
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

const LogoutUser = async (req, res) => {
  try {
    res.clearCookie('refreshToken');
    return ApiResponse(res, 200, null, 'User logged out successfully');
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

const GetInTouch = async (req, res) => {
  try {
    const { firstName, lastName, email, countryCode, contactNumber, message } = req.validatedData;

    await mailSender(
      process.env.MAIL_USER,
      'Get In Touch',
      getInTouchEmailTemplate({ firstName, lastName, email, countryCode, contactNumber, message })
    );

    return ApiResponse(res, 200, null, 'Mail sent successfully , we will contact you soon');
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

export {
  SendOtp,
  RegisterUser,
  LoginUser,
  RefreshAccessToken,
  ChangePassword,
  LogoutUser,
  GetInTouch,
};
