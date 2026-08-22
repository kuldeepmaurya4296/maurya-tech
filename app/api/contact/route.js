import { NextResponse } from 'next/server';
import { transporter, mailOptions } from '@/lib/emailService';
import connectToDatabase from '@/lib/mongodb';
import Inquiry from '@/lib/models/Inquiry';

export async function POST(req) {
  try {
    const payload = await req.json();
    const { type, data } = payload;

    // 1. Store in MongoDB
    try {
      await connectToDatabase();
      await Inquiry.create({
        type: type || 'user',
        ...data,
      });
    } catch (dbError) {
      console.error('MongoDB Inquiry Save Error:', dbError);
    }

    // 2. Prepare and Send Email Notification
    let subject = '';
    let htmlContent = '';

    if (type === 'user') {
      subject = `New User Inquiry from ${data.name}`;
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
          <h2 style="color: #0f172a;">General User Inquiry</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
          <p><strong>Subject:</strong> ${data.subject}</p>
          <hr style="border: none; border-top: 1px solid #eaeaea; margin: 15px 0;" />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; background-color: #f8fafc; padding: 12px; border-radius: 6px;">${data.message}</p>
        </div>
      `;
    } else if (type === 'company') {
      subject = `New Project Request from ${data.companyName}`;
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
          <h2 style="color: #0f172a;">Company Project Inquiry</h2>
          <p><strong>Contact Name:</strong> ${data.contactName}</p>
          <p><strong>Work Email:</strong> <a href="mailto:${data.workEmail}">${data.workEmail}</a></p>
          <p><strong>Company Name:</strong> ${data.companyName}</p>
          <p><strong>Job Title:</strong> ${data.jobTitle || 'N/A'}</p>
          <p><strong>Service Needed:</strong> ${data.service}</p>
          <p><strong>Estimated Budget:</strong> ${data.budget}</p>
          <hr style="border: none; border-top: 1px solid #eaeaea; margin: 15px 0;" />
          <p><strong>Project Details:</strong></p>
          <p style="white-space: pre-wrap; background-color: #f8fafc; padding: 12px; border-radius: 6px;">${data.details}</p>
        </div>
      `;
    } else if (type === 'sales') {
      subject = `New Partnership Inquiry from ${data.organization}`;
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
          <h2 style="color: #0f172a;">Partnership / Sales Inquiry</h2>
          <p><strong>Full Name:</strong> ${data.fullName}</p>
          <p><strong>Official Email:</strong> <a href="mailto:${data.officialEmail}">${data.officialEmail}</a></p>
          <p><strong>Organization:</strong> ${data.organization}</p>
          <p><strong>Partnership Type:</strong> ${data.partnershipType}</p>
          <hr style="border: none; border-top: 1px solid #eaeaea; margin: 15px 0;" />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; background-color: #f8fafc; padding: 12px; border-radius: 6px;">${data.message}</p>
        </div>
      `;
    } else {
      return NextResponse.json({ message: 'Invalid submission type' }, { status: 400 });
    }

    try {
      await transporter.sendMail({
        ...mailOptions,
        subject,
        html: htmlContent,
        replyTo: type === 'user' ? data.email : type === 'company' ? data.workEmail : data.officialEmail,
      });
    } catch (mailError) {
      console.error('SMTP Send Error:', mailError);
    }

    return NextResponse.json({ success: true, message: 'Message sent successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Contact Route Error:', error);
    return NextResponse.json({ message: 'Error sending inquiry. Please try again.' }, { status: 500 });
  }
}
