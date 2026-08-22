import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/lib/models/User';
import Job from '@/lib/models/Job';
import Project from '@/lib/models/Project';
import Service from '@/lib/models/Service';
import Post from '@/lib/models/Post';
import { hashPassword, verifyToken } from '@/lib/auth';

import { jobs as initialJobs } from '@/data/jobs';
import { projects as initialProjects } from '@/data/projects';
import { services as initialServices } from '@/data/services';
import { posts as initialPosts } from '@/data/posts';

export async function POST(req) {
  try {
    await connectToDatabase();

    // 1. Seed or Update Primary Super Admin (Kuldeep Maurya)
    const adminEmail = 'kuldeepmaurya4296@gmail.com';
    const hashedPassword = await hashPassword('Kuldeep@123');
    const hashedSecurityPin = await hashPassword('638617');

    await User.findOneAndUpdate(
      { email: adminEmail },
      {
        name: 'Kuldeep Maurya',
        email: adminEmail,
        password: hashedPassword,
        securityPin: hashedSecurityPin,
        role: 'superadmin',
        failedLoginAttempts: 0,
        lockUntil: null,
      },
      { upsert: true, new: true }
    );

    // 2. Seed Jobs
    let seededJobsCount = 0;
    if (initialJobs && initialJobs.jobs) {
      for (const j of initialJobs.jobs) {
        await Job.findOneAndUpdate(
          { customId: j.id },
          {
            customId: j.id,
            title: j.title,
            department: j.department,
            location: j.location,
            type: j.type,
            experience: j.experience,
            salary: j.salary || '',
            skills: j.skills || [],
            description: j.description,
            responsibilities: j.responsibilities || [],
            requirements: j.requirements || [],
            benefits: j.benefits || [],
            isActive: j.isActive !== undefined ? j.isActive : true,
          },
          { upsert: true, new: true }
        );
        seededJobsCount++;
      }
    }

    // 3. Seed Projects
    let seededProjectsCount = 0;
    if (initialProjects && initialProjects.projects) {
      for (const p of initialProjects.projects) {
        await Project.findOneAndUpdate(
          { slug: p.slug },
          {
            customId: p.id,
            slug: p.slug,
            title: p.title,
            category: p.category,
            role: p.role,
            shortDescription: p.shortDescription,
            fullDescription: p.fullDescription,
            problem: p.problem,
            solution: p.solution,
            keyFeatures: p.keyFeatures || [],
            techStack: p.techStack || {},
            results: p.results || [],
            thumbnail: p.thumbnail,
            liveLink: p.liveLink,
            githubLink: p.githubLink,
            desktopImages: p.desktopImages || [],
            mobileImages: p.mobileImages || [],
            isFeatured: true,
            isPublished: true,
          },
          { upsert: true, new: true }
        );
        seededProjectsCount++;
      }
    }

    // 4. Seed Services
    let seededServicesCount = 0;
    if (initialServices && initialServices.services) {
      for (const s of initialServices.services) {
        await Service.findOneAndUpdate(
          { customId: s.id },
          {
            customId: s.id,
            icon: s.icon,
            title: s.title,
            shortDescription: s.shortDescription,
            fullDescription: s.fullDescription,
            features: s.features || [],
            technologies: s.technologies || [],
            isPublished: true,
          },
          { upsert: true, new: true }
        );
        seededServicesCount++;
      }
    }

    // 5. Seed Posts
    let seededPostsCount = 0;
    if (initialPosts && initialPosts.posts) {
      for (const post of initialPosts.posts) {
        await Post.findOneAndUpdate(
          { slug: post.slug },
          {
            customId: post.id,
            slug: post.slug,
            title: post.title,
            excerpt: post.excerpt,
            content: post.content,
            author: post.author,
            date: post.date,
            readTime: post.readTime,
            category: post.category,
            tags: post.tags || [],
            featured: post.featured || false,
            isPublished: true,
          },
          { upsert: true, new: true }
        );
        seededPostsCount++;
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully with primary admin and website data!',
      details: {
        adminUser: `Created/Updated ${adminEmail} with 2-step security PIN`,
        seededJobs: seededJobsCount,
        seededProjects: seededProjectsCount,
        seededServices: seededServicesCount,
        seededPosts: seededPostsCount,
      },
    });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
