// Lightweight Centralized Security Audit Logger for OWASP A09 Compliance

export function logSecurityEvent({ eventType, ip = 'unknown', endpoint = '', details = {} }) {
  const timestamp = new Date().toISOString();
  const sanitizedIp = typeof ip === 'string' ? ip.slice(0, 45) : 'unknown';

  const logEntry = {
    timestamp,
    securityEvent: eventType,
    clientIp: sanitizedIp,
    targetEndpoint: endpoint,
    ...details,
  };

  // Structured JSON output for SIEM / Security Monitoring ingestion
  console.warn(`[SECURITY AUDIT] ${JSON.stringify(logEntry)}`);
}
