import ms from 'ms';

const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN; // "7d"

const maxAge = ms(REFRESH_TOKEN_EXPIRES_IN);

export const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'none',
  maxAge,
  path:"/"
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
