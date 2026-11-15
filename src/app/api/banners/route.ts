import { NextResponse } from 'next/server';
import { getHeroSlides } from '@/lib/db';

export async function GET() {
  try {
    const all = getHeroSlides();
    const active = all.filter((s) => s.active);
    return NextResponse.json({ success: true, slides: active });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

