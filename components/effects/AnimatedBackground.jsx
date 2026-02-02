"use client";
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';



const FloatingOrb = ({
  delay = 0,
  duration = 20,
  size = 300,
  color = 'hsl(var(--accent))',
  initialX = 0,
  initialY = 0,
}) => {
  return (
    <motion.div
      className="absolute rounded-full blur-3xl opacity-20 pointer-events-none"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        left: `${initialX}%`,
        top: `${initialY}%`,
      }}
      animate={{
        x: [0, 100, -50, 75, 0],
        y: [0, -75, 50, -25, 0],
        scale: [1, 1.2, 0.9, 1.1, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
    />
  );
};

const GridPattern = ({ opacity = 0.03 }) => {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(hsl(var(--accent) / ${opacity}) 1px, transparent 1px),
          linear-gradient(90deg, hsl(var(--accent) / ${opacity}) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
      }}
    />
  );
};

const ParticleField = ({ count = 50 }) => {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-accent/30"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};



export const AnimatedBackground = ({
  variant = 'all',
  className = '',
}) => {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />

      {/* Mesh gradient */}
      {(variant === 'mesh' || variant === 'all') && (
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(at 40% 20%, hsl(var(--accent) / 0.15) 0px, transparent 50%),
              radial-gradient(at 80% 0%, hsl(var(--primary) / 0.1) 0px, transparent 50%),
              radial-gradient(at 0% 50%, hsl(var(--accent) / 0.1) 0px, transparent 50%),
              radial-gradient(at 80% 50%, hsl(var(--primary) / 0.15) 0px, transparent 50%),
              radial-gradient(at 0% 100%, hsl(var(--accent) / 0.1) 0px, transparent 50%),
              radial-gradient(at 80% 100%, hsl(var(--primary) / 0.1) 0px, transparent 50%)
            `,
          }}
        />
      )}

      {/* Floating orbs */}
      {(variant === 'orbs' || variant === 'all') && (
        <>
          <FloatingOrb delay={0} duration={25} size={400} initialX={10} initialY={20} />
          <FloatingOrb delay={5} duration={30} size={300} initialX={60} initialY={10} color="hsl(var(--primary))" />
          <FloatingOrb delay={10} duration={20} size={350} initialX={80} initialY={60} />
          <FloatingOrb delay={2} duration={28} size={250} initialX={20} initialY={70} color="hsl(var(--primary))" />
        </>
      )}

      {/* Grid pattern */}
      {(variant === 'grid' || variant === 'all') && <GridPattern />}

      {/* Particles */}
      {(variant === 'particles' || variant === 'all') && <ParticleField count={30} />}

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default AnimatedBackground;




