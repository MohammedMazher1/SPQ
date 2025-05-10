import { AppRoutes } from '@/constants/navRoutes';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { match } from 'path-to-regexp';
import { SearchParams } from '@/types';
import qs from 'qs';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const matchUrlPath = (url: string, pathName: string) => {
  const matcher = match(url, { decode: decodeURIComponent });

  return matcher(pathName);
};

export const findRoute = (pathName: string, appRoutes: AppRoutes[]) => {
  for (const route of appRoutes) {
    if (matchUrlPath(route.href, pathName)) {
      return route;
    }
  }
  return null;
};

export const stringifyParams = (params: SearchParams) => {
  return qs.stringify(params);
};
