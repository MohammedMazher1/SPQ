import { getApi } from '@/lib/http';

export const getStatistics = <T>(url: string) => {
  return getApi<T>(url);
};
