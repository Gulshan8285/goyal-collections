import { NextRequest, NextResponse } from 'next/server';
import { validateCoupon } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { code, subtotal } = await request.json();
    if (!code) {
      return NextResponse.json({ success: false, message: 'Please enter a coupon code.' }, { status: 400 });
    }

    const result = validateCoupon(code, Number(subtotal || 0));
    return NextResponse.json({
      success: result.valid,
      discount: result.discount,
      message: result.message,
      coupon: result.coupon,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
