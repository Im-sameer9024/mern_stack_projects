export const userApiUrls = {
  SIGNUP_USER: '/user/signup',
  LOGIN_USER: '/user/login',
  REFRESH_TOKEN: '/user/refresh-token',
  LOGOUT_USER: '/user/logout',
  GET_USER_DETAILS: '/user/user-details',
  UPDATE_PROFILE_IMAGE: '/user/update-image',
  DELETE_ACCOUNT: '/user/delete-account',
  FORGOT_PASSWORD_LINK: '/user/forgot-password',
  FORGOT_PASSWORD: '/user/reset-password',
};

export const expenseApiUrls = {
  ADD_EXPENSE: '/expense/add',
  UPDATE_EXPENSE: '/expense/update-expense',
  DELETE_EXPENSE: '/expense/delete',
  GET_SINGLE_EXPENSE: (expenseId) => `/expense/get-single-expense/${expenseId}`,
  GET_ALL_EXPENSES: (params) => `/expense/get-all-expenses?${params}`,
  DOWNLOAD_EXPENSES_PDF: (params) => `/expense/download-pdf?${params}`,
  DELETE_ALL_EXPENSES: '/expense/delete-all-expenses',
};

export const incomeApiUrls = {
  ADD_INCOME: '/income/add',
  DELETE_INCOME: '/income/delete',
  GET_ALL_INCOMES: (params) => `/income/get-all-incomes?${params}`,
  DOWNLOAD_INCOMES_PDF: (params) => `/income/download-pdf?${params}`,
  DELETE_ALL_INCOMES: '/income/delete-all-incomes',
  UPDATE_INCOME: '/income/update-income',
  GET_SINGLE_INCOME: (incomeId) => `/income/get-single-income/${incomeId}`,
};

export const dashboardApiUrl = {
  GET_DASHBOARD_DATA: '/dashboard/dashboard-data',
};

export const transactionApiUrls = {
  GET_ALL_TRANSACTIONS: (params) => `/transactions/get-all-transactions?${params}`,
  DOWNLOAD_TRANSACTIONS_PDF: (params) => `/transactions/download-pdf?${params}`,
  DELETE_ALL_DATA: '/transactions/delete-all-data',
};
