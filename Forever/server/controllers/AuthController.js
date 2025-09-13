import Otp from "../models/OtpModel.js";
import User from "../models/UserModel.js";
import otpGenerator from "otp-generator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const checkUser = await User.findOne({ email: email });

    if (checkUser) {
      return res.status(400).json({
        success: false,
        message: "User already Registered",
      });
    }

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
      digits: true,
      alphabets: false,
    });

    console.log("otp is generator", otp);

    const otpBody = await Otp.create({
      email: email,
      otp: otp,
    });

    return res.status(200).json({
      success: true,
      message: "Otp sent successfully",
      data: otpBody,
    });
  } catch (error) {
    console.log("Error occur in sendOtp controller", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const signup = async (req, res) => {
  try {
    const { name, email, password, otp } = req.body;

    if (!email || !password || !name || !otp) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const checkUser = await User.findOne({ email: email });

    if (checkUser) {
      return res.status(400).json({
        success: false,
        message: "User already Registered",
      });
    }

    const recentOtp = await Otp.findOne({ email: email })
      .sort({ createdAt: -1 })
      .limit(1);

    if (recentOtp.otp.length == 0 || !recentOtp.otp) {
      return res.status(403).json({
        success: false,
        message: "Otp not found",
      });
    } else if (otp !== recentOtp.otp) {
      return res.status(403).json({
        success: false,
        message: "Invalid Otp",
      });
    }

    const avatarUrl = `https://api.dicebear.com/5.x/initials/svg?seed=${name}`;

    const hashedPassword = await bcrypt.hash(password, 10);

    const userRole = process.env.ADMIN_EMAIL === email ? "admin" : "user";

    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
      image: avatarUrl,
      role: userRole,
    });

    return res.status(200).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    console.log("error occur in signup controllers", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "All fields required",
      });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User is not Registered",
      });
    }

    console.log("user ", user);

    let payload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      user.password = undefined;

      console.log("password is match");
      console.log("token and the user", user);

      const options = {
        maxAge: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false,
        sameSite: process.env.NODE_ENV === "production" ? "strict" : "Lax",
      };

      return res.cookie("token", token, options).status(200).json({
        success: true,
        message: "Login successfully",
        token,
        user: user,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }
  } catch (error) {
    console.log("error");
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getLoginUserDetails = async (req, res) => {
  try {
    const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "")

    console.log("token is here",token)

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Access",
      });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decode.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User Found",
      data: user,
    });
  } catch (error) {
    console.log("Error in getLoginUserDetails", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export { sendOtp, signup, login, getLoginUserDetails };
