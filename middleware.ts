import { NextResponse, type NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const sessionCookie = req.cookies.get('admin_session');
  const path = req.nextUrl.pathname;

  if (path.startsWith('/admin') && !path.startsWith('/admin/login') && !sessionCookie) {
    const loginUrl = new URL('/admin/login', req.url);
    loginUrl.searchParams.set('from', path);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
