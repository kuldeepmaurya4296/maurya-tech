import React from 'react';
import { ProductsPage } from '@/components/pages/products/ProductsPage';
import { productsData } from '@/data/productsData';

export const metadata = {
    title: 'Products',
    description: 'Our Products: Ready-to-deploy software solutions including HRMS, CRM, and E-commerce platforms.',
    alternates: {
        canonical: '/products',
    },
    keywords: ['SaaS Products', 'HRMS Software', 'CRM Solutions', 'Business Software', 'Ready Made App'],
}

export default function Products() {
    return <ProductsPage productsData={productsData} />;
}
