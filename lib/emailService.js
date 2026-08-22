import nodemailer from 'nodemailer';

// Env names must match .env.example: SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASS.
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = Number(process.env.SMTP_PORT) || 465;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;

export const isMailConfigured = Boolean(SMTP_USER && SMTP_PASS);

if (!isMailConfigured) {
  console.warn(
    '[emailService] SMTP_USER / SMTP_PASS are not set - outbound email (contact, applications, password reset, security alerts) is disabled.'
  );
}

export const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465,
  auth: { user: SMTP_USER, pass: SMTP_PASS },
});

export const mailOptions = {
  from: SMTP_USER,
  to: process.env.SUPPORT_EMAIL || SMTP_USER,
};

/**
 * Send mail without ever throwing into a request handler.
 * Returns true when the message was handed to the SMTP server.
 */
export async function sendMail(options) {
  if (!isMailConfigured) {
    console.warn('[emailService] Skipped sending mail - SMTP is not configured.');
    return false;
  }

  try {
    await transporter.sendMail({ ...mailOptions, ...options });
    return true;
  } catch (error) {
    console.error('[emailService] Failed to send mail:', error.message);
    return false;
  }
}

/** Escape untrusted values before interpolating them into an HTML email body. */
export function escapeHtml(value) {
  if (value === null || value === undefined) return '';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
