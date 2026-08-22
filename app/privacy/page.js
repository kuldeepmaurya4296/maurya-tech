import React from 'react';
import { PrivacyPage } from '@/components/pages/privacy/PrivacyPage';

export const metadata = {
  title: 'Privacy Policy',
  description:
    'How Maurya Technologies collects, uses, stores, and protects your personal data across our website and services.',
  alternates: {
    canonical: '/privacy',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Privacy() {
  return <PrivacyPage />;
}
