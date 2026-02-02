"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { homeData as initialHomeData } from '@/data/homeData';
import { aboutData as initialAboutData } from '@/data/aboutData';
import { servicesData as initialServicesData } from '@/data/servicesData';
import { blogData as initialBlogData } from '@/data/blogData';
import { jobsData as initialJobsData } from '@/data/jobsData';
import { projectsData as initialProjectsData } from '@/data/projectsData';
import { technologyData as initialTechnologyData } from '@/data/technologyData';
import { contactData as initialContactData } from '@/data/contactData';
import { policyData as initialPolicyData } from '@/data/policyData';
import { seoData as initialSeoData } from '@/data/seoData';
import { clientData as initialClientData } from '@/data/clientData';
import { advertisementData as initialAdsData } from '@/data/advertisementData';
import { productsData as initialProductsData } from '@/data/productsData';
import { pricingData as initialPricingData } from '@/data/pricingData';



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

  return (
    <DataContext.Provider
      value={{
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
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};



