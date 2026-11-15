import { NextRequest, NextResponse } from 'next/server';
import { getCoupons, createCoupon, deleteCoupon } from '@/lib/db';

export async function GET() {
  try {
    const coupons = getCoupons();
    return NextResponse.json({ success: true, coupons });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.code || !body.discountPercent) {
      return NextResponse.json(
        { success: false, message: 'Code and discount percentage are required' },
        { status: 400 }
      );
    }

    const newCoupon = createCoupon({
      code: body.code.toUpperCase().trim(),
      discountPercent: Number(body.discountPercent),
      maxDiscount: body.maxDiscount ? Number(body.maxDiscount) : undefined,
      minOrder: Number(body.minOrder || 0),
      description: body.description || `${body.discountPercent}% off`,
      active: body.active !== undefined ? body.active : true,
      expiresAt: body.expiresAt || '2026-12-31',
    });

    return NextResponse.json({ success: true, coupon: newCoupon }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    if (!code) {
      return NextResponse.json({ success: false, message: 'Coupon code required' }, { status: 400 });
    }
    const deleted = deleteCoupon(code);
    return NextResponse.json({ success: deleted });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
