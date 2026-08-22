'use client';

import React from 'react';
import { Layout } from '@/components/layout';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ReadingProgress, ReadingProgressCircle } from '@/components/ReadingProgress';
import Link from 'next/link';
import MarkdownRenderer from '@/components/ui/MarkdownRenderer';
import ShareButtons from '@/components/ui/ShareButtons';

export const BlogPostPage = ({ post, relatedPosts = [] }) => {
  if (!post) {
    return null;
  }

  return (
    <Layout page="blog">
      <ReadingProgress />
      <ReadingProgressCircle />

      {/* Hero Section */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/10 to-transparent" />

        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <Link href="/blog">
              <Button variant="ghost" className="mb-6 group">
                <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                Back to Blog
              </Button>
            </Link>

            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20 hover:bg-accent/20">
              {post.category}
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {post.excerpt}
              </p>
            )}

            <div className="flex flex-wrap items-center justify-between gap-6 text-sm text-muted-foreground pb-6 border-b border-border/60">
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{post.author || 'Maurya Technologies'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(post.date || post.createdAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime || '5 min read'}</span>
                </div>
              </div>

              {/* Social Share in Hero */}
              <ShareButtons title={post.title} description={post.excerpt} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-8 md:py-12">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <MarkdownRenderer content={post.content} />
            </motion.article>

            {/* Tags & Bottom Share */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              {post.tags && post.tags.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag className="w-4 h-4 text-muted-foreground" />
                  {post.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="hover:bg-accent/10 transition-colors"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              <ShareButtons title={post.title} description={post.excerpt} />
            </motion.div>

            {/* Author Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-12 p-8 bg-gradient-to-br from-muted to-muted/50 rounded-2xl border border-border"
            >
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                  {(post.author || 'M').charAt(0)}
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg mb-2">
                    {post.author || 'Maurya Technologies Team'}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Written by software architects and engineers at Maurya Technologies. We build scalable SaaS platforms and enterprise applications.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Related Posts */}
            {relatedPosts && relatedPosts.length > 0 && (
              <div className="mt-16 pt-12 border-t border-border">
                <h2 className="font-heading font-bold text-2xl mb-8">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedPosts.map((rPost) => (
                    <Link
                      key={rPost.slug || rPost.id}
                      href={`/blog/${rPost.slug || rPost.id}`}
                      className="p-6 rounded-2xl bg-card border border-border hover:border-accent/50 transition group flex flex-col justify-between"
                    >
                      <div>
                        <Badge className="mb-3 bg-accent/10 text-accent border-accent/20">
                          {rPost.category}
                        </Badge>
                        <h3 className="font-heading font-bold text-lg group-hover:text-accent transition">
                          {rPost.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                          {rPost.excerpt}
                        </p>
                      </div>
                      <span className="text-xs text-accent font-semibold mt-4 flex items-center gap-1">
                        Read Article &rarr;
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};
