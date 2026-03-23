const ApiResponse = (res, statusCode, data = null, message) => {
  return res.status(statusCode).json({
    success: statusCode < 400,
    data: data,
    message: message,
  });
};

export default ApiResponse;
