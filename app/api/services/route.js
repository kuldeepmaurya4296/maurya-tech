import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Service from '@/lib/models/Service';
import { verifyToken } from '@/lib/auth';
import { services as fallbackServices } from '@/data/services';

export async function GET(req) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const all = searchParams.get('all') === 'true';

    const filter = all ? {} : { isPublished: true };
    const dbServices = await Service.find(filter).sort({ order: 1, createdAt: -1 });

    if (dbServices && dbServices.length > 0) {
      return NextResponse.json({ success: true, services: dbServices });
    }

    return NextResponse.json({ success: true, services: fallbackServices.services || [] });
  } catch (error) {
    console.error('Services fetch error:', error);
    return NextResponse.json({ success: true, services: fallbackServices.services || [] });
  }
}

export async function POST(req) {
  try {
    const token = req.cookies.get('admin_token')?.value;
    const authUser = await verifyToken(token);
    if (!authUser) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    await connectToDatabase();

    const customId =
      body.id ||
      body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    const newService = await Service.create({
      ...body,
      customId,
    });

    return NextResponse.json({ success: true, service: newService }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
