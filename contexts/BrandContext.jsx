"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { brandData as initialBrandData } from '@/data/brandData';

const BrandContext = createContext(undefined);

export const BrandProvider = ({ children }) => {
  const [brandData, setBrandData] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('brand-config');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return initialBrandData;
        }
      }
    }
    return initialBrandData;
  });

  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('theme-mode');
      if (savedMode) return savedMode === 'dark';
    }
    return brandData.theme.defaultMode === 'dark';
  });

  // Apply brand colors and theme
  useEffect(() => {
    const root = document.documentElement;

    // Set dark/light mode
    if (isDarkMode) {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'engineer-dark');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', brandData.theme.currentThemeId);
    }

    localStorage.setItem('theme-mode', isDarkMode ? 'dark' : 'light');

    // Apply custom brand colors if they differ from theme
    root.style.setProperty('--brand-primary', brandData.colors.primary);
    root.style.setProperty('--brand-accent', brandData.colors.accent);
  }, [isDarkMode, brandData.colors, brandData.theme.currentThemeId]);

  // Persist brand data
  useEffect(() => {
    localStorage.setItem('brand-config', JSON.stringify(brandData));
  }, [brandData]);

  const updateBrandField = (field, value) => {
    setBrandData(prev => ({
      ...prev,
      [field]: value,
      meta: {
        ...prev.meta,
        lastUpdated: new Date().toISOString(),
      },
    }));
  };

  const toggleThemeMode = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <BrandContext.Provider value={{
      brandData,
      setBrandData,
      updateBrandField,
      isDarkMode,
      toggleThemeMode,
    }}>
      {children}
    </BrandContext.Provider>
  );
};

export const useBrand = () => {
  const context = useContext(BrandContext);
  if (context === undefined) {
    throw new Error('useBrand must be used within a BrandProvider');
  }
  return context;
};



