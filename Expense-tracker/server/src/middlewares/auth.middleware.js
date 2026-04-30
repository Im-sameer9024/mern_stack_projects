import jwt from 'jsonwebtoken';
import ApiError from '../shared/utils/apiError.js';
import ApiResponse from '../shared/utils/apiResponse.js';

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
      return ApiResponse(res, 401, null, 'Token not found');
    }

    const token = authHeader.replace('Bearer ', '');

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return ApiResponse(res, 401, null, 'Access token expired');
    }

    if (error.name === 'JsonWebTokenError') {
      return ApiResponse(res, 401, null, 'Invalid access token');
    }

    return ApiError(res, 500, null, error.message, error);
  }
};

export { auth };
