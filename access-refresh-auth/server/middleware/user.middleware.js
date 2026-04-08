import JWT from "jsonwebtoken";

export const auth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      res
        .status(401)
        .json({ success: false, message: "Authorization header is missing" });
    }
    const token = authHeader.replace("Bearer ", "");
    const decoded = JWT.verify(token, process.env.JWT_SECRET_KEY);

    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return ApiResponse(res, 401, null, "Access token expired");
    }

    if (error.name === "JsonWebTokenError") {
      return ApiResponse(res, 401, null, "Invalid access token");
    }

    return ApiError(res, 500, null, error.message, error);
  }
};
