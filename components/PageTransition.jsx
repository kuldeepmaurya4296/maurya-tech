"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';



const pageVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  in: { opacity: 1, y: 0, scale: 1 },
  out: { opacity: 0, y: -20, scale: 0.98 },
};

export const PageTransition = ({ children }) => {
  const location = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={{ type: 'tween', ease: 'anticipate', duration: 0.4 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export const fadeInUp = { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 } };
export const scaleIn = { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.4 } };
export const staggerContainer = { animate: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } };
export const staggerItem = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };




