import { NextResponse } from 'next/server';
import { feedbackUpdate } from '@/lib/validators';
import { updateFeedback, deleteFeedback } from '@/lib/dal';
import { isAdmin } from '@/lib/auth';

type Params = { params: Promise<{ id: string }> };

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

export async function PUT(req: Request, { params }: Params) {
  const auth = await requireAdmin();
  if (auth) return auth;

  const { id } = await params;
  const idNum = Number(id);
  if (!Number.isInteger(idNum) || idNum < 1) {
    return NextResponse.json(
      { error: { code: 'validation', message: 'Invalid feedback id' } },
      { status: 422 }
    );
  }

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json(
      { error: { code: 'bad_request', message: 'Invalid JSON body' } },
      { status: 400 }
    );
  }

  const parsed = feedbackUpdate.safeParse(payload);
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

  const updated = await updateFeedback(idNum, parsed.data);
  if (!updated) {
    return NextResponse.json(
      { error: { code: 'not_found', message: 'Feedback not found' } },
      { status: 404 }
    );
  }

  return NextResponse.json({ data: updated });
}

export async function DELETE(_req: Request, { params }: Params) {
  const auth = await requireAdmin();
  if (auth) return auth;

  const { id } = await params;
  const idNum = Number(id);
  if (!Number.isInteger(idNum) || idNum < 1) {
    return NextResponse.json(
      { error: { code: 'validation', message: 'Invalid feedback id' } },
      { status: 422 }
    );
  }

  const deleted = await deleteFeedback(idNum);
  if (!deleted) {
    return NextResponse.json(
      { error: { code: 'not_found', message: 'Feedback not found' } },
      { status: 404 }
    );
  }

  return NextResponse.json({ data: deleted });
}
