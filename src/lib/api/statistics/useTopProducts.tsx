import { getApi } from '@/lib/http';
import { useQuery } from '@tanstack/react-query';
import { TopProduct } from '@/types';

export const useTopProducts = () => {
  return useQuery({
    queryKey: ['topProducts'],
    queryFn: () => getApi<TopProduct[]>(`/statistics/top-products`),
  });
};
