import { apiConnector } from '@/services/apiConnector.js';
import { transactionApiUrls } from '@/services/apiEndpoints.js';

const { GET_ALL_TRANSACTIONS } = transactionApiUrls;

export const transactionApiOperations = {
  GetAllTransactions: async ({ page, limit, sort, startDate, endDate }) => {
    const params = new URLSearchParams();

    if (page) params.append('page', page);
    if (limit) params.append('limit', limit);
    if (sort) params.append('sort', sort);
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);

    const response = await apiConnector({
      method: 'GET',
      url: GET_ALL_TRANSACTIONS(params.toString()),
    });
    return response.data;
  },
};
