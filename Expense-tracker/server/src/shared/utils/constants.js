import ms from 'ms';

const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN; // "7d"

const maxAge = ms(REFRESH_TOKEN_EXPIRES_IN);

export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax', // should be strict in production or none or lax
  maxAge,
};

export const TransactionTypes = {
  INCOME: 'income',
  EXPENSE: 'expense',
};

export const sortTypes = {
  LATEST: 'latest',
  OLDEST: 'oldest',
  HIGHEST: 'highest',
  LOWEST: 'lowest',
};

export const TransactionEnum = Object.values(TransactionTypes);
