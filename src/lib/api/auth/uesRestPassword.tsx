import { toast } from '@/hooks/use-toast';
import { putApi } from '@/lib/http';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const useRestPassword = () => {
  const { push } = useRouter();
  return useMutation({
    mutationFn: (data: { password: string }) => {
      return putApi(`/user/Reset/Password`, { body: data });
    },
    onSuccess: () => {
      toast({
        title: '',
        description: '',
        variant: 'success',
      });
      push('/login');
    },
  });
};

export default useRestPassword;
