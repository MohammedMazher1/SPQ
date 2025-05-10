import { getApi } from '@/lib/http';
import { useQuery } from '@tanstack/react-query';
import { Stats } from '@/types';

export const useHomeStatistics = () => {
  return useQuery({
    queryKey: ['homeStatistics'],
    queryFn: () => getApi<Stats>('/dashboard/stats'),
  });
};

// get last orders

export const useLastOrders = () => {
  return useQuery({
    queryKey: ['lastOrders'],
    queryFn: () => getApi<Stats>('/dashboard/lastOrders'),
    staleTime: 1000 * 60 * 60 * 24,
  });
};
