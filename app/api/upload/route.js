import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';

// Allowed MIME types
const ALLOWED_MIME_TYPES = new Set([
  'application/pdf',
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/webp',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file || typeof file === 'string') {
      return NextResponse.json({ success: false, message: 'No valid file provided.' }, { status: 400 });
    }

    // 1. Validate File Size
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { success: false, message: 'File exceeds maximum allowed limit of 10MB.' },
        { status: 400 }
      );
    }

    // 2. Validate MIME Type
    if (!ALLOWED_MIME_TYPES.has(file.type)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid file format. Only PDF, DOC, DOCX, PNG, JPG, and WEBP files are permitted.',
        },
        { status: 400 }
      );
    }

    // 3. Upload to Vercel Blob if token exists
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_').toLowerCase();
      const filename = `${Date.now()}-${sanitizedName}`;

      const blob = await put(filename, file, {
        access: 'public',
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });

      return NextResponse.json({
        success: true,
        url: blob.url,
        downloadUrl: blob.downloadUrl || blob.url,
      });
    }

    return NextResponse.json(
      {
        success: false,
        message: 'Storage service token (BLOB_READ_WRITE_TOKEN) is not configured. Please use a direct resume link.',
      },
      { status: 503 }
    );
  } catch (error) {
    console.error('Upload security error:', error);
    return NextResponse.json(
      { success: false, message: 'Error processing file upload. Please provide a direct resume link.' },
      { status: 500 }
    );
  }
}
