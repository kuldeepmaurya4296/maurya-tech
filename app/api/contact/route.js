import { NextResponse } from 'next/server';
import { sendMail, escapeHtml } from '@/lib/emailService';
import connectToDatabase from '@/lib/mongodb';
import Inquiry from '@/lib/models/Inquiry';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Only these fields are persisted, each length-capped, so a crafted payload
// cannot inject arbitrary schema fields or store unbounded documents.
const INQUIRY_FIELDS = {
  name: 100, email: 100, subject: 200, message: 5000,
  contactName: 100, workEmail: 100, companyName: 150, jobTitle: 100,
  service: 100, budget: 100, details: 5000,
  fullName: 100, officialEmail: 100, organization: 150, partnershipType: 100,
};

function sanitizeInquiry(data) {
  const clean = {};
  for (const [field, maxLength] of Object.entries(INQUIRY_FIELDS)) {
    const value = data[field];
    if (typeof value === 'string' && value.trim()) {
      clean[field] = value.trim().slice(0, maxLength);
    }
  }
  return clean;
}


export async function POST(req) {
  try {
    // 1. Rate Limiting Check (Max 5 submissions per 5 minutes per IP)
    const clientIp = getClientIp(req);
    const rateCheck = checkRateLimit(`contact-${clientIp}`, 5, 5 * 60 * 1000);

    if (!rateCheck.isAllowed) {
      return NextResponse.json(
        {
          success: false,
          message: `Too many submissions. Please wait ${rateCheck.resetInSeconds} seconds before sending another message.`,
        },
        { status: 429 }
      );
    }

    const payload = await req.json();
    const { type, data } = payload;

    if (!data) {
      return NextResponse.json({ success: false, message: 'Invalid payload.' }, { status: 400 });
    }

    // 2. Validate email depending on type
    const contactEmail = data.email || data.workEmail || data.officialEmail;
    if (contactEmail && !EMAIL_REGEX.test(contactEmail.trim())) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // 3. Store in MongoDB
    try {
      await connectToDatabase();
      await Inquiry.create({ type: type || 'user', ...sanitizeInquiry(data) });
    } catch (dbError) {
      console.error('MongoDB Inquiry Save Error:', dbError);
    }

    // 4. Prepare and Send Email Notification
    let subject = '';
    let htmlContent = '';

    if (type === 'user') {
      subject = `New User Inquiry from ${data.name || 'Visitor'}`;
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
          <h2 style="color: #0f172a;">General User Inquiry</h2>
          <p><strong>Name:</strong> ${escapeHtml(data.name) || 'N/A'}</p>
          <p><strong>Email:</strong> <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>
          <p><strong>Subject:</strong> ${escapeHtml(data.subject) || 'N/A'}</p>
          <hr style="border: none; border-top: 1px solid #eaeaea; margin: 15px 0;" />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; background-color: #f8fafc; padding: 12px; border-radius: 6px;">${escapeHtml(data.message) || 'N/A'}</p>
        </div>
      `;
    } else if (type === 'company') {
      subject = `New Project Request from ${data.companyName || 'Company'}`;
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
          <h2 style="color: #0f172a;">Company Project Inquiry</h2>
          <p><strong>Contact Name:</strong> ${escapeHtml(data.contactName) || 'N/A'}</p>
          <p><strong>Work Email:</strong> <a href="mailto:${escapeHtml(data.workEmail)}">${escapeHtml(data.workEmail)}</a></p>
          <p><strong>Company Name:</strong> ${escapeHtml(data.companyName) || 'N/A'}</p>
          <p><strong>Job Title:</strong> ${escapeHtml(data.jobTitle) || 'N/A'}</p>
          <p><strong>Service Needed:</strong> ${escapeHtml(data.service) || 'N/A'}</p>
          <p><strong>Estimated Budget:</strong> ${escapeHtml(data.budget) || 'N/A'}</p>
          <hr style="border: none; border-top: 1px solid #eaeaea; margin: 15px 0;" />
          <p><strong>Project Details:</strong></p>
          <p style="white-space: pre-wrap; background-color: #f8fafc; padding: 12px; border-radius: 6px;">${escapeHtml(data.details) || 'N/A'}</p>
        </div>
      `;
    } else if (type === 'sales') {
      subject = `New Partnership Inquiry from ${data.organization || 'Partner'}`;
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
          <h2 style="color: #0f172a;">Partnership / Sales Inquiry</h2>
          <p><strong>Full Name:</strong> ${escapeHtml(data.fullName) || 'N/A'}</p>
          <p><strong>Official Email:</strong> <a href="mailto:${escapeHtml(data.officialEmail)}">${escapeHtml(data.officialEmail)}</a></p>
          <p><strong>Organization:</strong> ${escapeHtml(data.organization) || 'N/A'}</p>
          <p><strong>Partnership Type:</strong> ${escapeHtml(data.partnershipType) || 'N/A'}</p>
          <hr style="border: none; border-top: 1px solid #eaeaea; margin: 15px 0;" />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; background-color: #f8fafc; padding: 12px; border-radius: 6px;">${escapeHtml(data.message) || 'N/A'}</p>
        </div>
      `;
    } else {
      return NextResponse.json({ success: false, message: 'Invalid submission type' }, { status: 400 });
    }

    await sendMail({ subject, html: htmlContent, replyTo: contactEmail });

    return NextResponse.json({ success: true, message: 'Message sent successfully. We will get back to you within 24 hours.' }, { status: 200 });
  } catch (error) {
    console.error('Contact Route Error:', error);
    return NextResponse.json({ success: false, message: 'Error sending inquiry. Please try again.' }, { status: 500 });
  }
}
