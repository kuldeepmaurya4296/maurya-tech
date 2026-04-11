import { NextResponse } from 'next/server';
import { transporter, mailOptions } from '@/lib/emailService';

export async function POST(req) {
    try {
        const data = await req.json();

        const subject = `Job Application: ${data.jobTitle} - ${data.name}`;
        const htmlContent = `
            <h2>New Job Application Received</h2>
            <p><strong>Applicant Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
            <p><strong>Applying for Role:</strong> ${data.jobTitle}</p>
            <hr />
            <p><strong>LinkedIn Profile:</strong> <a href="${data.linkedin}">${data.linkedin}</a></p>
            <p><strong>Resume Link:</strong> <a href="${data.resume}">${data.resume}</a></p>
            ${data.coverLetter ? `
            <p><strong>Cover Letter:</strong></p>
            <p>${data.coverLetter}</p>
            ` : ''}
        `;

        await transporter.sendMail({
            ...mailOptions,
            subject,
            html: htmlContent,
            replyTo: data.email,
        });

        return NextResponse.json({ success: true, message: 'Application submitted successfully.' }, { status: 200 });

    } catch (error) {
        console.error('SMTP Apply Error:', error);
        return NextResponse.json({ message: 'Error submitting application. Please try again.' }, { status: 500 });
    }
}
