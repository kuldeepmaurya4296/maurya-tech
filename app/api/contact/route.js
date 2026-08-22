import { NextResponse } from 'next/server';
import { transporter, mailOptions } from '@/lib/emailService';
import connectToDatabase from '@/lib/mongodb';
import Inquiry from '@/lib/models/Inquiry';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
      await Inquiry.create({
        type: type || 'user',
        ...data,
      });
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
          <p><strong>Name:</strong> ${data.name || 'N/A'}</p>
          <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
          <p><strong>Subject:</strong> ${data.subject || 'N/A'}</p>
          <hr style="border: none; border-top: 1px solid #eaeaea; margin: 15px 0;" />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; background-color: #f8fafc; padding: 12px; border-radius: 6px;">${data.message || 'N/A'}</p>
        </div>
      `;
    } else if (type === 'company') {
      subject = `New Project Request from ${data.companyName || 'Company'}`;
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
          <h2 style="color: #0f172a;">Company Project Inquiry</h2>
          <p><strong>Contact Name:</strong> ${data.contactName || 'N/A'}</p>
          <p><strong>Work Email:</strong> <a href="mailto:${data.workEmail}">${data.workEmail}</a></p>
          <p><strong>Company Name:</strong> ${data.companyName || 'N/A'}</p>
          <p><strong>Job Title:</strong> ${data.jobTitle || 'N/A'}</p>
          <p><strong>Service Needed:</strong> ${data.service || 'N/A'}</p>
          <p><strong>Estimated Budget:</strong> ${data.budget || 'N/A'}</p>
          <hr style="border: none; border-top: 1px solid #eaeaea; margin: 15px 0;" />
          <p><strong>Project Details:</strong></p>
          <p style="white-space: pre-wrap; background-color: #f8fafc; padding: 12px; border-radius: 6px;">${data.details || 'N/A'}</p>
        </div>
      `;
    } else if (type === 'sales') {
      subject = `New Partnership Inquiry from ${data.organization || 'Partner'}`;
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
          <h2 style="color: #0f172a;">Partnership / Sales Inquiry</h2>
          <p><strong>Full Name:</strong> ${data.fullName || 'N/A'}</p>
          <p><strong>Official Email:</strong> <a href="mailto:${data.officialEmail}">${data.officialEmail}</a></p>
          <p><strong>Organization:</strong> ${data.organization || 'N/A'}</p>
          <p><strong>Partnership Type:</strong> ${data.partnershipType || 'N/A'}</p>
          <hr style="border: none; border-top: 1px solid #eaeaea; margin: 15px 0;" />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; background-color: #f8fafc; padding: 12px; border-radius: 6px;">${data.message || 'N/A'}</p>
        </div>
      `;
    } else {
      return NextResponse.json({ success: false, message: 'Invalid submission type' }, { status: 400 });
    }

    try {
      await transporter.sendMail({
        ...mailOptions,
        subject,
        html: htmlContent,
        replyTo: contactEmail,
      });
    } catch (mailError) {
      console.error('SMTP Send Error:', mailError);
    }

    return NextResponse.json({ success: true, message: 'Message sent successfully. We will get back to you within 24 hours.' }, { status: 200 });
  } catch (error) {
    console.error('Contact Route Error:', error);
    return NextResponse.json({ success: false, message: 'Error sending inquiry. Please try again.' }, { status: 500 });
  }
}
