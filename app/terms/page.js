import React from 'react';
import { TermsPage } from '@/components/pages/terms/TermsPage';

export const metadata = {
  title: 'Terms of Service',
  description:
    'The terms and conditions governing your use of Maurya Technologies websites, products, and software development services.',
  alternates: {
    canonical: '/terms',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Terms() {
  return <TermsPage />;
}
