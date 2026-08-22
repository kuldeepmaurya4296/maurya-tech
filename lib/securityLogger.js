import { transporter, mailOptions } from '@/lib/emailService';

// Critical security events that trigger instant email alerts to the Admin
const CRITICAL_SECURITY_EVENTS = [
  'ACCOUNT_LOCKED_MAX_ATTEMPTS_REACHED',
  'LOGIN_RATE_LIMIT_EXCEEDED',
  'UNAUTHORIZED_ACCESS_ATTEMPT',
  'UNAUTHORIZED_INQUIRIES_ACCESS',
  'LOGIN_ATTEMPT_ON_LOCKED_ACCOUNT',
  'CROSS_SITE_ATTACK_BLOCKED',
  'SUSPICIOUS_PAYLOAD_DETECTED',
];

// In-memory throttling to prevent email flooding if attacked by thousands of requests per second
const alertThrottleMap = new Map();
const THROTTLE_WINDOW_MS = 2 * 60 * 1000; // Max 1 email per event type per IP per 2 minutes

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

  // 1. Structured SIEM Console Logging
  console.warn(`🚨 [SECURITY AUDIT ALERT] ${JSON.stringify(logEntry)}`);

  // 2. Automated Real-Time Email Notification for Critical Threats
  if (CRITICAL_SECURITY_EVENTS.includes(eventType)) {
    const throttleKey = `${eventType}-${sanitizedIp}`;
    const lastAlertTime = alertThrottleMap.get(throttleKey) || 0;

    if (Date.now() - lastAlertTime > THROTTLE_WINDOW_MS) {
      alertThrottleMap.set(throttleKey, Date.now());

      // Send alert email asynchronously without blocking the API request
      sendSecurityAlertEmail(logEntry).catch((err) => {
        console.error('Failed to send security alert email:', err.message);
      });
    }
  }
}

async function sendSecurityAlertEmail(log) {
  if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
    return;
  }

  const subject = `🚨 Security Incident Alert: ${log.securityEvent} Detected on Maurya Tech`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 2px solid #ef4444; border-radius: 12px; background-color: #ffffff;">
      <div style="background-color: #ef4444; color: #ffffff; padding: 12px 16px; border-radius: 8px; font-weight: bold; font-size: 18px; display: flex; align-items: center; gap: 8px;">
        ⚠️ Maurya Technologies - Cyber Security Alert
      </div>

      <div style="padding: 20px 0;">
        <p style="font-size: 15px; color: #1e293b; margin-bottom: 15px;">
          Our Automated Security System detected an unethical / suspicious security incident on your platform:
        </p>

        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 8px; font-weight: bold; color: #64748b; width: 35%;">Incident Type:</td>
            <td style="padding: 8px; font-weight: bold; color: #ef4444;">${log.securityEvent}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 8px; font-weight: bold; color: #64748b;">Attacker IP Address:</td>
            <td style="padding: 8px; font-family: monospace; font-weight: bold; color: #0f172a;">${log.clientIp}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 8px; font-weight: bold; color: #64748b;">Target Endpoint:</td>
            <td style="padding: 8px; font-family: monospace; color: #0284c7;">${log.targetEndpoint || 'N/A'}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 8px; font-weight: bold; color: #64748b;">Timestamp:</td>
            <td style="padding: 8px; color: #334155;">${new Date(log.timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} (IST)</td>
          </tr>
        </table>

        <div style="margin-top: 15px; background-color: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px;">
          <div style="font-weight: bold; font-size: 12px; color: #475569; text-transform: uppercase; margin-bottom: 4px;">Incident Details:</div>
          <pre style="margin: 0; font-family: monospace; font-size: 12px; color: #0f172a; white-space: pre-wrap;">${JSON.stringify(log, null, 2)}</pre>
        </div>

        <div style="margin-top: 20px; padding: 12px; background-color: #ecfdf5; border-left: 4px solid #10b981; border-radius: 4px;">
          <p style="margin: 0; font-size: 13px; color: #065f46; font-weight: 500;">
            🛡️ <strong>Automated Action Taken:</strong> The suspicious request was immediately blocked / account locked by Maurya Tech Security Engine. No unauthorized data was exposed.
          </p>
        </div>
      </div>

      <div style="border-top: 1px solid #e2e8f0; padding-top: 12px; text-align: center; font-size: 12px; color: #94a3b8;">
        Maurya Technologies Automated Incident Detection System &bull; <a href="https://maurya-tech.com/admin" style="color: #0284c7; text-decoration: none;">Open Admin Portal</a>
      </div>
    </div>
  `;

  await transporter.sendMail({
    ...mailOptions,
    subject,
    html,
  });
}
