import { NextRequest, NextResponse } from 'next/server';
import { getOrders, createOrder } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email') || undefined;
    const phone = searchParams.get('phone') || undefined;
    const userId = searchParams.get('userId') || undefined;

    const orders = getOrders({ email, phone, userId });
    return NextResponse.json({ success: true, orders });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.customerName || !body.phone || !body.shippingAddress || !body.items || body.items.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Missing required order details (customerName, phone, address, items).' },
        { status: 400 }
      );
    }

    const order = createOrder({
      customerName: body.customerName,
      email: body.email || 'customer@mirli.store',
      phone: body.phone,
      shippingAddress: body.shippingAddress,
      items: body.items,
      subtotal: Number(body.subtotal || 0),
      discount: Number(body.discount || 0),
      couponCode: body.couponCode || undefined,
      deliveryCharge: Number(body.deliveryCharge || 0),
      totalAmount: Number(body.totalAmount || 0),
      paymentMethod: body.paymentMethod || 'COD',
      paymentId: body.paymentId,
    });

    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
