import { apiConnector } from '@/services/apiConnector';
import { expenseApiUrls } from '@/services/apiEndpoints';

export const expenseApiOperations = {
  GetAllExpense: async ({ page, limit, sort, category, startDate, endDate }) => {

    const params = new URLSearchParams();

    if(page) params.append('page', page);
    if(limit) params.append('limit', limit);
    if(sort) params.append('sort', sort);
    if(category) params.append('category', category);
    if(startDate) params.append('startDate', startDate);
    if(endDate) params.append('endDate', endDate);

    const response = await apiConnector({
      method: 'GET',
      url: expenseApiUrls.GET_ALL_EXPENSES(params.toString()),
    });
    return response.data;
  },
};
