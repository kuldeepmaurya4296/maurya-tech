"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';



export const Section = ({
  children,
  className,
  id,
  variant = 'default',
}) => {
  const variantClasses = {
    default: 'bg-background',
    muted: 'bg-muted',
    primary: 'bg-primary text-primary-foreground',
    hero: 'hero-gradient text-hero-foreground',
  };

  return (
    <section
      id={id}
      className={cn('section-padding', variantClasses[variant], className)}
    >
      <div className="container-custom">{children}</div>
    </section>
  );
};



export const SectionHeader = ({
  title,
  subtitle,
  description,
  align = 'center',
  className,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        'mb-12 md:mb-16',
        align === 'center' ? 'text-center max-w-3xl mx-auto' : 'text-left',
        className
      )}
    >
      {subtitle && (
        <span className="inline-block text-accent font-medium text-sm uppercase tracking-wider mb-3">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
};




