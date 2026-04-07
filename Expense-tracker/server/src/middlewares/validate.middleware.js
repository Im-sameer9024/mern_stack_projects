import { ZodError } from 'zod';
import ApiError from '../shared/utils/apiError.js';
import ApiResponse from '../shared/utils/apiResponse.js';

export const validate = (schema) => (req, res, next) => {
  try {
    const parsedData = schema.parse(req.body);
    req.validatedData = parsedData;
    next();
  } catch (error) {
    console.log('Error in validate middleware', error);

    if (error instanceof ZodError) {
      const formattedErrors = error.flatten().fieldErrors;

      return ApiError(
        res,
        400,
        null,
        'Validation Error',
        formattedErrors // 🔥 send structured errors
      );
    }

    return ApiError(res, 400, null, error.message, error);
  }
};
