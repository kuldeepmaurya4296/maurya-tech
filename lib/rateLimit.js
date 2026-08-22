// Lightweight in-memory rate limiter for Next.js API Routes

const ipHits = new Map();

// Periodic cleanup of stale IP records every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of ipHits.entries()) {
      if (now > record.resetTime) {
        ipHits.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}

/**
 * Check if a request exceeds rate limit
 * @param {string} ip - Client IP identifier
 * @param {number} limit - Maximum requests allowed in the window
 * @param {number} windowMs - Window duration in milliseconds (default 5 mins)
 * @returns {{ isAllowed: boolean, remaining: number, resetInSeconds: number }}
 */
export function checkRateLimit(ip = 'anonymous', limit = 10, windowMs = 5 * 60 * 1000) {
  const now = Date.now();
  const key = `${ip}`;

  const currentRecord = ipHits.get(key);

  if (!currentRecord || now > currentRecord.resetTime) {
    ipHits.set(key, {
      count: 1,
      resetTime: now + windowMs,
    });
    return {
      isAllowed: true,
      remaining: limit - 1,
      resetInSeconds: Math.ceil(windowMs / 1000),
    };
  }

  if (currentRecord.count >= limit) {
    return {
      isAllowed: false,
      remaining: 0,
      resetInSeconds: Math.ceil((currentRecord.resetTime - now) / 1000),
    };
  }

  currentRecord.count += 1;
  return {
    isAllowed: true,
    remaining: limit - currentRecord.count,
    resetInSeconds: Math.ceil((currentRecord.resetTime - now) / 1000),
  };
}

/**
 * Helper to extract client IP from headers
 * @param {Request} req
 * @returns {string}
 */
export function getClientIp(req) {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return req.headers.get('x-real-ip') || '127.0.0.1';
}
