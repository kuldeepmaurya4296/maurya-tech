"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { themes, defaultTheme } from '@/data/themeData';



const ThemeContext = createContext(undefined);

export const ThemeProvider = ({ children }) => {
  const [currentThemeId, setCurrentThemeId] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('maurya-theme') || defaultTheme;
    }
    return defaultTheme;
  });

  const currentTheme = themes.find(t => t.id === currentThemeId) || themes[0];

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentThemeId);
    localStorage.setItem('maurya-theme', currentThemeId);
  }, [currentThemeId]);

  const setTheme = (themeId) => {
    setCurrentThemeId(themeId);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, themes }}>
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



