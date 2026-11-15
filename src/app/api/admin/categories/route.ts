import { NextRequest, NextResponse } from 'next/server';
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  addSubcategory,
} from '@/lib/db';
import { checkAdminAuth } from '@/lib/adminAuth';

export async function GET(request: NextRequest) {
  try {
    const auth = checkAdminAuth(request);
    if (!auth.authorized) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }
    const categories = getCategories();
    return NextResponse.json({ success: true, categories });
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
    const { action } = body;

    if (action === 'add-subcategory') {
      const { categorySlug, subcategory } = body;
      if (!categorySlug || !subcategory?.name || !subcategory?.slug) {
        return NextResponse.json(
          { success: false, message: 'categorySlug and subcategory (name, slug) are required.' },
          { status: 400 }
        );
      }
      const updated = addSubcategory(categorySlug, subcategory, auth.email);
      return NextResponse.json({ success: true, category: updated });
    }

    // Default: Add main category
    if (!body.name || !body.slug) {
      return NextResponse.json({ success: false, message: 'Name and slug are required.' }, { status: 400 });
    }

    const categoryItem = {
      id: body.id || `cat-${Date.now()}`,
      slug: body.slug,
      name: body.name,
      hindiName: body.hindiName || body.name,
      description: body.description || '',
      image: body.image || 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000',
      subcategories: Array.isArray(body.subcategories) ? body.subcategories : [],
    };

    const created = addCategory(categoryItem, auth.email);
    return NextResponse.json({ success: true, category: created }, { status: 201 });
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
    const { slug, updates } = body;
    if (!slug || !updates) {
      return NextResponse.json({ success: false, message: 'Category slug and updates required.' }, { status: 400 });
    }

    const updated = updateCategory(slug, updates, auth.email);
    if (!updated) {
      return NextResponse.json({ success: false, message: 'Category not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, category: updated });
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
    const slug = searchParams.get('slug');
    const force = searchParams.get('force') === 'true';

    if (!slug) {
      return NextResponse.json({ success: false, message: 'Category slug is required' }, { status: 400 });
    }

    const res = deleteCategory(slug, force, auth.email);
    if (!res.success) {
      return NextResponse.json({ success: false, message: res.message }, { status: 400 });
    }
    return NextResponse.json({ success: true, message: 'Category removed successfully.' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

