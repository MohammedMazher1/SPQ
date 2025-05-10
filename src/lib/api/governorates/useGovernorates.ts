import { getApi, putApi } from '@/lib/http';
import { useQuery } from '@tanstack/react-query';
import { Governorate } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { postApi } from '@/lib/http';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';

// Get all governorates
export const useGetGovernorates = () => {
  return useQuery({
    queryKey: ['governorates'],
    queryFn: () => getApi<Governorate[]>('/governorates'),
  });
};

// get governorates by id
export const useGetGovernorateById = (id: number) => {
  return useQuery({
    queryKey: ['governorate', id],
    queryFn: () => getApi<Governorate>(`/governorates/${id}`),
  });
};

// create governorate
export const useCreateGovernorate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (name: string) => {
      return postApi(`/governorates`, { body: { name } });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['governorates'] });
      toast({
        title: 'تمت الإضافة ',
        description: 'تم إضافة محافظة جديدة',
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
// update governorate
export const useUpdateGovernorate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Governorate) => {
      return putApi(`/governorates/${data.id}`, { body: { name: data.name } });
    },
    onSuccess: (_, data) => {
      queryClient.invalidateQueries({ queryKey: ['governorates'] });
      queryClient.invalidateQueries({ queryKey: ['governorate', data.id] });
      toast({
        title: 'تم التعديل ',
        description: 'تم تعديل المحافظة',
        variant: 'success',
      });
    },
    onError: error => {
      toast({
        title: 'حدث خطاء',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};
