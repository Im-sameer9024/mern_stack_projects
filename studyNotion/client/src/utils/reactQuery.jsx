import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 10000 * 60 * 5, // 5 minutes
      staleTime: 1000 * 60, // 1 minute cache
      refetchOnWindowFocus: false,
      keepPreviourData: true,
    },
  },
});

export default queryClient;
