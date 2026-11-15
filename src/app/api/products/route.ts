import { NextRequest, NextResponse } from 'next/server';
import { getProducts, createProduct } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || undefined;
    const subcategory = searchParams.get('subcategory') || undefined;
    const search = searchParams.get('q') || searchParams.get('search') || undefined;
    const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;
    const size = searchParams.get('size') || undefined;
    const color = searchParams.get('color') || undefined;
    const sort = searchParams.get('sort') || 'newest';
    const featured = searchParams.get('featured') === 'true';
    const trending = searchParams.get('trending') === 'true';
    const newArrival = searchParams.get('newArrival') === 'true';
    const bestSeller = searchParams.get('bestSeller') === 'true';
    const specialOffer = searchParams.get('specialOffer') === 'true';
    const limit = searchParams.get('limit') ? Number(searchParams.get('limit')) : undefined;

    const result = getProducts({
      category,
      subcategory,
      search,
      minPrice,
      maxPrice,
      size,
      color,
      sort,
      featured,
      trending,
      newArrival,
      bestSeller,
      specialOffer,
      limit,
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
    const body = await request.json();
    if (!body.name || !body.price || !body.category || !body.subcategory) {
      return NextResponse.json(
        { success: false, message: 'Name, price, category, and subcategory are required.' },
        { status: 400 }
      );
    }

    const created = createProduct({
      ...body,
      price: Number(body.price),
      mrp: Number(body.mrp || body.price),
      discountPercent: Math.round(((Number(body.mrp || body.price) - Number(body.price)) / Number(body.mrp || body.price)) * 100),
      rating: body.rating || 5.0,
      reviewCount: body.reviewCount || 0,
      stock: Number(body.stock || 20),
      images: Array.isArray(body.images) && body.images.length > 0 ? body.images : ['https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000'],
      sizes: Array.isArray(body.sizes) && body.sizes.length > 0 ? body.sizes : ['M', 'L'],
      colors: Array.isArray(body.colors) && body.colors.length > 0 ? body.colors : [{ name: 'Obsidian Black', hex: '#000000' }],
      details: Array.isArray(body.details) ? body.details : ['Handcrafted luxury quality.'],
      specifications: Array.isArray(body.specifications) ? body.specifications : [{ label: 'Origin', value: 'India' }],
    });

    return NextResponse.json({ success: true, product: created }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
