import { NextRequest, NextResponse } from 'next/server';
import { getShippingRecords, updateShippingRecord } from '@/lib/db';
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

    const shipping = getShippingRecords(search, status);
    return NextResponse.json({ success: true, shipping, total: shipping.length });
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
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ success: false, message: 'Shipping record ID required' }, { status: 400 });
    }

    const updated = updateShippingRecord(id, updates, auth.email);
    if (!updated) {
      return NextResponse.json({ success: false, message: 'Shipment not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, shipping: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
