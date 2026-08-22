import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Analytics from '@/lib/models/Analytics';

export async function POST(req) {
  try {
    const { path, referrer } = await req.json();

    if (!path || path.startsWith('/admin') || path.startsWith('/api')) {
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
      path,
      referrer: referrer || '',
      userAgent: userAgent.slice(0, 200),
      device,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    // Non-blocking for client
    return NextResponse.json({ success: false });
  }
}
