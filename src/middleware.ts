import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // const token = req.cookies.get('token');
  // const user = req.cookies.get('user');

  // if (!token || !user) {
  //   return NextResponse.redirect(new URL('/login', req.url));
  // } else if (req.nextUrl.pathname === '/') {
  //   return NextResponse.redirect(new URL('/home', req.url));
  // }
  if (req.nextUrl.pathname == '/')
    return NextResponse.redirect(new URL('/home', req.url));

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/home/:path*',
    '/customers/:path*',
    '/products/:path*',
    '/requests/:path*',
    '/families/:path*',
    '/users/:path*',
    '/setting/:path*',
    '/statistics/:path*',
  ],
};
