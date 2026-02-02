"use client";
import React from 'react';
import { Link } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';



export const HeroSection = ({
  headline,
  subheadline,
  description,
  ctaPrimary,
  ctaSecondary,
  stats,
  showPattern = true,
}) => {
  return (
    <section className="relative min-h-[90vh] flex items-center hero-gradient overflow-hidden">
      {/* Background Pattern */}
      {showPattern && (
        <div className="absolute inset-0 bg-hero-pattern opacity-30" />
      )}

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-glow animation-delay-500" />

      <div className="container-custom relative z-10 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {subheadline && (
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6 opacity-0 animate-fade-in"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-accent text-sm font-medium">{subheadline}</span>
            </div>
          )}

          <h1
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-hero-foreground leading-tight mb-6 opacity-0 animate-fade-in animation-delay-100"
          >
            {headline}
          </h1>

          <p
            className="text-lg md:text-xl text-hero-muted leading-relaxed mb-8 max-w-2xl mx-auto opacity-0 animate-fade-in animation-delay-200"
          >
            {description}
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 opacity-0 animate-fade-in animation-delay-300"
          >
            {ctaPrimary && (
              <Link to={ctaPrimary.link}>
                <Button
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-6 glow"
                >
                  {ctaPrimary.text}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            )}
            {ctaSecondary && (
              <Link to={ctaSecondary.link}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-hero-foreground/30 text-hero-foreground hover:bg-hero-foreground/10 text-lg px-8 py-6"
                >
                  {ctaSecondary.text}
                </Button>
              </Link>
            )}
          </div>

          {stats && stats.length > 0 && (
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-hero-foreground/10 opacity-0 animate-fade-in animation-delay-400"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-heading font-bold text-accent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-hero-muted">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-hero-foreground/30 flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 bg-accent rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};




