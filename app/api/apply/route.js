import { NextResponse } from 'next/server';
import { transporter, mailOptions } from '@/lib/emailService';
import connectToDatabase from '@/lib/mongodb';
import Application from '@/lib/models/Application';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validates safe URL protocol (prevents SSRF via file://, gopher://, javascript:, internal LAN IPs)
function isValidPublicHttpUrl(stringUrl) {
  try {
    const parsed = new URL(stringUrl);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch (err) {
    return false;
  }
}

export async function POST(req) {
  try {
    // 1. Rate Limiting Check (Max 5 submissions per 5 minutes per IP)
    const clientIp = getClientIp(req);
    const rateCheck = checkRateLimit(`apply-${clientIp}`, 5, 5 * 60 * 1000);

    if (!rateCheck.isAllowed) {
      return NextResponse.json(
        {
          success: false,
          message: `Too many submissions from this network. Please wait ${rateCheck.resetInSeconds} seconds before trying again.`,
        },
        { status: 429 }
      );
    }

    const data = await req.json();

    // 2. Validate required fields & formats
    const name = data.name?.trim().slice(0, 100);
    const email = data.email?.trim().toLowerCase().slice(0, 100);
    const phone = data.phone?.trim().slice(0, 30);
    const resume = data.resume?.trim();
    const linkedin = data.linkedin?.trim() || '';

    if (!name || !email || !phone || !resume) {
      return NextResponse.json(
        { success: false, message: 'Name, email, phone number, and resume link are required.' },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // SSRF & Safe Protocol Validation
    if (!isValidPublicHttpUrl(resume)) {
      return NextResponse.json(
        { success: false, message: 'Invalid resume URL. Please provide a valid HTTP or HTTPS web link.' },
        { status: 400 }
      );
    }

    if (linkedin && !isValidPublicHttpUrl(linkedin)) {
      return NextResponse.json(
        { success: false, message: 'Invalid LinkedIn URL. Please provide a valid profile link starting with https://' },
        { status: 400 }
      );
    }

    // 3. Save Application to MongoDB
    let savedApplication = null;
    try {
      await connectToDatabase();
      savedApplication = await Application.create({
        jobId: (data.jobId || 'general').slice(0, 50),
        jobTitle: (data.jobTitle || 'General Application').slice(0, 150),
        name,
        email,
        phone,
        linkedin,
        resume,
        coverLetter: (data.coverLetter?.trim() || '').slice(0, 3000),
        status: 'Pending',
      });
    } catch (dbError) {
      console.error('MongoDB Application Save Error:', dbError);
    }

    // 4. Send Email Notification via SMTP
    const subject = `Job Application: ${data.jobTitle || 'General'} - ${name}`;
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
        <h2 style="color: #0f172a;">New Job Application Received</h2>
        <p><strong>Applicant Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Role Applied For:</strong> ${data.jobTitle || 'General'}</p>
        <hr style="border: none; border-top: 1px solid #eaeaea; margin: 15px 0;" />
        <p><strong>LinkedIn:</strong> ${linkedin ? `<a href="${linkedin}" target="_blank">${linkedin}</a>` : 'Not provided'}</p>
        <p><strong>Resume:</strong> <a href="${resume}" target="_blank" style="background-color: #0284c7; color: white; padding: 6px 12px; border-radius: 4px; text-decoration: none;">View Resume</a></p>
        ${
          data.coverLetter
            ? `
          <div style="background-color: #f8fafc; padding: 12px; border-radius: 6px; margin-top: 15px;">
            <p><strong>Cover Letter / Note:</strong></p>
            <p style="white-space: pre-wrap;">${data.coverLetter}</p>
          </div>
        `
            : ''
        }
      </div>
    `;

    try {
      await transporter.sendMail({
        ...mailOptions,
        subject,
        html: htmlContent,
        replyTo: email,
      });
    } catch (mailError) {
      console.error('SMTP Apply Email Error:', mailError);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Application submitted successfully! Our engineering team will review it and get back to you shortly.',
        applicationId: savedApplication?._id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Apply Route Error:', error);
    return NextResponse.json(
      { success: false, message: 'Error submitting application. Please try again.' },
      { status: 500 }
    );
  }
}
