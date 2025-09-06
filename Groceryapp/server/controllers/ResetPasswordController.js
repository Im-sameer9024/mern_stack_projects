import User from "../models/UserModel.js";
import { resetPasswordTemplate } from "../templates/resetPassword.js";
import mailSender from "../utils/mailSender.js";
import bcrypt from "bcrypt";

const resetPasswordToken = async (req, res) => {
  try {
    const { email } = req.body;

    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const resetPasswordToken = crypto.randomUUID();

    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      {
        token: resetPasswordToken,
        resetPasswordExpires: Date.now() + 5 * 60 * 1000,
      },
      { new: true }
    );

    const url = `${process.env.CLIENT_URL}/update-password/${resetPasswordToken}`;

    await mailSender(email, "Reset Password", resetPasswordTemplate(url));

    return res.status(200).json({
      success: true,
      message: "Reset password link sent to your email",
      updatedUser,
    });

  } catch (error) {
    console.log("error occur in resetPasswordToken",error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const token = req.params.token;
    const {  oldPassword, password, confirmPassword } = req.body;

    if (!token || !oldPassword || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide all fields",
      });
    }

    if (oldPassword == password) {
      return res.status(400).json({
        success: false,
        message: "New password and old password is same",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and confirm password do not match",
      });
    }

    const user = await User.findOne({ token });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid token",
      });
    }

    if (user.resetPasswordExpires < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "Token has expired",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.findOneAndUpdate(
      { token: token },
      {
        password: hashedPassword,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    console.log("error occur in resetPasswordController", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export { resetPassword, resetPasswordToken };
