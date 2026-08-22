import React from 'react';
import { ProductDetailPage } from '@/components/pages/products/ProductDetailPage';
import { products } from '@/data/products';

function findProduct(slug) {
  for (const category of products.categories || []) {
    const match = (category.products || []).find((p) => p.slug === slug);
    if (match) return { product: match, category };
  }
  return {};
}

// Products are static content, so every detail page can be prerendered at build
// time instead of rendered on demand.
export function generateStaticParams() {
  return (products.categories || []).flatMap((category) =>
    (category.products || []).map((p) => ({ slug: p.slug }))
  );
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { product, category } = findProduct(slug);

  if (!product) {
    return { title: 'Product Not Found' };
  }

  const description =
    product.shortDescription || product.description || products.subtitle;

  return {
    title: product.title,
    description,
    alternates: {
      canonical: `/products/${product.slug}`,
    },
    openGraph: {
      title: `${product.title} | Maurya Technologies`,
      description,
      url: `https://maurya-tech.com/products/${product.slug}`,
      type: 'website',
    },
    keywords: [
      product.title,
      `${product.title} software`,
      `${product.title} India`,
      category?.title,
      'Maurya Technologies',
    ].filter(Boolean),
  };
}

export default function ProductDetail() {
  return <ProductDetailPage />;
}
