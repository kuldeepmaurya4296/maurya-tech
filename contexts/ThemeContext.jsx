'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { themes, defaultTheme } from '@/data/themes';

const ThemeContext = createContext(undefined);

export const ThemeProvider = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const [currentThemeId, setCurrentThemeId] = useState(defaultTheme);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('maurya-theme');
    if (saved && themes.some((t) => t.id === saved)) {
      setCurrentThemeId(saved);
      document.documentElement.setAttribute('data-theme', saved);
    } else {
      document.documentElement.setAttribute('data-theme', defaultTheme);
    }
  }, []);

  const setTheme = (themeId) => {
    setCurrentThemeId(themeId);
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('data-theme', themeId);
      localStorage.setItem('maurya-theme', themeId);
    }
  };

  const currentTheme = themes.find((t) => t.id === currentThemeId) || themes[0];

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, themes, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
