'use client';

import React from 'react';

export const AnimatedBackground = ({ variant = 'all', className = '' }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none -z-10 ${className}`}>
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />

      {/* Hardware accelerated CSS mesh glow */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          background: `
            radial-gradient(at 20% 20%, hsl(var(--accent) / 0.12) 0px, transparent 50%),
            radial-gradient(at 80% 10%, hsl(var(--primary) / 0.1) 0px, transparent 50%),
            radial-gradient(at 10% 70%, hsl(var(--accent) / 0.08) 0px, transparent 50%),
            radial-gradient(at 80% 80%, hsl(var(--primary) / 0.12) 0px, transparent 50%)
          `,
        }}
      />

      {/* CSS Floating Glow Orbs (GPU compositor thread, zero JS main-thread TBT) */}
      {(variant === 'orbs' || variant === 'all') && (
        <>
          <div
            className="absolute top-10 left-10 w-96 h-96 rounded-full bg-accent/15 blur-3xl animate-pulse"
            style={{ animationDuration: '8s' }}
          />
          <div
            className="absolute top-1/3 right-10 w-80 h-80 rounded-full bg-primary/10 blur-3xl animate-pulse"
            style={{ animationDuration: '10s', animationDelay: '2s' }}
          />
        </>
      )}

      {/* Grid pattern */}
      {(variant === 'grid' || variant === 'all') && (
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--foreground) / 0.03) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--foreground) / 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
          }}
        />
      )}
    </div>
  );
};

export default AnimatedBackground;
