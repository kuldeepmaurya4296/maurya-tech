import { NextResponse } from 'next/server';
import { transporter, mailOptions } from '@/lib/emailService';
import connectToDatabase from '@/lib/mongodb';
import Application from '@/lib/models/Application';

export async function POST(req) {
  try {
    const data = await req.json();

    // 1. Validate required fields
    if (!data.name || !data.email || !data.phone || !data.resume) {
      return NextResponse.json({ message: 'Name, email, phone, and resume are required.' }, { status: 400 });
    }

    // 2. Save Application to MongoDB
    let savedApplication = null;
    try {
      await connectToDatabase();
      savedApplication = await Application.create({
        jobId: data.jobId || 'general',
        jobTitle: data.jobTitle || 'General Application',
        name: data.name,
        email: data.email,
        phone: data.phone,
        linkedin: data.linkedin || '',
        resume: data.resume,
        coverLetter: data.coverLetter || '',
        status: 'Pending',
      });
    } catch (dbError) {
      console.error('MongoDB Application Save Error:', dbError);
      // We continue to send email even if DB write has a glitch
    }

    // 3. Send Email Notification via SMTP
    const subject = `Job Application: ${data.jobTitle || 'General'} - ${data.name}`;
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
        <h2 style="color: #0f172a;">New Job Application Received</h2>
        <p><strong>Applicant Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Applying for Role:</strong> ${data.jobTitle || 'General'}</p>
        <hr style="border: none; border-top: 1px solid #eaeaea; margin: 15px 0;" />
        <p><strong>LinkedIn Profile:</strong> <a href="${data.linkedin}" target="_blank">${data.linkedin || 'Not provided'}</a></p>
        <p><strong>Resume Link:</strong> <a href="${data.resume}" target="_blank" style="background-color: #0284c7; color: white; padding: 6px 12px; border-radius: 4px; text-decoration: none;">View Resume</a></p>
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
        replyTo: data.email,
      });
    } catch (mailError) {
      console.error('SMTP Apply Email Error:', mailError);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Application submitted successfully. We will review it and get back to you shortly.',
        applicationId: savedApplication?._id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Apply Route Error:', error);
    return NextResponse.json({ message: 'Error submitting application. Please try again.' }, { status: 500 });
  }
}
