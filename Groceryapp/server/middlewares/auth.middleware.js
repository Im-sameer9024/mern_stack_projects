import JWT from "jsonwebtoken";
import "dotenv/config.js";

const auth = async (req, res, next) => {
  try {
    // console.log("error is here");
    const token =
      req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

    // console.log("token is here",token)

    if (!token) {
      res.redirect("/");
      return res.status(401).json({
        success: false,
        message: "No token found",
      });
    }

    try {
      const decoded = JWT.verify(token, process.env.JWT_SECRET);

      // console.log("decoded token is here", decoded);
      req.user = decoded;
    } catch (error) {
      console.log("error occur in auth middleware", error);
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    next();
  } catch (error) {
    console.log("error occur in auth middleware", error);
    return res.status(401).json({
      success: false,
      message: "Something went wrong while validate the token",
    });
  }
};

const isUser = async (req, res, next) => {
  try {
    if (req.user.accountType !== "user") {
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
    if (req.user.accountType !== "admin") {
      return res.status(401).json({
        success: false,
        message:
          "You are not authorized to access this route, you are not an admin",
      });
    }
    next();
  } catch (error) {
    console.log("error occur in admin middleware", error);
    return res.status(401).json({
      success: false,
      message: "Admin role cannot be verified,please try again later",
    });
  }
};

export { auth, isAdmin, isUser };
