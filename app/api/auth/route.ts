import { NextResponse } from 'next/server';
import { loginIn } from '@/lib/validators';
import { checkPassword, setAdminSession, clearAdminSession, isAdmin } from '@/lib/auth';

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json(
      { error: { code: 'bad_request', message: 'Invalid JSON body' } },
      { status: 400 }
    );
  }

  const parsed = loginIn.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: { code: 'validation', message: 'Password is required' } },
      { status: 422 }
    );
  }

  const ok = await checkPassword(parsed.data.password); if (ok) { await setAdminSession(); }
  if (!ok) {
    return NextResponse.json(
      { error: { code: 'unauthorized', message: 'Invalid password' } },
      { status: 401 }
    );
  }

  return NextResponse.json({ data: { authenticated: true } });
}

export async function DELETE() {
  await clearAdminSession();
  return NextResponse.json({ data: { authenticated: false } });
}

export async function GET() {
  const admin = await isAdmin();
  return NextResponse.json({ data: { authenticated: admin } });
}
