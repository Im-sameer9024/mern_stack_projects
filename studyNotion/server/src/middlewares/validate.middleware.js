import ApiError from './../utils/ApiError.js';

export const validate = (schema) => (req, res, next) => {
  try {
    const parsedData = schema.parse(req.body);

    // attach parsed data to request
    req.validatedData = parsedData;

    next();
  } catch (error) {
    console.log('Error in validate middleware', error);
    return ApiError(res, 403, null, error.message, error);
  }
};
