import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Analytics from '@/lib/models/Analytics';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';

export async function POST(req) {
  try {
    const clientIp = getClientIp(req);

    // 1. Strict Filter: Ignore localhost, local loopback, and development environments
    const host = req.headers.get('host') || '';
    const origin = req.headers.get('origin') || '';
    const isLocalhost =
      clientIp === '127.0.0.1' ||
      clientIp === '::1' ||
      clientIp === '::ffff:127.0.0.1' ||
      host.includes('localhost') ||
      host.includes('127.0.0.1') ||
      origin.includes('localhost') ||
      origin.includes('127.0.0.1') ||
      process.env.NODE_ENV !== 'production';

    if (isLocalhost) {
      return NextResponse.json({ success: true, ignored: true, reason: 'localhost_bypassed' });
    }

    // 2. Rate Limiting: 60 views per IP per 5 minutes
    if (!checkRateLimit(`track-${clientIp}`, 60, 5 * 60 * 1000).isAllowed) {
      return NextResponse.json({ success: true, ignored: true, reason: 'rate_limited' });
    }

    const { path, referrer } = await req.json();

    if (
      typeof path !== 'string' ||
      !path.startsWith('/') ||
      path.startsWith('/admin') ||
      path.startsWith('/api')
    ) {
      return NextResponse.json({ success: true, ignored: true });
    }

    // 3. Ignore if referrer points to localhost
    if (typeof referrer === 'string' && (referrer.includes('localhost') || referrer.includes('127.0.0.1'))) {
      return NextResponse.json({ success: true, ignored: true });
    }

    const userAgent = req.headers.get('user-agent') || '';
    const isMobile = /mobile/i.test(userAgent);
    const isTablet = /tablet|ipad/i.test(userAgent);

    let device = 'Desktop';
    if (isMobile) device = 'Mobile';
    else if (isTablet) device = 'Tablet';

    await connectToDatabase();

    await Analytics.create({
      path: path.slice(0, 200),
      referrer: typeof referrer === 'string' ? referrer.slice(0, 200) : '',
      userAgent: userAgent.slice(0, 200),
      device,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    // Non-blocking for client
    return NextResponse.json({ success: false });
  }
}
