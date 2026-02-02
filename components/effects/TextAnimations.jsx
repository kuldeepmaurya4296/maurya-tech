"use client";
import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

// ============================================
// TYPEWRITER EFFECT
// ============================================


export const Typewriter = ({
  text,
  speed = 50,
  delay = 0,
  className = '',
  cursor = true,
  onComplete,
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timeout;
    let charIndex = 0;

    const startTyping = () => {
      const interval = setInterval(() => {
        if (charIndex < text.length) {
          setDisplayText(text.slice(0, charIndex + 1));
          charIndex++;
        } else {
          clearInterval(interval);
          setIsComplete(true);
          onComplete?.();
        }
      }, speed);

      return interval;
    };

    timeout = setTimeout(() => {
      startTyping();
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, speed, delay, onComplete]);

  return (
    <span className={className}>
      {displayText}
      {cursor && !isComplete && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block ml-1 w-[3px] h-[1em] bg-accent align-middle"
        />
      )}
    </span>
  );
};

// ============================================
// GRADIENT SHIMMER TEXT
// ============================================


export const GradientShimmer = ({
  children,
  className = '',
}) => {
  return (
    <span
      className={`relative inline-block ${className}`}
      style={{
        background: 'linear-gradient(90deg, hsl(var(--foreground)) 0%, hsl(var(--accent)) 50%, hsl(var(--foreground)) 100%)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        animation: 'shimmer 3s linear infinite',
      }}
    >
      {children}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </span>
  );
};

// ============================================
// FOCUS-IN BLUR ANIMATION
// ============================================


export const FocusInBlur = ({
  children,
  delay = 0,
  duration = 0.8,
  className = '',
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-100px' });

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className}`}
      initial={{ filter: 'blur(12px)', opacity: 0 }}
      animate={isInView ? { filter: 'blur(0px)', opacity: 1 } : {}}
      transition={{ duration, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.span>
  );
};

// ============================================
// CLIP PATH REVEAL
// ============================================


export const ClipReveal = ({
  children,
  direction = 'left',
  delay = 0,
  duration = 0.8,
  className = '',
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-50px' });

  const clipPaths = {
    left: {
      initial: 'inset(0 100% 0 0)',
      animate: 'inset(0 0% 0 0)',
    },
    right: {
      initial: 'inset(0 0 0 100%)',
      animate: 'inset(0 0 0 0%)',
    },
    top: {
      initial: 'inset(0 0 100% 0)',
      animate: 'inset(0 0 0% 0)',
    },
    bottom: {
      initial: 'inset(100% 0 0 0)',
      animate: 'inset(0% 0 0 0)',
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ clipPath: clipPaths[direction].initial }}
      animate={isInView ? { clipPath: clipPaths[direction].animate } : {}}
      transition={{ duration, delay, ease: [0.77, 0, 0.175, 1] }}
    >
      {children}
    </motion.div>
  );
};

// ============================================
// LETTER BY LETTER ANIMATION
// ============================================


export const LetterAnimate = ({
  text,
  delay = 0,
  staggerDelay = 0.03,
  className = '',
  letterClassName = '',
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 200,
      },
    },
  };

  return (
    <motion.span
      ref={ref}
      className={`inline-flex flex-wrap ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          className={`inline-block ${letterClassName}`}
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span >
  );
};

// ============================================
// WORD BY WORD ANIMATION
// ============================================


export const WordAnimate = ({
  text,
  delay = 0,
  staggerDelay = 0.1,
  className = '',
  wordClassName = '',
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
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
    <motion.span
      ref={ref}
      className={`inline-flex flex-wrap gap-x-2 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {text.split(' ').map((word, index) => (
        <motion.span
          key={index}
          variants={wordVariants}
          className={`inline-block ${wordClassName}`}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

// ============================================
// COUNTING NUMBER ANIMATION
// ============================================


export const CountUp = ({
  end,
  start = 0,
  duration = 2,
  delay = 0,
  suffix = '',
  prefix = '',
  className = '',
}) => {
  const [count, setCount] = useState(start);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(start + (end - start) * easeOutQuart));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    const timeout = setTimeout(() => {
      animationFrame = requestAnimationFrame(animate);
    }, delay * 1000);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(animationFrame);
    };
  }, [isInView, end, start, duration, delay]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

export default {
  Typewriter,
  GradientShimmer,
  FocusInBlur,
  ClipReveal,
  LetterAnimate,
  WordAnimate,
  CountUp,
};




