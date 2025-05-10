import { getApi } from '@/lib/http';
import { useQuery } from '@tanstack/react-query';
import { SearchParams } from '@/types';
import { User } from '@/types';

type Item = {
  productName: string;
  storeName: string;
  price: string;
  quantity: number;
};
export type Order = {
  id: number;
  totalAmount: number;
  status: string;
  orderDate: string;
  discrption: string;
  paymentDate: string;
  customerName: string;
  user: User;
  items: Item[];
};
export const useStatisticsOrders = (SearchParams?: SearchParams) => {
  return useQuery({
    queryKey: ['topProducts', SearchParams],
    queryFn: () => getApi<Order[]>('/statistics/orders', SearchParams),
  });
};
