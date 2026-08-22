"use client";
import React, { createContext, useContext, useState, useMemo } from 'react';
import { home as initialHomeData } from '@/data/home';
import { about as initialAboutData } from '@/data/about';
import { services as initialServicesData } from '@/data/services';
import { posts as initialBlogData } from '@/data/posts';
import { jobs as initialJobsData } from '@/data/jobs';
import { projects as initialProjectsData } from '@/data/projects';
import { technologies as initialTechnologyData } from '@/data/technologies';
import { contacts as initialContactData } from '@/data/contacts';
import { policies as initialPolicyData } from '@/data/policies';
import { seo as initialSeoData } from '@/data/seo';
import { clients as initialClientData } from '@/data/clients';
import { advertisements as initialAdsData } from '@/data/advertisements';
import { products as initialProductsData } from '@/data/products';
import { plans as initialPricingData } from '@/data/plans';

const DataContext = createContext(undefined);

export const DataProvider = ({ children }) => {
  const [homeData, setHomeData] = useState(initialHomeData);
  const [aboutData, setAboutData] = useState(initialAboutData);
  const [servicesData, setServicesData] = useState(initialServicesData);
  const [blogData, setBlogData] = useState(initialBlogData);
  const [jobsData, setJobsData] = useState(initialJobsData);
  const [projectsData, setProjectsData] = useState(initialProjectsData);
  const [technologyData, setTechnologyData] = useState(initialTechnologyData);
  const [contactData, setContactData] = useState(initialContactData);
  const [policyData, setPolicyData] = useState(initialPolicyData);
  const [seoData, setSeoData] = useState(initialSeoData);
  const [clientData, setClientData] = useState(initialClientData);
  const [adsData, setAdsData] = useState(initialAdsData);
  const [productsData, setProductsData] = useState(initialProductsData);
  const [pricingData, setPricingData] = useState(initialPricingData);

  // Without this the value object is a new reference on every render of the
  // provider, so every consumer re-renders whenever anything above it does.
  const value = useMemo(
    () => ({
      homeData,
      setHomeData,
      aboutData,
      setAboutData,
      servicesData,
      setServicesData,
      blogData,
      setBlogData,
      jobsData,
      setJobsData,
      projectsData,
      setProjectsData,
      technologyData,
      setTechnologyData,
      contactData,
      setContactData,
      policyData,
      setPolicyData,
      seoData,
      setSeoData,
      clientData,
      setClientData,
      adsData,
      setAdsData,
      productsData,
      setProductsData,
      pricingData,
      setPricingData,
    }),
    [
      homeData,
      aboutData,
      servicesData,
      blogData,
      jobsData,
      projectsData,
      technologyData,
      contactData,
      policyData,
      seoData,
      clientData,
      adsData,
      productsData,
      pricingData,
    ]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
