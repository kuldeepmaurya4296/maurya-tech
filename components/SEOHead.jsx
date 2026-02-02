"use client";
import { useEffect } from 'react';
import { seoData } from '@/data/seoData';



export const SEOHead = ({ page, title, description, keywords }) => {
  useEffect(() => {
    const pageData = page ? seoData.pages[page] : null;
    const finalTitle = title || pageData?.title || seoData.global.defaultTitle;
    const finalDescription = description || pageData?.description || seoData.global.defaultDescription;
    const finalKeywords = keywords || pageData?.keywords || seoData.global.defaultKeywords;

    document.title = finalTitle;

    // Update meta tags
    const updateMetaTag = (name, content, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    updateMetaTag('description', finalDescription);
    updateMetaTag('keywords', finalKeywords.join(', '));
    updateMetaTag('og:title', finalTitle, true);
    updateMetaTag('og:description', finalDescription, true);
    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:site_name', seoData.global.siteName, true);
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', finalTitle);
    updateMetaTag('twitter:description', finalDescription);
  }, [page, title, description, keywords]);

  return null;
};




