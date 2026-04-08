import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const Signup = async (req, res) => {
  try {
    const { username, email, name, password } = req.body;

    if (!username || !email || !name || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      name,
      password: hashedPassword,
    });

    const finalUser = { ...newUser._doc, password: undefined };

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: finalUser,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not Registered" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }

    const payload = {
      userId: user._id,
      email: user.email,
      name: user.name,
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    return res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      })
      .status(200)
      .json({
        success: true,
        message: "User logged in successfully",
        data: { accessToken },
      });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const RefreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return res
        .status(401)
        .json({ success: false, message: "Refresh token is required" });
    }

    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);
    } catch (error) {
      return ApiResponse(res, 401, null, "Invalid refresh token");
    }

    const newAccessToken = jwt.sign(
      {
        userId: decoded.userId,
        email: decoded.email,
        name: decoded.name,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "15m",
      },
    );

    return res.status(200).json({
      success: true,
      message: "Access token refreshed successfully",
      data: { accessToken: newAccessToken },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
const GetUser = async (req, res) => {
  try {
  } catch (error) {}
};

export { Signup, Login, RefreshToken, GetUser };
