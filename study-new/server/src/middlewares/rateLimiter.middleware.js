import rateLimit from 'express-rate-limit';

export const otpLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5,
  message: 'Too many OTP requests. Try again later.',
});

export const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 10,
  message: 'Too many login attempts. Try again later.',
});
