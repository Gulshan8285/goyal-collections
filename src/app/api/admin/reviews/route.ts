import { NextRequest, NextResponse } from 'next/server';
import { getAllReviews, updateReviewStatus, deleteReview } from '@/lib/db';
import { checkAdminAuth } from '@/lib/adminAuth';

export async function GET(request: NextRequest) {
  try {
    const auth = checkAdminAuth(request);
    if (!auth.authorized) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const reviews = getAllReviews();
    return NextResponse.json({ success: true, reviews, total: reviews.length });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const auth = checkAdminAuth(request);
    if (!auth.authorized) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { productId, reviewId, status } = body;

    if (!productId || !reviewId || !status) {
      return NextResponse.json(
        { success: false, message: 'productId, reviewId, and status are required.' },
        { status: 400 }
      );
    }

    const updated = updateReviewStatus(productId, reviewId, status, auth.email);
    if (!updated) {
      return NextResponse.json({ success: false, message: 'Review not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, review: updated });
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
    const productId = searchParams.get('productId');
    const reviewId = searchParams.get('reviewId');

    if (!productId || !reviewId) {
      return NextResponse.json(
        { success: false, message: 'productId and reviewId are required' },
        { status: 400 }
      );
    }

    const deleted = deleteReview(productId, reviewId, auth.email);
    if (!deleted) {
      return NextResponse.json({ success: false, message: 'Review not found or already deleted' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Review deleted successfully.' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

