import {
  loginSchemaValidator,
  signupSchemaValidator,
} from "../validation/Schema.js";
import User from "../models/UserModel.js";
import Otp from "../models/OtpModel.js";
import OtpGenerator from "otp-generator";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import "dotenv/config.js";

const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email });

    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const otp = OtpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    console.log("generated otp is here", otp);

    const otpBody = await Otp.create({
      email,
      otp,
    });

    return res.status(200).json({
      success: true,
      message: "Otp sent successfully",
      otpBody,
    });
  } catch (error) {
    console.log("error occur in sendOtp controller", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const signup = async (req, res) => {
  try {
    // const validData = signupSchemaValidator.safeParse(req.body);

    // if (!validData.success) {
    //   const error = validData.error.format();
    //   return res.status(400).json({
    //     success: false,
    //     message: "Validation Failed",
    //     error: {
    //       name: error.name?._errors.join(", "),
    //       email: error.email?._errors.join(", "),
    //       password: error.password?._errors.join(", "),
    //       accountType: error.accountType?._errors.join(", "),
    //       otp: error.otp?._errors.join(", "),
    //     },
    //   });
    // }

    const { name, email, password, accountType, otp } = req.body;

    // console.log("info", name, email, password, accountType, otp);

    //check user exists

    const userExists = await User.findOne({ email: email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const recentOtp = await Otp.findOne({ email }).sort({ createdAt: -1 });

    console.log("recent opt", recentOtp);

    if (recentOtp.length === 0 || !recentOtp) {
      return res.status(403).json({
        success: false,
        message: "Otp is not found",
      });
    } else if (otp !== recentOtp.otp) {
      return res.status(403).json({
        success: false,
        message: "Otp is  Invalid",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const avatarUrl = `https://api.dicebear.com/5.x/initials/svg?seed=${name}`;

    const user = await User.create({
      name,
      email,
      image: avatarUrl,
      password: hashedPassword,
      accountType,
    });

    return res.status(200).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.log("error occur is signup controller", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const payload = {
      id: user._id,
      email: user.email,
      accountType: user.accountType,
    };

    if (await bcrypt.compare(password, user.password)) {
      const token = JWT.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      user.token = token;
      user.password = undefined;

      const options = {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "Production" ? "Strict" : "Lax",
        secure: process.env.NODE_ENV === "Production" ? true : false,
      };

      return res.cookie("token", token, options).status(200).json({
        success: true,
        message: "Login Successfully",
        data: user,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }
  } catch (error) {
    console.log("error occur in Login controller", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getLoginUserDetails = async (req, res) => {
  try {
    const token =
      req.header("Authorization")?.replace("Bearer ", "") || req.cookies?.token;

    console.log("tone is get in the Login user details", token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not Authenticated",
        user: null,
      });
    }

    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
        user: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: "User found",
      data: user,
    });
  } catch (error) {
    console.log("Error in getLoginUserDetails controller:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    // Clear the token cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "Production" ? true : false,
      sameSite: process.env.NODE_ENV === "Production" ? "Strict" : "Lax",
    });

    // Send success response
    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during logout",
    });
  }
};

export { sendOtp, signup, login, logout, getLoginUserDetails };
