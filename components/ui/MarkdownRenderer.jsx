'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

export default function MarkdownRenderer({ content, className = '' }) {
  if (!content) return null;

  return (
    <div
      className={`prose prose-slate dark:prose-invert max-w-none 
      prose-headings:font-heading prose-headings:font-bold prose-headings:text-foreground
      prose-h1:text-3xl md:prose-h1:text-4xl prose-h1:mt-8 prose-h1:mb-4
      prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-6 prose-h2:mb-3
      prose-h3:text-xl prose-h3:mt-4 prose-h3:mb-2
      prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:my-4
      prose-a:text-accent prose-a:font-medium hover:prose-a:underline
      prose-strong:text-foreground prose-strong:font-semibold
      prose-code:bg-muted prose-code:text-accent prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-code:font-mono
      prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800 prose-pre:rounded-xl prose-pre:p-4 prose-pre:overflow-x-auto
      prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:bg-muted/30 prose-blockquote:py-2 prose-blockquote:px-5 prose-blockquote:rounded-r-xl prose-blockquote:italic
      prose-ul:list-disc prose-ul:pl-6 prose-ul:my-4 prose-ul:text-muted-foreground
      prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-4 prose-ol:text-muted-foreground
      prose-li:my-1
      prose-table:border-collapse prose-table:w-full prose-table:my-6
      prose-th:border prose-th:border-border prose-th:bg-muted/50 prose-th:p-2.5 prose-th:text-left prose-th:font-semibold
      prose-td:border prose-td:border-border prose-td:p-2.5
      prose-img:rounded-xl prose-img:shadow-lg prose-img:my-6 ${className}`}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
