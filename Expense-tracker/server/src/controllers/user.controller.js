import User from "../models/user.schema.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/apiResponse.js";
import bcrypt from "bcrypt";
import {
  AccessTokenGenerator,
  RefreshTokenGenerator,
} from "../utils/tokenGenerator.js";
import { cookieOptions } from "../utils/constants.js";

const SignUp = async (req, res) => {
  try {
    const { name, email, password } = req.validatedData;

    const user = await User.findOne({
      email: email,
    }).lean();

    if (user) {
      return ApiResponse(res, 400, null, "User already Registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const avatarUrl = `https://api.dicebear.com/9.x/initials/svg?seed=${name}`;

    const newUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
      avatarUrl: avatarUrl,
    });

    return ApiResponse(res, 201, newUser, "User Created Successfully");
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
      return ApiResponse(res, 400, null, "User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    const payload = {
      id: user._id,
      email: user.email,
      name: user.name,
    };
    const createdUser = await User.findById(user._id).select("-password");
    if (isPasswordValid) {
      const accessToken = await AccessTokenGenerator(payload);
      const refreshToken = await RefreshTokenGenerator(payload);

      res.cookie("refreshToken", refreshToken, cookieOptions);

      user.refreshToken = refreshToken;

      await user.save();
      return ApiResponse(
        res,
        201,
        { createdUser, accessToken },
        "User Logged In Successfully",
      );
    } else {
      return ApiResponse(res, 403, null, "Invalid password");
    }
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

const RefreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return ApiResponse(res, 401, null, "Refresh token not found");
    }

    // Verify refresh token
    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (error) {
      return ApiResponse(res, 401, null, "Invalid refresh token");
    }

    // Check in DB
    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      return ApiResponse(res, 403, null, "Refresh token mismatch");
    }

    // Generate new access token
    const newAccessToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN },
    );

    return ApiResponse(
      res,
      200,
      { accessToken: newAccessToken },
      "Access token refreshed",
    );
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

const Logout = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return ApiResponse(res, 400, null, "No refresh token found");
    }

    // verify token
    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (error) {
      // even if invalid → clear cookie (important)
      res.clearCookie("refreshToken");
      return ApiResponse(res, 401, null, "Invalid refresh token");
    }

    const user = await User.findById(decoded.id);

    if (user) {
      // remove token from DB
      user.refreshToken = "";
      await user.save();
    }

    // clear cookie ALWAYS
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return ApiResponse(res, 200, null, "Logged out successfully");
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

export { SignUp, LogIn, RefreshAccessToken ,Logout};
