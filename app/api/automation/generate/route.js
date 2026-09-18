import { NextResponse } from 'next/server';
import crypto from 'crypto';
import connectToDatabase from '@/lib/mongodb';
import Post from '@/lib/models/Post';
import AutomationJob from '@/lib/models/AutomationJob';
import { verifyToken } from '@/lib/auth';
import { generateContentDraft } from '@/lib/automation/aiProvider';
import { runQualityGate } from '@/lib/content/qualityGate';

export async function POST(req) {
  try {
    const token = req.cookies.get('admin_token')?.value;
    const authUser = await verifyToken(token);
    if (!authUser) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const {
      topic,
      country = 'IN',
      category = 'Technology',
      targetKeyword = '',
      clusterType = 'spoke',
      relatedToolSlug = '',
    } = body;

    if (!topic || typeof topic !== 'string') {
      return NextResponse.json({ error: 'Topic is required.' }, { status: 400 });
    }

    await connectToDatabase();

    // 1. Generate content draft
    const draft = await generateContentDraft({
      topic,
      country,
      category,
      targetKeyword,
      clusterType,
      relatedToolSlug,
    });

    // 2. Run Quality Gate
    const quality = runQualityGate(draft);

    // 3. Save as un-published draft in Review status
    const post = await Post.create({
      ...draft,
      isPublished: false,
      status: 'review',
      qualityScore: quality.score,
      qualityChecks: quality.checks,
      author: 'Maurya Technologies AI Assisted Studio',
    });

    // 4. Record automation job history
    const jobId = `job_${crypto.randomBytes(8).toString('hex')}`;
    await AutomationJob.create({
      jobId,
      country,
      topic,
      status: 'needs_review',
      draftPostId: post._id,
      qualityScore: quality.score,
      logs: [
        `Draft generated via ${process.env.AI_PROVIDER || 'structured template'}`,
        `Quality Gate score: ${quality.score}/100`,
        `Status set to: review (human sign-off required)`,
      ],
    });

    return NextResponse.json({
      success: true,
      jobId,
      postId: post._id,
      slug: post.slug,
      qualityGate: quality,
      message: 'Article draft generated and placed in Review queue.',
    });
  } catch (error) {
    console.error('Automation generate error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error in content generation.' },
      { status: 500 }
    );
  }
}
