'use client';

import { useEffect } from 'react';

export default function SmoothScroll() {
  useEffect(() => {
    // Disable on touch devices to maximize performance and avoid TBT
    if (typeof window === 'undefined') return;
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    let lenisInstance = null;
    let reqId = null;

    import('lenis').then(({ default: Lenis }) => {
      lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
      });

      function raf(time) {
        lenisInstance?.raf(time);
        reqId = requestAnimationFrame(raf);
      }

      reqId = requestAnimationFrame(raf);
    });

    return () => {
      if (reqId) cancelAnimationFrame(reqId);
      if (lenisInstance) lenisInstance.destroy();
    };
  }, []);

  return null;
}
