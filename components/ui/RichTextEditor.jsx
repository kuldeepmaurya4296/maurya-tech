'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// SSR-safe dynamic import for @uiw/react-md-editor
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
  loading: () => (
    <div className="h-64 w-full bg-slate-800 animate-pulse rounded-xl flex items-center justify-center text-slate-500 text-xs">
      Loading Rich Text Editor...
    </div>
  ),
});

export default function RichTextEditor({ value, onChange, placeholder = 'Write content in Markdown...' }) {
  return (
    <div data-color-mode="dark" className="rich-text-wrapper rounded-xl overflow-hidden border border-slate-700">
      <MDEditor
        value={value || ''}
        onChange={(val) => onChange(val || '')}
        height={320}
        preview="live"
        textareaProps={{
          placeholder,
        }}
        className="!bg-slate-800 !text-slate-100"
      />
    </div>
  );
}
