import { apiConnector } from '@/services/apiConnector';
import { dashboardApiUrl } from '@/services/apiEndpoints';

const { GET_DASHBOARD_DATA } = dashboardApiUrl;

export const DashboardApiOperations = {
  GetDashboardData: async () => {
    const response = await apiConnector({
      method: 'GET',
      url: GET_DASHBOARD_DATA,
    });
    return response.data;
  },
};
