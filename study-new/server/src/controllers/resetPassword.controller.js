import crypto from 'crypto';
import ApiError from '../utils/ApiError.js';
import User from '../models/user.model.js';
import { mailSender } from '../utils/mailSender.js';
import ApiResponse from '../utils/ApiResponse.js';
import bcrypt from 'bcrypt';

//--------------reset password token -----------------------

const ResetPasswordToken = async (req, res) => {
  try {
    const { email } = req.validatedData;

    const user = await User.findOne({ email: email });

    if (!user) {
      return ApiError(res, 404, null, 'Email is not Registered');
    }

    // generate a unique token for password reset

    const token = crypto.randomBytes(20).toString('hex');

    // add token and expire time in user

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 5 * 60 * 1000; // 5 min

    await user.save();

    const url = `${process.env.CLIENT_URL}/update-password/${token}`;

    await mailSender();

    return ApiSuccess(res, 200, null, 'Reset Password Link Sent To Your Email');
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

//--------------reset password --------------------------

const ResetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.validatedData;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return ApiResponse(res, 404, null, 'Token is  has expired');
    }

    user.password = await bcrypt.hash(newPassword, 10);

    await user.save();

    await User.findByIdAndUpdate(
      user._id,
      { resetPasswordToken: null, resetPasswordExpires: null },
      { new: true }
    );

    return ApiResponse(res, 200, null, 'Password Reset Successfully');
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

export { ResetPasswordToken, ResetPassword };
