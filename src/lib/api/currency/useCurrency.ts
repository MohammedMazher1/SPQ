import { postApi, putApi } from '@/lib/http';
import { getApi } from '@/lib/http';
import { useMutation } from '@tanstack/react-query';
import { Currency } from '@/types';
import { toast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

// get all currencies
export const useGetCurrency = () => {
  return useQuery({
    queryKey: ['currencies'],
    queryFn: () => getApi<Currency[]>('/currency'),
  });
};

//  create currency
export const useCreateCurrency = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Currency, 'id'>) => {
      return postApi<Currency>('/currency', { body: data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currencies'] });
      toast({
        title: 'تمت الإضافة ',
        description: 'تم إضافة عملة جديدة',
        variant: 'success',
      });
    },
    // on Error and display the error to user
    onError: error => {
      toast({
        title: 'حدث خطاء',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};

// get currency by id
export const useGetCurrencyById = (id: number) => {
  return useQuery({
    queryKey: ['currency', id],
    queryFn: () => getApi<Currency>(`/currency/${id}`),
  });
};

// update currency
export const useUpdateCurrency = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Currency) => {
      return putApi(`/currency/${data.id}`, {
        body: {
          name: data.name,
          code: data.code,
        },
      });
    },
    onSuccess: (_, data) => {
      queryClient.invalidateQueries({ queryKey: ['currencies'] });
      queryClient.invalidateQueries({ queryKey: ['currency', data.id] });
      toast({
        title: 'تم التعديل ',
        description: 'تم تعديل العملة',
        variant: 'success',
      });
    },
    // on Error and display the error to user
    onError: error => {
      toast({
        title: 'حدث خطاء',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};
