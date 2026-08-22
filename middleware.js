import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-maurya-tech-2026-production-secure';
const secretKey = new TextEncoder().encode(JWT_SECRET);

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const method = request.method;

  // 1. Enterprise Anti-CSRF & Origin Verification on API Mutations
  if (pathname.startsWith('/api/')) {
    const isMutation = ['POST', 'PUT', 'DELETE', 'PATCH'].includes(method);
    if (isMutation) {
      const origin = request.headers.get('origin');
      const host = request.headers.get('host');
      const secFetchSite = request.headers.get('sec-fetch-site');

      // Reject cross-site mutation requests (CSRF Defense)
      if (secFetchSite && secFetchSite === 'cross-site') {
        return NextResponse.json(
          { success: false, message: 'Cross-origin API mutation blocked by security policy.' },
          { status: 403 }
        );
      }

      // Check matching origin if provided
      if (origin && host) {
        try {
          const originHost = new URL(origin).host;
          if (originHost !== host) {
            return NextResponse.json(
              { success: false, message: 'Untrusted origin request blocked.' },
              { status: 403 }
            );
          }
        } catch (e) {
          // Invalid origin header
          return NextResponse.json(
            { success: false, message: 'Invalid origin header.' },
            { status: 400 }
          );
        }
      }
    }
  }

  // 2. Protect /admin routes, excluding /admin/login
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      await jwtVerify(token, secretKey);
      return NextResponse.next();
    } catch (err) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 3. Redirect /admin/login to /admin if already authenticated
  if (pathname === '/admin/login') {
    const token = request.cookies.get('admin_token')?.value;
    if (token) {
      try {
        await jwtVerify(token, secretKey);
        return NextResponse.redirect(new URL('/admin', request.url));
      } catch (err) {
        // Token invalid, let proceed to login
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
};
