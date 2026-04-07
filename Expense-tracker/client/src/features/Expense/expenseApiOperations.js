import { apiConnector } from '@/services/apiConnector';
import { expenseApiUrls } from '@/services/apiEndpoints';

export const expenseApiOperations = {
  GetAllExpense: async ({ page, limit, sort, category, startDate, endDate }) => {
    const params = new URLSearchParams();

    if (page) params.append('page', page);
    if (limit) params.append('limit', limit);
    if (sort) params.append('sort', sort);
    if (category) params.append('category', category);
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);

    const response = await apiConnector({
      method: 'GET',
      url: expenseApiUrls.GET_ALL_EXPENSES(params.toString()),
    });
    return response.data;
  },

  AddExpense: async (data) => {
    const response = await apiConnector({
      method: 'POST',
      url: expenseApiUrls.ADD_EXPENSE,
      bodyData: data,
    });
    return response.data;
  },

  UpdateExpense: async (data) => {
    const response = await apiConnector({
      method: 'POST',
      url: expenseApiUrls.UPDATE_EXPENSE,
      bodyData: data,
    });
    return response.data;
  },

  
  DeleteExpense: async (data) => {
    const response = await apiConnector({
      method: 'DELETE',
      url: expenseApiUrls.DELETE_EXPENSE,
      bodyData: data,
    });

    return response.data;
  },

  GetSingleExpense: async (expenseId) => {
    const response = await apiConnector({
      method: 'GET',
      url: expenseApiUrls.GET_SINGLE_EXPENSE(expenseId),
    });
    return response.data;
  },


  DownloadExpensePdf: async ({ startDate, endDate }) => {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);

    const response = await apiConnector({
      method: 'GET',
      url: expenseApiUrls.DOWNLOAD_EXPENSES_PDF(params.toString()),
      responseType: "blob",
    });

    return response.data;
  },
};
