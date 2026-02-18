const ApiError = (res, statusCode, data = null, message = 'Something went wrong', error) => {
  return res.status(statusCode).json({
    success: false,
    data: data,
    message: message,
    error: error.stack.split('\n'),
  });
};

export default ApiError;
