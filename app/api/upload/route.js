import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';

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

// Extensions that must line up with the declared MIME type. A browser-supplied
// Content-Type alone is trivially spoofed, so both have to agree.
const ALLOWED_EXTENSIONS = {
  'application/pdf': ['pdf'],
  'image/png': ['png'],
  'image/jpeg': ['jpg', 'jpeg'],
  'image/jpg': ['jpg', 'jpeg'],
  'image/webp': ['webp'],
  'application/msword': ['doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['docx'],
};

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

export async function POST(req) {
  try {
    // 0. Rate limit. This endpoint is intentionally public so job applicants can
    //    attach a resume without an account, so it is the only thing standing
    //    between an anonymous caller and unbounded paid blob storage.
    const clientIp = getClientIp(req);
    const rateCheck = checkRateLimit(`upload-${clientIp}`, 5, 10 * 60 * 1000);

    if (!rateCheck.isAllowed) {
      return NextResponse.json(
        {
          success: false,
          message: `Too many uploads from this network. Please wait ${rateCheck.resetInSeconds} seconds before trying again.`,
        },
        { status: 429 }
      );
    }

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

    // 3. Validate that the extension matches the declared MIME type
    const extension = (file.name || '').split('.').pop()?.toLowerCase() || '';
    if (!ALLOWED_EXTENSIONS[file.type].includes(extension)) {
      return NextResponse.json(
        { success: false, message: 'File extension does not match its content type.' },
        { status: 400 }
      );
    }

    // 4. Upload to Vercel Blob if token exists
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_').toLowerCase();
      const filename = `uploads/${Date.now()}-${sanitizedName}`;

      const blob = await put(filename, file, {
        access: 'public',
        addRandomSuffix: true,
        // Never let a stored file be sniffed into something executable.
        contentType: file.type,
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
