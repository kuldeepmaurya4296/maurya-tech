"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';



export const CTASection = ({
  title,
  description,
  buttonText,
  buttonLink,
  variant = 'default',
}) => {
  const isAccent = variant === 'accent';

  return (
    <section className={isAccent ? 'bg-accent' : 'hero-gradient'}>
      <div className="container-custom py-20 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 ${isAccent ? 'text-accent-foreground' : 'text-hero-foreground'}`}>
            {title}
          </h2>
          <p className={`text-lg md:text-xl mb-8 leading-relaxed ${isAccent ? 'text-accent-foreground/80' : 'text-hero-muted'}`}>
            {description}
          </p>
          <Link href={buttonLink}>
            <Button
              size="lg"
              className={`text-lg px-8 py-6 ${isAccent
                  ? 'bg-accent-foreground text-accent hover:bg-accent-foreground/90'
                  : 'bg-accent text-accent-foreground hover:bg-accent/90 glow'
                }`}
            >
              {buttonText}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};




