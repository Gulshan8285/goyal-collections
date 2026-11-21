import { NextRequest, NextResponse } from 'next/server';
import { getAdminUsers, createAdminUser, updateAdminUser, deleteAdminUser } from '@/lib/db';
import { checkAdminAuth } from '@/lib/adminAuth';

export async function GET(request: NextRequest) {
  try {
    const auth = checkAdminAuth(request);
    if (!auth.authorized) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const users = getAdminUsers();
    return NextResponse.json({ success: true, users, total: users.length });
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
    const { name, email, role, roleTitle, status } = body;

    if (!name || !email || !role) {
      return NextResponse.json({ success: false, message: 'Name, email, and role are required' }, { status: 400 });
    }

    const created = createAdminUser(
      {
        name,
        email,
        role,
        roleTitle: roleTitle || role,
        status: status || 'active',
      },
      auth.email
    );

    return NextResponse.json({ success: true, user: created }, { status: 201 });
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
      return NextResponse.json({ success: false, message: 'User ID is required' }, { status: 400 });
    }

    const updated = updateAdminUser(id, updates, auth.email);
    if (!updated) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, user: updated });
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
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'User ID is required' }, { status: 400 });
    }

    const deleted = deleteAdminUser(id, auth.email);
    if (!deleted) {
      return NextResponse.json({ success: false, message: 'Cannot delete user (super admin protected)' }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: 'User deleted' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
