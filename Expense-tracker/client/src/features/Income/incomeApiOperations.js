import { apiConnector } from '@/services/apiConnector';
import { incomeApiUrls } from '@/services/apiEndpoints';

export const incomeApiOperations = {

  //--------------- add income ---------------
  AddIncome: async (data) => {
    const response = await apiConnector({
      method: 'POST',
      url: incomeApiUrls.ADD_INCOME,
      bodyData: data,
    });
    return response.data;
  },


  //------------------- Update income -----------------------

  UpdateIncome: async (data) => {
    const response = await apiConnector({
      method: 'PUT',
      url: incomeApiUrls.UPDATE_INCOME,
      bodyData: data,
    });
    return response.data;
  },

  //------------------- Delete income -----------------------

  DeleteIncome: async (data) => {
    const response = await apiConnector({
      method: 'DELETE',
      url: incomeApiUrls.DELETE_INCOME,
      bodyData: data,
    });
    return response.data;
  },

  //------------------- Delete all incomes -----------------------

  DeleteAllIncomes: async () => {
    const response = await apiConnector({
      method: 'DELETE',
      url: incomeApiUrls.DELETE_ALL_INCOMES,
    });
    return response.data;
  },

  //--------------------- get single income -----------------------------

  GetSingleIncome:async(incomeId) =>{
    const response = await apiConnector({
      method: 'GET',
      url: incomeApiUrls.GET_SINGLE_INCOME(incomeId),
    })
    return response.data
  },

  //--------------------- get all incomes -----------------------------
  GetAllIncomes: async ({ page, limit, sort, startDate, endDate, source }) => {
    const params = new URLSearchParams();

    if (page) params.append('page', page);
    if (limit) params.append('limit', limit);
    if (sort) params.append('sort', sort);
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    if (source) params.append('source', source);

    const response = await apiConnector({
      method: 'GET',
      url: incomeApiUrls.GET_ALL_INCOMES(params.toString()),
    });

    return response.data;
  },
};
