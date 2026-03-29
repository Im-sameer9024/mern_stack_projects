import ms from 'ms';

const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN; // "7d"

const maxAge = ms(REFRESH_TOKEN_EXPIRES_IN);

export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax', // should be strict in production or none or lax
  maxAge,
};
