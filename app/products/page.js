import React from 'react';
import { ProductsPage } from '@/components/pages/products/ProductsPage';
import { productsData } from '@/data/productsData';

export const metadata = {
    title: 'Our Products | Maurya Tech',
    description: 'Explore our suite of enterprise-grade products designed to accelerate your business growth.',
}

export default function Products() {
    return <ProductsPage productsData={productsData} />;
}
