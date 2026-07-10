import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  
  const isAuthPage = req.nextUrl.pathname.startsWith('/login');

  if (isAuthPage) {
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    return null;
  }

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  
  return null;
}

export const config = {
  matcher: ['/dashboard/:path*', '/extraction/:path*', '/tasks/:path*', '/catalog/:path*', '/reports/:path*', '/login'],
};
