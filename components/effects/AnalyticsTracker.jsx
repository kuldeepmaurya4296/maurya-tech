'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // 1. Never track on admin portal, internal APIs, or when window is unavailable
    if (!pathname || pathname.startsWith('/admin') || pathname.startsWith('/api')) {
      return;
    }

    // 2. Strict Filter: Never track analytics on Localhost or Development Environments
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      if (
        hostname === 'localhost' ||
        hostname === '127.0.0.1' ||
        hostname === '0.0.0.0' ||
        hostname.endsWith('.local') ||
        process.env.NODE_ENV !== 'production'
      ) {
        return;
      }
    }

    // 3. Fire-and-forget Production page view tracking
    try {
      fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          path: pathname,
          referrer: typeof document !== 'undefined' ? document.referrer : '',
        }),
      }).catch(() => {
        // Silently ignore any tracking network glitches
      });
    } catch (e) {
      // Ignored
    }
  }, [pathname]);

  return null;
}
