import { NextRequest, NextResponse } from 'next/server';
import { getHeroSlides, addHeroSlide, updateHeroSlide, deleteHeroSlide } from '@/lib/db';
import { checkAdminAuth } from '@/lib/adminAuth';

export async function GET(request: NextRequest) {
  try {
    const auth = checkAdminAuth(request);
    if (!auth.authorized) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }
    const slides = getHeroSlides();
    return NextResponse.json({ success: true, slides });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = checkAdminAuth(request);
    if (!auth.authorized) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    if (!body.title || !body.image) {
      return NextResponse.json({ success: false, message: 'Title and image are required.' }, { status: 400 });
    }

    const created = addHeroSlide(
      {
        title: body.title,
        subtitle: body.subtitle || '',
        badge: body.badge || 'EXCLUSIVE DROP',
        ctaText: body.ctaText || 'EXPLORE COLLECTION',
        ctaLink: body.ctaLink || '/shop',
        image: body.image,
        active: body.active !== undefined ? body.active : true,
        order: Number(body.order || 1),
      },
      auth.email
    );

    return NextResponse.json({ success: true, slide: created }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const auth = checkAdminAuth(request);
    if (!auth.authorized) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id, updates } = body;
    if (!id || !updates) {
      return NextResponse.json({ success: false, message: 'Slide ID and updates required' }, { status: 400 });
    }

    const updated = updateHeroSlide(id, updates, auth.email);
    if (!updated) {
      return NextResponse.json({ success: false, message: 'Slide not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, slide: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const auth = checkAdminAuth(request);
    if (!auth.authorized) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, message: 'Slide ID is required' }, { status: 400 });
    }

    const deleted = deleteHeroSlide(id, auth.email);
    if (!deleted) {
      return NextResponse.json({ success: false, message: 'Slide not found or already deleted' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Hero banner deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

