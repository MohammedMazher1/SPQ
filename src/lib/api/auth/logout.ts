import { postApi } from '@/lib/http';

export async function logout() {
  await postApi('/auth/logout');
}
