import { cache } from 'react';
import { notFound } from 'next/navigation';
import { BlogPostPage } from '@/components/pages/blog/BlogPostPage';
import { posts as fallbackPosts } from '@/data/posts';
import connectToDatabase from '@/lib/mongodb';
import Post from '@/lib/models/Post';

export const revalidate = 60;

const postFilter = (slug) => ({
  $or: [
    { slug },
    { customId: slug },
    { _id: slug.match(/^[0-9a-fA-F]{24}$/) ? slug : null },
  ],
});

/**
 * Read-only lookup, wrapped in React's `cache` so generateMetadata and the page
 * component share a single database round-trip per request instead of two.
 */
const getPostBySlug = cache(async (slug) => {
  try {
    await connectToDatabase();
    const post = await Post.findOne(postFilter(slug)).lean();

    if (post) {
      const related = await Post.find({
        _id: { $ne: post._id },
        category: post.category,
        isPublished: true,
      })
        .limit(2)
        .lean();

      return {
        post: JSON.parse(JSON.stringify(post)),
        related: JSON.parse(JSON.stringify(related)),
      };
    }
  } catch (err) {
    console.warn('MongoDB Blog post lookup fallback:', err.message);
  }

  const fallback = (fallbackPosts.posts || []).find((p) => p.slug === slug || p.id === slug);
  const related = (fallbackPosts.posts || [])
    .filter((p) => p.slug !== slug && p.category === fallback?.category)
    .slice(0, 2);

  return { post: fallback, related };
});

/**
 * The view counter is deliberately separate from the read above. It used to sit
 * inside the lookup, which ran twice per request (metadata + page), so every
 * visit was counted twice.
 */
async function recordView(slug) {
  try {
    await connectToDatabase();
    await Post.updateOne(postFilter(slug), { $inc: { viewsCount: 1 } });
  } catch (err) {
    console.warn('Blog view counter skipped:', err.message);
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { post } = await getPostBySlug(slug);

  if (!post) {
    return { title: 'Article Not Found' };
  }

  return {
    title: `${post.title} | Maurya Technologies Blog`,
    description: post.excerpt || 'Technical insights and software best practices by Maurya Technologies.',
    alternates: {
      canonical: `/blog/${post.slug || post.id}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: `https://maurya-tech.com/blog/${post.slug || post.id}`,
    },
  };
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const { post, related } = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  await recordView(slug);

  return <BlogPostPage post={post} relatedPosts={related} />;
}
