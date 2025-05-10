import { getApi } from '@/lib/http';
import { StatisticsData } from '@/types';

export const statistics = () => {
  return getApi<StatisticsData>('/statistics', undefined, {
    next: {
      revalidate: 60 * 60 * 24,
    },
  });
};
