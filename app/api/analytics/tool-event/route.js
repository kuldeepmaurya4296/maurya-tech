import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Analytics from '@/lib/models/Analytics';

export async function POST(req) {
  try {
    const body = await req.json();
    const { toolSlug, country = 'IN' } = body;

    if (!toolSlug) {
      return NextResponse.json({ error: 'Tool slug is required.' }, { status: 400 });
    }

    await connectToDatabase();

    await Analytics.create({
      path: `/${country.toLowerCase()}/tools/${toolSlug}`,
      eventType: 'tool_completed',
      toolSlug,
      country: country.toUpperCase(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    // Non-blocking log
    console.warn('Tool event tracking warning:', error.message);
    return NextResponse.json({ success: false }, { status: 200 });
  }
}
