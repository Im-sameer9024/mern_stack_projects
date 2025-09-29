import "dotenv/config.js";
import jwt from "jsonwebtoken";


const auth = async (req, res, next) => {
  try {
    const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "")

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token not found",
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
    } catch (error) {
      console.log(
        "error occur in auth middleware when decode the token",
        error
      );
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }

    next();
  } catch (error) {
    console.log("error occur in auth middleware", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const isUser = async (req, res, next) => {
  try {
    if (req.user.role !== "user") {
      return res.status(401).json({
        success: false,
        message:
          "You are not authorized to access this route, you are not a user",
      });
    }
    next();
  } catch (error) {
    console.log("error occur in auth middleware", error);
    return res.status(401).json({
      success: false,
      message: "User role cannot be verified,please try again later",
    });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(401).json({
        success: false,
        message:
          "You are not authorized to access this route, you are not an admin",
      });
    }
    next();
  } catch (error) {
    console.log("error occur in auth middleware", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export { auth, isAdmin, isUser };
