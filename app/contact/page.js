import React from 'react';
import { ContactPage } from '@/components/pages/contact/ContactPage';
import { contactData } from '@/data/contactData';

export const metadata = {
    title: 'Contact Us | Maurya Tech',
    description: 'Get in touch with our team to discuss your project requirements or partnership opportunities.',
}

export default function Contact() {
    return <ContactPage contactData={contactData} />;
}
