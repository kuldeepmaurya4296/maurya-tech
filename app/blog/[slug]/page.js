import { notFound } from 'next/navigation';
import { BlogPostPage } from '@/components/pages/blog/BlogPostPage';
import { posts as fallbackPosts } from '@/data/posts';
import connectToDatabase from '@/lib/mongodb';
import Post from '@/lib/models/Post';

export const revalidate = 60;

async function getPostBySlug(slug) {
  try {
    await connectToDatabase();
    const post = await Post.findOneAndUpdate(
      {
        $or: [
          { slug },
          { customId: slug },
          { _id: slug.match(/^[0-9a-fA-F]{24}$/) ? slug : null },
        ],
      },
      { $inc: { viewsCount: 1 } },
      { new: true }
    );

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

  return <BlogPostPage post={post} relatedPosts={related} />;
}
