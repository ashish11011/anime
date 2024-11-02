import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
export function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname;

  if (url.startsWith('/admin') && url !== '/adminlogin') {
    const cookie = request.cookies.get('hash');
    if (cookie?.value === process.env.ADMIN_HASH) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/', request.url));
  }
  try {
    const isStaticAsset =
      url.startsWith('/_next/static') ||
      url === '/favicon.ico' ||
      url === '/api/trackAnalytics';

    if (!isStaticAsset) {
      const referrer = request.headers.get('referer') || 'Direct';
      const userAgent: any = request.headers.get('user-agent');
      const ip =
        request.headers.get('x-forwarded-for') || request.ip || 'Unknown';

      const deviceType = /Windows/.test(userAgent)
        ? 'Windows'
        : /Mac/.test(userAgent)
          ? 'MacOS'
          : /iPhone/.test(userAgent)
            ? 'iPhone'
            : /Android/.test(userAgent)
              ? 'Android'
              : 'Unknown';

      console.log('Analytics entry created:', url, referrer, deviceType, ip);

      try {
        fetch(`https://www.cozzycorner.in//api/trackAnalytics`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url, referrer, deviceType, ip }),
        });
      } catch (error) {
        console.log('fetch request failed:', error);
      }
    }
  } catch (error) {
    console.log('Middleware Error tracking analytics:', error);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/category/:path*',
    '/product/:path*',
    '/series/:path*',
    '/admin/:path*',
    '/searchproduct',
    '/orders',
    '/contact-us',
    '/about-us',
    '/cart',
  ],
};
