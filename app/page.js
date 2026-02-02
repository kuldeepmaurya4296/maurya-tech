import React from 'react';
import { HomePage } from '@/components/pages/home/HomePage';
import { homeData } from '@/data/homeData';
import { clientData } from '@/data/clientData';

export const metadata = {
  title: 'Home',
  description: 'Maurya Technologies: A risk-free software development partner. We verify before you verify.',
  alternates: {
    canonical: '/',
  },
};

export default function Index() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Maurya Technologies',
    url: 'https://maurya-tech.com',
    logo: 'https://maurya-tech.com/logo.png',
    sameAs: [
      'https://twitter.com/mauryatech', // Keep placeholder if twitter not provided or remove
      'https://www.linkedin.com/company/maurya-technologies-services',
      'https://github.com/kuldeepmaurya4296',
      'https://www.facebook.com/profile.php?id=61587191439669',
      'https://www.instagram.com/maurya_tech_services/'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-6263638053',
      contactType: 'sales',
      email: 'contact@maurya-tech.com'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomePage homeData={homeData} clientData={clientData} />
    </>
  );
}
