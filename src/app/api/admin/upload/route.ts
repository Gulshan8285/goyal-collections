import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { checkAdminAuth } from '@/lib/adminAuth';
import { logAdminActivity } from '@/lib/db';

const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');

// Allowed image formats
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.svg'];
const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
  'image/svg+xml',
];

export async function POST(request: NextRequest) {
  try {
    const auth = checkAdminAuth(request);
    if (!auth.authorized) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    try {
      if (!fs.existsSync(UPLOADS_DIR)) {
        fs.mkdirSync(UPLOADS_DIR, { recursive: true });
      }
    } catch (e) {
      // In read-only environment, will fallback to data URL
    }

    const formData = await request.formData();
    const files = formData.getAll('files') as File[];

    if (!files || files.length === 0) {
      const singleFile = formData.get('file') as File;
      if (singleFile) {
        files.push(singleFile);
      }
    }

    if (files.length === 0) {
      return NextResponse.json({ success: false, message: 'No file uploaded.' }, { status: 400 });
    }

    const uploadedResults: { url: string; originalName: string; size: number; format: string }[] = [];

    for (const file of files) {
      const originalExt = path.extname(file.name).toLowerCase();
      if (!ALLOWED_EXTENSIONS.includes(originalExt) && !ALLOWED_MIME_TYPES.includes(file.type)) {
        return NextResponse.json(
          {
            success: false,
            message: `Unsupported file format (${originalExt || file.type}). Allowed: JPG, PNG, WebP, AVIF, SVG.`,
          },
          { status: 400 }
        );
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const safeName = file.name
        .replace(originalExt, '')
        .toLowerCase()
        .replace(/[^a-z0-9_-]/g, '-');
      const uniqueName = `mirli-${safeName}-${Date.now()}${originalExt}`;
      const filePath = path.join(UPLOADS_DIR, uniqueName);

      let publicUrl = `/uploads/${uniqueName}`;
      try {
        fs.writeFileSync(filePath, buffer);
      } catch (err: any) {
        // Fallback to data URL on read-only environments
        const mime = file.type || 'image/jpeg';
        publicUrl = `data:${mime};base64,${buffer.toString('base64')}`;
      }

      uploadedResults.push({
        url: publicUrl,
        originalName: file.name,
        size: file.size,
        format: originalExt.replace('.', '').toUpperCase(),
      });
    }

    logAdminActivity(
      'Image Uploaded',
      'Settings',
      `Uploaded ${uploadedResults.length} asset(s): ${uploadedResults.map((u) => u.originalName).join(', ')}`,
      auth.email
    );

    return NextResponse.json({
      success: true,
      files: uploadedResults,
      url: uploadedResults[0]?.url,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
