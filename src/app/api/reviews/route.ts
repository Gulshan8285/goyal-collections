import { NextRequest, NextResponse } from 'next/server';
import { getReviews, addReview } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');
    if (!productId) {
      return NextResponse.json({ success: false, message: 'productId is required' }, { status: 400 });
    }

    const reviews = getReviews(productId);
    return NextResponse.json({ success: true, reviews });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const customerName = body.customerName || body.author;
    if (!body.productId || !customerName || !body.rating || !body.comment) {
      return NextResponse.json(
        { success: false, message: 'Product ID, customer name, rating, and comment are required' },
        { status: 400 }
      );
    }

    const created = addReview({
      productId: body.productId,
      customerName: customerName,
      rating: Number(body.rating),
      title: body.title || 'Verified Review',
      comment: body.comment,
      verifiedPurchase: true,
    });

    return NextResponse.json({ success: true, review: created }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
