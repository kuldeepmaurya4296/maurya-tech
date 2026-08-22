import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

/**
 * Page chrome only. Titles and meta tags come from each route's Next.js
 * Metadata export - a client component rewriting document.title after
 * hydration would only overwrite what the server already rendered.
 */
export const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16 md:pt-20">{children}</main>
      <Footer />
    </div>
  );
};
