import { NextResponse } from 'next/server';
import { transporter, mailOptions } from '@/lib/emailService';

export async function POST(req) {
    try {
        const payload = await req.json();
        const { type, data } = payload;

        let subject = '';
        let htmlContent = '';

        if (type === 'user') {
            subject = `New User Inquiry from ${data.name}`;
            htmlContent = `
                <h2>General User Inquiry</h2>
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Subject:</strong> ${data.subject}</p>
                <p><strong>Message:</strong></p>
                <p>${data.message}</p>
            `;
        } else if (type === 'company') {
            subject = `New Project Request from ${data.companyName}`;
            htmlContent = `
                <h2>Company Project Inquiry</h2>
                <p><strong>Contact Name:</strong> ${data.contactName}</p>
                <p><strong>Work Email:</strong> ${data.workEmail}</p>
                <p><strong>Company Name:</strong> ${data.companyName}</p>
                <p><strong>Job Title:</strong> ${data.jobTitle || 'N/A'}</p>
                <p><strong>Service Needed:</strong> ${data.service}</p>
                <p><strong>Estimated Budget:</strong> ${data.budget}</p>
                <p><strong>Project Details:</strong></p>
                <p>${data.details}</p>
            `;
        } else if (type === 'sales') {
            subject = `New Partnership Inquiry from ${data.organization}`;
            htmlContent = `
                <h2>Partnership / Sales Inquiry</h2>
                <p><strong>Full Name:</strong> ${data.fullName}</p>
                <p><strong>Official Email:</strong> ${data.officialEmail}</p>
                <p><strong>Organization:</strong> ${data.organization}</p>
                <p><strong>Partnership Type:</strong> ${data.partnershipType}</p>
                <p><strong>Message:</strong></p>
                <p>${data.message}</p>
            `;
        } else {
            return NextResponse.json({ message: 'Invalid submission type' }, { status: 400 });
        }

        await transporter.sendMail({
            ...mailOptions,
            subject,
            html: htmlContent,
            replyTo: type === 'user' ? data.email : (type === 'company' ? data.workEmail : data.officialEmail),
        });

        return NextResponse.json({ success: true, message: 'Message sent successfully.' }, { status: 200 });

    } catch (error) {
        console.error('SMTP Send Error:', error);
        return NextResponse.json({ message: 'Error sending email. Please try again.' }, { status: 500 });
    }
}
