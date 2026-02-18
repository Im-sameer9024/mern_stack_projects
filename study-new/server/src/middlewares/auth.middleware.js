import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', ''); // access token

    if (!token) {
      return ApiResponse(res, 401, null, 'Token not found');
    }

    // verify token

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

const isStudent = async (req, res, next) => {
  try {
    const role = req.user?.role;

    if (role !== 'student') {
      return ApiResponse(res, 403, null, 'This Route is for Student only.');
    }

    next();
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

const isTeacher = async (req, res, next) => {
  try {
    const role = req.user?.role;

    if (role !== 'teacher') {
      return ApiResponse(res, 403, null, 'This Route is for Teacher only.');
    }

    next();
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const role = req.user?.role;

    if (role !== 'admin') {
      return ApiResponse(res, 403, null, 'This Route is for Admin only.');
    }

    next();
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

export { auth, isStudent, isTeacher, isAdmin };
