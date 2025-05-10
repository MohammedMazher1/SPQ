import { getApi } from '@/lib/http';
import { useQuery } from '@tanstack/react-query';
import { Role } from '@/types';

export const useGetRoles = () => {
  return useQuery({
    queryKey: ['roles'],
    queryFn: () => getApi<Role[]>('/roles'),
  });
};
