import React from 'react';
import { ContactPage } from '@/components/pages/contact/ContactPage';
import { contactData } from '@/data/contactData';

export const metadata = {
    title: 'Contact Us',
    description: 'Get in Touch: Start your project with a risk-free pilot. Contact Maurya Technologies today.',
    alternates: {
        canonical: '/contact',
    },
    keywords: ['Contact Maurya Tech', 'Hire Developers', 'Software Consultation', 'Request a Quote', 'Project Inquiry'],
}

export default function Contact() {
    return <ContactPage contactData={contactData} />;
}
