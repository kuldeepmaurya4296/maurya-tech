import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Project from '@/lib/models/Project';
import { verifyToken } from '@/lib/auth';
import { projects as fallbackProjects } from '@/data/projects';

export async function GET(req) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const all = searchParams.get('all') === 'true';
    const category = searchParams.get('category');

    const filter = all ? {} : { isPublished: true };
    if (category && category !== 'All') {
      filter.category = category;
    }

    const dbProjects = await Project.find(filter).sort({ order: 1, createdAt: -1 });

    if (dbProjects && dbProjects.length > 0) {
      return NextResponse.json({ success: true, projects: dbProjects });
    }

    // Safe fallback to static data
    let list = fallbackProjects.projects || [];
    if (category && category !== 'All') {
      list = list.filter((p) => p.category === category);
    }
    return NextResponse.json({ success: true, projects: list });
  } catch (error) {
    console.error('Projects fetch error:', error);
    return NextResponse.json({ success: true, projects: fallbackProjects.projects || [] });
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

    const slug =
      body.slug ||
      body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    const newProject = await Project.create({
      ...body,
      slug,
    });

    return NextResponse.json({ success: true, project: newProject }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
