import { setCookies } from '@/lib/actions';
import { postApi } from '@/lib/http';
import { LoginResponse } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const useLogin = () => {
  const { push } = useRouter();
  const DAYS = 60 * 60 * 24 * 7; // 7 days

  const mutation = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const res = await postApi<LoginResponse>('/auth/login/platform', {
        body: data,
      });
      // if res.user is null then throw error
      if (!res.user || !res.token) {
        throw new Error('User not found');
      } else {
        await setCookies('user', res.user, DAYS);
        await setCookies('token', res.token, DAYS);
        return res;
      }
    },
    onSuccess: () => {
      push('/home');
    },
    // Optional: Add onError to handle errors
    onError: () => {
      // Handle error (e.g., show a notification)
    },
  });

  return mutation;
};

export default useLogin;
