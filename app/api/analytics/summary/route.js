import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Analytics from '@/lib/models/Analytics';
import Application from '@/lib/models/Application';
import Inquiry from '@/lib/models/Inquiry';
import Job from '@/lib/models/Job';
import Project from '@/lib/models/Project';
import { verifyToken } from '@/lib/auth';

export async function GET(req) {
  try {
    const token = req.cookies.get('admin_token')?.value;
    const authUser = await verifyToken(token);
    if (!authUser) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();

    // 1. Overall counts
    const [totalViews, totalApplications, totalInquiries, totalJobs, totalProjects] = await Promise.all([
      Analytics.countDocuments(),
      Application.countDocuments(),
      Inquiry.countDocuments(),
      Job.countDocuments({ isActive: true }),
      Project.countDocuments({ isPublished: true }),
    ]);

    // 2. Recent applications
    const recentApplications = await Application.find().sort({ createdAt: -1 }).limit(5);

    // 3. Recent inquiries
    const recentInquiries = await Inquiry.find().sort({ createdAt: -1 }).limit(5);

    // 4. Top visited pages
    const topPages = await Analytics.aggregate([
      { $group: { _id: '$path', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 6 },
    ]);

    // 5. Device breakdown
    const devices = await Analytics.aggregate([
      { $group: { _id: '$device', count: { $sum: 1 } } },
    ]);

    // 6. 7-Day Views Timeline
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const timelineData = await Analytics.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          views: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        totalViews,
        totalApplications,
        totalInquiries,
        totalJobs,
        totalProjects,
      },
      topPages: topPages.map((p) => ({ path: p._id, count: p.count })),
      devices: devices.map((d) => ({ name: d._id, value: d.count })),
      timeline: timelineData.map((t) => ({ date: t._id, views: t.views })),
      recentApplications,
      recentInquiries,
    });
  } catch (error) {
    console.error('Analytics summary error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
