import { apiConnector } from '@/services/apiConnector';
import { settingApiUrls } from '@/services/apiEndpoints';

const { CHANGE_PASSWORD } = settingApiUrls;

export const settingApiOperations = {
  ChangePassword: async (data) => {
    const response = await apiConnector({
      method: 'POST',
      url: CHANGE_PASSWORD,
      bodyData: data,
    });
    return response.data;
  },
};
