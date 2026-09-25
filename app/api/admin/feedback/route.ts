import { NextResponse } from 'next/server';
import { feedbackIn, feedbackUpdate } from '@/lib/validators';
import {
  createFeedback,
  listAdminFeedback,
  updateFeedback,
  deleteFeedback,
} from '@/lib/dal';
import { isAdmin } from '@/lib/auth';

async function requireAdmin() {
  const admin = await isAdmin();
  if (!admin) {
    return NextResponse.json(
      { error: { code: 'unauthorized', message: 'Authentication required' } },
      { status: 401 }
    );
  }
  return null;
}

export async function GET() {
  const auth = await requireAdmin();
  if (auth) return auth;

  const items = await listAdminFeedback(false);
  return NextResponse.json({ data: items });
}

export async function POST(req: Request) {
  const auth = await requireAdmin();
  if (auth) return auth;

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json(
      { error: { code: 'bad_request', message: 'Invalid JSON body' } },
      { status: 400 }
    );
  }

  const parsed = feedbackIn.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: {
          code: 'validation',
          message: parsed.error.issues[0]?.message ?? 'Validation failed',
        },
      },
      { status: 422 }
    );
  }

  const record = await createFeedback(parsed.data.name, parsed.data.body);
  return NextResponse.json({ data: record }, { status: 201 });
}
