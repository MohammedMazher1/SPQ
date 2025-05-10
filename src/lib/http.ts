// import { redirect } from 'next/navigation'
import { stringifyParams } from './utils';
import { getCookies } from './actions';
import { SearchParams } from '@/types';

type Config = Omit<RequestInit, 'body'> & {
  body?: FormData | Record<string, unknown>;
};
async function http<T>(
  url: string,
  searchParams?: SearchParams,
  config?: Config,
) {
  let endpoint = process.env.NEXT_PUBLIC_BASE_URL + url;

  if (searchParams) {
    endpoint += `?${decodeURIComponent(stringifyParams(searchParams))}`;
  }

  const token = await getCookies('token');
  const local = (await getCookies('local')) ?? 'ar';
  const isFormData = config?.body instanceof FormData;

  const response = await fetch(endpoint, {
    ...config,
    body: isFormData ? (config.body as FormData) : JSON.stringify(config?.body),
    headers: {
      // "Content-Type": isFormData ? "multipart/form-data" : "application/json",
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),

      ...config?.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(local && { 'accept-language': local }),
    },
    next: { revalidate: 180 }, // Revalidate data every 60 seconds
    // cache: "force-cache", // Optional: Choose a cache strategy, e.g., 'no-store', 'force-cache', etc.
  });

  let content: unknown;
  try {
    if (!response.ok) {
      const errorResponse = await response.json();

      content = errorResponse.message || errorResponse.error;
    } else {
      content = await response.json();
    }
  } catch (error) {
    content = error;
  }
  return new Promise<T>((resolve, reject) => {
    if (response.ok) return resolve(content as T);
    reject(new Error(content as string));
  });
}

// aliases for http with methods
export function getApi<T>(
  url: string,
  searchParams?: SearchParams,
  config?: Config,
) {
  return http<T>(url, searchParams, { ...config, method: 'GET' });
}

export function putApi<T>(url: string, config?: Config) {
  return http<T>(url, undefined, { ...config, method: 'PUT' });
}

export function patchApi<T>(url: string, config?: Config) {
  return http<T>(url, undefined, { ...config, method: 'PATCH' });
}

export function postApi<T>(url: string, config?: Config) {
  return http<T>(url, undefined, { ...config, method: 'POST' });
}

export function deleteApi<T>(url: string, config?: Config) {
  return http<T>(url, undefined, { ...config, method: 'DELETE' });
}
