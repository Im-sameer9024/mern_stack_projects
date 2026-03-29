import ApiError from '../shared/utils/apiError.js';

export const validate = (schema) => (req, res, next) => {
  try {
    const parsedData = schema.parse(req.body);
    req.validatedData = parsedData;
    next();
  } catch (error) {
    console.log('Error in validate middleware', error);
    return ApiError(res, 400, null, error.message, error);
  }
};
