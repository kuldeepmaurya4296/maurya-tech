import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Post from '@/lib/models/Post';
import { verifyToken } from '@/lib/auth';
import { posts as fallbackPosts } from '@/data/posts';

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    await connectToDatabase();

    const post = await Post.findOneAndUpdate(
      {
        $or: [
          { slug: id },
          { customId: id },
          { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null },
        ],
      },
      { $inc: { viewsCount: 1 } },
      { new: true }
    );

    if (post) {
      return NextResponse.json({ success: true, post });
    }

    const fallback = (fallbackPosts.posts || []).find((p) => p.slug === id || p.id === id);
    if (fallback) {
      return NextResponse.json({ success: true, post: fallback });
    }

    return NextResponse.json({ message: 'Post not found' }, { status: 404 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const token = req.cookies.get('admin_token')?.value;
    const authUser = await verifyToken(token);
    if (!authUser) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    await connectToDatabase();

    const updatedPost = await Post.findOneAndUpdate(
      {
        $or: [
          { slug: id },
          { customId: id },
          { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null },
        ],
      },
      body,
      { new: true }
    );

    if (!updatedPost) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, post: updatedPost });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const token = req.cookies.get('admin_token')?.value;
    const authUser = await verifyToken(token);
    if (!authUser) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await connectToDatabase();

    await Post.findOneAndDelete({
      $or: [
        { slug: id },
        { customId: id },
        { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null },
      ],
    });

    return NextResponse.json({ success: true, message: 'Post deleted successfully' });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
