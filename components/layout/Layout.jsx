import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { SEOHead } from '@/components/SEOHead';
import { seo as seoData } from '@/data/seo';



export const Layout = ({ children, page }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead page={page} />
      <Header />
      <main className="flex-1 pt-16 md:pt-20">{children}</main>
      <Footer />
    </div>
  );
};




