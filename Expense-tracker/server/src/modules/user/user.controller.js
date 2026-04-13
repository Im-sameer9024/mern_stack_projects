import ApiError from '../../shared/utils/apiError.js';
import ApiResponse from '../../shared/utils/apiResponse.js';
import { cookieOptions } from '../../shared/utils/constants.js';
import mailSender from '../../shared/utils/mailSender.js';
import { AccessTokenGenerator, RefreshTokenGenerator } from '../../shared/utils/tokenGenerator.js';
import User from './user.schema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { resetPasswordEmailTemplate } from '../../shared/mail-templates/resetPasswordEmailTemplate .js';
import { passwordResetSuccessTemplate } from '../../shared/mail-templates/passwordResetSuccessTemplate .js';
import { registerEmailTemplate } from '../../shared/mail-templates/registerEmailTemplate.js';

const SignUp = async (req, res) => {
  try {
    const { name, email, password } = req.validatedData;

    const user = await User.findOne({
      email: email,
    }).lean();

    if (user) {
      return ApiResponse(res, 400, null, 'User already Registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const avatarUrl = `https://api.dicebear.com/9.x/initials/svg?seed=${name}`;

    const newUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
      avatarUrl: avatarUrl,
    });

    const finalUser = await User.findById(newUser._id).select('-password');

    ApiResponse(res, 201, finalUser, 'User Created Successfully');
    await mailSender(email, 'Welcome To Expense Tracker', registerEmailTemplate(name));
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

const LogIn = async (req, res) => {
  try {
    const { email, password } = req.validatedData;

    const user = await User.findOne({
      email: email,
    });

    if (!user) {
      return ApiResponse(res, 400, null, 'User not Registered');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    const randomByte = crypto.randomBytes(16).toString('hex');

    const payload = {
      id: user._id,
      email: user.email,
      name: user.name,
    };
    const createdUser = await User.findById(user._id).select('-password');
    if (isPasswordValid) {
      const accessToken = await AccessTokenGenerator(payload);
      const refreshToken = await RefreshTokenGenerator(payload);

      res.cookie('refreshToken', refreshToken, cookieOptions);

      await user.save();

      return ApiResponse(
        res,
        201,
        { createdUser, accessToken, randomByte },
        'User Logged In Successfully'
      );
    } else {
      return ApiResponse(res, 400, null, 'Invalid password');
    }
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

const RefreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return ApiResponse(res, 401, null, 'Unauthorized User');
    }

    // Verify refresh token
    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (error) {
      return ApiResponse(res, 401, null, 'Invalid refresh token');
    }

    // Generate new access token
    const newAccessToken = jwt.sign(
      {
        id: decoded.id,
        email: decoded.email,
        name: decoded.name,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
    );

    return ApiResponse(res, 200, { accessToken: newAccessToken }, 'Access token refreshed');
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

const LogOut = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return ApiResponse(res, 400, null, 'No refresh token found');
    }

    try {
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (error) {
      // even if invalid → clear cookie (important)
      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        path: '/', // ✅ MUST match
      });
      return ApiResponse(res, 401, null, 'Invalid refresh token');
    }

    // clear cookie ALWAYS
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      path: '/',
    });

    return ApiResponse(res, 200, null, 'Logged out successfully');
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

const ResetPasswordToken = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return ApiResponse(res, 400, null, 'Email is required');
    }

    const user = await User.findOne({
      email: email,
    });

    if (!user) {
      return ApiResponse(res, 400, null, 'User not Registered');
    }

    const uniqueToken = crypto.randomBytes(20).toString('hex');

    user.resetPasswordToken = uniqueToken;
    user.resetPasswordExpires = Date.now() + 5 * 60 * 1000; // 5 minutes

    await user.save();

    const url = `${process.env.CLIENT_URL}/reset-password-token/${uniqueToken}`;

    ApiResponse(res, 201, { email: user.email }, 'Reset Password Link Sent to your Email');

    await mailSender(
      user.email,
      'Reset Password Email',
      resetPasswordEmailTemplate(user.name, url)
    );
  } catch (error) {}
};

const ResetPassword = async (req, res) => {
  try {
    const { newPassword, confirmPassword, token } = req.validatedData;

    if (newPassword !== confirmPassword) {
      return ApiResponse(res, 400, null, 'New Password and Confirm Password do not match');
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return ApiResponse(res, 400, null, 'Token has Expired');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    ApiResponse(res, 201, { email: user.email }, 'Password Reset Successfully');

    await mailSender(
      user.email,
      'Password Reset Successfully',
      passwordResetSuccessTemplate(user.name, `${process.env.CLIENT_URL}/login}`)
    );
  } catch (error) {}
};

const GetUserDetails = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select('_id name email');

    if (!user) {
      return ApiResponse(res, 400, null, 'User not Registered');
    }

    ApiResponse(res, 201, user, 'User Details Fetched Successfully');
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

export {
  SignUp,
  LogIn,
  RefreshAccessToken,
  LogOut,
  ResetPasswordToken,
  GetUserDetails,
  ResetPassword,
};
