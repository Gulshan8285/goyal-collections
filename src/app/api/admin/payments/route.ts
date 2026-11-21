import { NextRequest, NextResponse } from 'next/server';
import { getPayments, updatePaymentStatus } from '@/lib/db';
import { checkAdminAuth } from '@/lib/adminAuth';

export async function GET(request: NextRequest) {
  try {
    const auth = checkAdminAuth(request);
    if (!auth.authorized) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || undefined;
    const status = searchParams.get('status') || undefined;

    const payments = getPayments(search, status);
    return NextResponse.json({ success: true, payments, total: payments.length });
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
    const { id, status, refundAmount } = body;

    if (!id || !status) {
      return NextResponse.json({ success: false, message: 'Payment ID and status required' }, { status: 400 });
    }

    const updated = updatePaymentStatus(id, status, refundAmount, auth.email);
    if (!updated) {
      return NextResponse.json({ success: false, message: 'Transaction not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, payment: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
