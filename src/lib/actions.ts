'use server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function revalidatePathAction(path: string) {
  revalidatePath(path);
}

export async function getCookies(key: string) {
  const data = (await cookies()).get(key)?.value;
  if (data) {
    return JSON.parse(data);
  }

  return null;
}

export async function deleteCookies(key: string) {
  (await cookies()).delete(key);
  return;
}

export async function setCookies(
  key: string,
  data: string | object | number,
  maxAge: number,
) {
  const serializedData = JSON.stringify(data);
  (await cookies()).set(key, serializedData, {
    maxAge,
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });

  return null;
}
