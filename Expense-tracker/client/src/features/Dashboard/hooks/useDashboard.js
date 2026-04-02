import { useQuery } from '@tanstack/react-query';
import { DashboardApiOperations } from '../dashboardApiOperations';

export const useGetDashboardData = () => {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: DashboardApiOperations.GetDashboardData,
  });
};
