export const getErrorMessage = (error) => {
  let message = 'Something went wrong';
  try {
    const parsed = JSON.parse(error.response?.data?.message);
    return parsed[0]?.message || message;
  } catch {
    return error.response?.data?.message || message;
  }
};

export const maskEmail = (email) => {
  if (!email) return '';

  const [name, domain] = email.split('@');

  if (!name || !domain) return email;

  const visiblePart = name.slice(0, 3); // show first 3 letters
  const maskedPart = '*'.repeat(Math.max(name.length - 3, 3));

  return `${visiblePart}${maskedPart}@${domain}`;
};
