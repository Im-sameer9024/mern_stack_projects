import { apiConnector } from '@/services/apiConnector';
import { categoryApiUrls } from '@/services/apiEndpoints';

const {
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
  GET_ALL_CATEGORIES,
  GET_CATEGORY_DETAILS,
} = categoryApiUrls;

export const useCategoryOperations = {
  CreateCategory: async (data) => {
    const response = await apiConnector({
      method: 'POST',
      url: CREATE_CATEGORY,
      bodyData: data,
    });
    return response.data;
  },

  GetAllCategory: async () => {
    const response = await apiConnector({
      method: 'GET',
      url: GET_ALL_CATEGORIES,
    });
    return response.data;
  },
};
