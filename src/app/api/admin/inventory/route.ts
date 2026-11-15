import { NextRequest, NextResponse } from 'next/server';
import { getStockLogs, adjustStock, getProducts } from '@/lib/db';
import { checkAdminAuth } from '@/lib/adminAuth';

export async function GET(request: NextRequest) {
  try {
    const auth = checkAdminAuth(request);
    if (!auth.authorized) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') ? Number(searchParams.get('limit')) : 100;

    const logs = getStockLogs(limit);
    const { products } = getProducts({ includeInactive: true });

    return NextResponse.json({ success: true, logs, products });
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
    const { productId, newStock, reason } = body;

    if (!productId || newStock === undefined) {
      return NextResponse.json(
        { success: false, message: 'productId and newStock are required' },
        { status: 400 }
      );
    }

    const result = adjustStock(productId, Number(newStock), reason || 'Manual adjustment', auth.email);
    if (!result) {
      return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, product: result.product, log: result.log });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

