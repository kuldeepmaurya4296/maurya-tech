import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Application from '@/lib/models/Application';
import { verifyToken } from '@/lib/auth';
import { transporter, mailOptions } from '@/lib/emailService';

export async function GET(req, { params }) {
  try {
    const token = req.cookies.get('admin_token')?.value;
    const authUser = await verifyToken(token);
    if (!authUser) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await connectToDatabase();

    const application = await Application.findById(id);
    if (!application) {
      return NextResponse.json({ message: 'Application not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, application });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const token = req.cookies.get('admin_token')?.value;
    const authUser = await verifyToken(token);
    if (!authUser) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    await connectToDatabase();

    const updatedApplication = await Application.findByIdAndUpdate(id, body, { new: true });
    if (!updatedApplication) {
      return NextResponse.json({ message: 'Application not found' }, { status: 404 });
    }

    // Optional: send status update email if requested
    if (body.notifyApplicant && body.status) {
      try {
        await transporter.sendMail({
          ...mailOptions,
          to: updatedApplication.email,
          subject: `Update regarding your application for ${updatedApplication.jobTitle} - Maurya Technologies`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px;">
              <h2>Dear ${updatedApplication.name},</h2>
              <p>We wanted to give you an update on your application for the <strong>${updatedApplication.jobTitle}</strong> position.</p>
              <p>Your current application status is: <strong>${body.status}</strong></p>
              ${body.emailMessage ? `<p>${body.emailMessage}</p>` : ''}
              <p>Best regards,<br/>Team Maurya Technologies</p>
            </div>
          `,
        });
      } catch (mailErr) {
        console.error('Failed to send status update email:', mailErr);
      }
    }

    return NextResponse.json({ success: true, application: updatedApplication });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const token = req.cookies.get('admin_token')?.value;
    const authUser = await verifyToken(token);
    if (!authUser) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await connectToDatabase();

    await Application.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: 'Application deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
