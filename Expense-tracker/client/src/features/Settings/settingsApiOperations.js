import { apiConnector } from '@/services/apiConnector';
import { transactionApiUrls, userApiUrls } from '@/services/apiEndpoints';

export const settingsApiOperations = {
  ClearUserData: async () => {
    const response = await apiConnector({
      method: 'DELETE',
      url: transactionApiUrls.DELETE_ALL_DATA,
    });
    return response.data;
  },

  DeleteUserAccount: async () => {
    const response = await apiConnector({
      method: 'DELETE',
      url: userApiUrls.DELETE_ACCOUNT,
    });
    return response.data;
  },
};
