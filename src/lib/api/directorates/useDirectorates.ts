import { getApi, putApi } from '@/lib/http';
import { useQuery } from '@tanstack/react-query';
import { Directorate } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { postApi } from '@/lib/http';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';

// get all directorate
export const useGetDirectorates = () => {
  return useQuery({
    queryKey: ['directorates'],
    queryFn: () =>
      getApi<Directorate[]>('/directorates', {
        include: {
          governorate: true,
        },
      }),
  });
};
// get directorate by id
export const useGetDirectorateById = (id: number) => {
  return useQuery({
    queryKey: ['directorate', id],
    queryFn: () => getApi<Directorate>(`/directorates/${id}`),
  });
};

// create directorate
export const useCreateDirectorate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      name,
      governorateId,
    }: {
      name: string;
      governorateId: string;
    }) => {
      return postApi(`/directorates`, {
        body: { name, governorateId: Number(governorateId) },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['directorates'] });
      toast({
        title: 'تمت الإضافة ',
        description: 'تم إضافة مديرية جديدة',
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

// update directorate

export const useUpdateDirectorate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      name,
      governorateId,
    }: {
      id: number;
      name: string;
      governorateId: string;
    }) => {
      return putApi(`/directorates/${id}`, {
        body: { name, governorateId: Number(governorateId) },
      });
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['directorates'] });
      queryClient.invalidateQueries({ queryKey: ['directorate', id] });
      toast({
        title: 'تم التحديث ',
        description: 'تم تحديث المديرية',
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
