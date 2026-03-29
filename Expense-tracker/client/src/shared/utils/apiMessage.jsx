export const GetApiErrorMessage = (error) => {
  const message = error?.response?.data?.message || error?.message || 'Error Message';
  return message;
};

export const GetApiResponseMessage = (response) => {
  const message = response?.data?.message || response?.message || 'Response Message';
  return message;
};
