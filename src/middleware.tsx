import { p } from 'framer-motion/client';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const cookie = request.cookies.get('hash');
  if (cookie?.value === process.env.ADMIN_HASH) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL('/', request.url));
}
export const config = {
  matcher: ['/admin'],
};
