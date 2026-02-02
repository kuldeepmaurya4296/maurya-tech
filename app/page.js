import React from 'react';
import { HomePage } from '@/components/pages/home/HomePage';
import { homeData } from '@/data/homeData';
import { clientData } from '@/data/clientData';

export const metadata = {
  title: 'Maurya Tech | Enterprise Software Solutions',
  description: 'Building the future of enterprise technology with scalable, secure, and high-performance software solutions.',
}

export default function Index() {
  return <HomePage homeData={homeData} clientData={clientData} />;
}
