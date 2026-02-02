"use client";
import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform, Variants } from 'framer-motion';

// ============================================
// SCROLL REVEAL - Fade in on scroll
// ============================================


export const ScrollReveal = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 50,
  className = '',
  once = true,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-100px' });

  const directions = {
    up: { y, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x, y: 0 },
    right: { x: -distance, y: 0 },
    none: { x: 0, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        ...directions[direction],
      }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

// ============================================
// SCROLL SCALE - Scale on scroll
// ============================================


export const ScrollScale = ({
  children,
  from = 0.8,
  to = 1,
  className = '',
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ scale, opacity: 0 }}
      animate={isInView ? { scale, opacity: 1 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

// ============================================
// PARALLAX - Move at different speed
// ============================================


export const Parallax = ({
  children,
  offset = 50,
  className = '',
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
};

// ============================================
// STAGGER CONTAINER - Stagger children
// ============================================


export const StaggerContainer = ({
  children,
  staggerDelay = 0.1,
  delayChildren = 0,
  className = '',
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-50px' });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {children}
    </motion.div>
  );
};

// ============================================
// STAGGER ITEM - Child of StaggerContainer
// ============================================


export const StaggerItem = ({
  children,
  className = '',
}) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
};

// ============================================
// SCROLL PROGRESS - Progress bar based on scroll
// ============================================


export const ScrollProgress = ({
  className = '',
  height = 4,
}) => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 z-50 bg-accent origin-left ${className}`}
      style={{
        height,
        scaleX,
      }}
    />
  );
};

// ============================================
// ROTATE ON SCROLL
// ============================================


export const RotateOnScroll = ({
  children,
  degrees = 360,
  className = '',
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target,
    offset: ['start end', 'end start'],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, degrees]);

  return (
    <motion.div ref={ref} className={className} style={{ rotate }}>
      {children}
    </motion.div>
  );
};

// ============================================
// HORIZONTAL SCROLL TEXT
// ============================================


export const MarqueeText = ({
  text,
  speed = 20,
  className = '',
}) => {
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="inline-flex"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          duration,
          repeat,
          ease: 'linear',
        }}
      >
        <span className="mr-8">{text}</span>
        <span className="mr-8">{text}</span>
        <span className="mr-8">{text}</span>
        <span className="mr-8">{text}</span>
      </motion.div>
    </div>
  );
};

export default {
  ScrollReveal,
  ScrollScale,
  Parallax,
  StaggerContainer,
  StaggerItem,
  ScrollProgress,
  RotateOnScroll,
  MarqueeText,
};




