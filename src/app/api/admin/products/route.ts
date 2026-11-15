import { NextRequest, NextResponse } from 'next/server';
import { getProducts, createProduct } from '@/lib/db';
import { checkAdminAuth } from '@/lib/adminAuth';

export async function GET(request: NextRequest) {
  try {
    const auth = checkAdminAuth(request);
    if (!auth.authorized) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || undefined;
    const subcategory = searchParams.get('subcategory') || undefined;
    const search = searchParams.get('q') || searchParams.get('search') || undefined;
    const status = (searchParams.get('status') as 'active' | 'inactive') || undefined;
    const sort = searchParams.get('sort') || 'newest';

    const result = getProducts({
      category,
      subcategory,
      search,
      status,
      includeInactive: true,
      sort,
    });

    return NextResponse.json({
      success: true,
      products: result.products,
      total: result.total,
    });
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
    if (!body.name || !body.price || !body.category || !body.subcategory) {
      return NextResponse.json(
        { success: false, message: 'Name, price, category, and subcategory are required.' },
        { status: 400 }
      );
    }

    const created = createProduct(
      {
        ...body,
        price: Number(body.price),
        mrp: Number(body.mrp || body.price),
        discountPercent: Math.round(
          ((Number(body.mrp || body.price) - Number(body.price)) / Number(body.mrp || body.price)) * 100
        ),
        rating: body.rating || 5.0,
        reviewCount: body.reviewCount || 0,
        stock: Number(body.stock || 20),
        status: body.status || 'active',
        images:
          Array.isArray(body.images) && body.images.length > 0
            ? body.images
            : ['https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000'],
        sizes:
          Array.isArray(body.sizes) && body.sizes.length > 0
            ? body.sizes
            : ['UK 7', 'UK 8', 'UK 9', 'UK 10'],
        colors:
          Array.isArray(body.colors) && body.colors.length > 0
            ? body.colors
            : [{ name: 'Obsidian Black', hex: '#000000' }],
        details: Array.isArray(body.details) && body.details.length > 0
          ? body.details
          : ['Handcrafted luxury quality.', 'Goodyear-welted architectural finish.'],
        specifications: Array.isArray(body.specifications) && body.specifications.length > 0
          ? body.specifications
          : [
              { label: 'Primary Material', value: 'Full-Grain Calfskin' },
              { label: 'Origin', value: 'Handcrafted in Agra, India' },
            ],
      },
      auth.email
    );

    return NextResponse.json({ success: true, product: created }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

