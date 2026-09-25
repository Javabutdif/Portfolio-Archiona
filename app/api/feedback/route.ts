import { NextResponse } from 'next/server';
import { feedbackIn } from '@/lib/validators';
import { createFeedback, listPublicFeedback } from '@/lib/dal';

const recentSubmits = new Map<string, number>();

export async function GET() {
  const items = await listPublicFeedback(100);
  return NextResponse.json({ data: items });
}

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

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const now = Date.now();
  const last = recentSubmits.get(ip);
  if (last && now - last < 60_000) {
    return NextResponse.json(
      { error: { code: 'rate_limited', message: 'Please wait before submitting again' } },
      { status: 429 }
    );
  }
  recentSubmits.set(ip, now);

  const record = await createFeedback(parsed.data.name, parsed.data.body);
  return NextResponse.json({ data: record }, { status: 201 });
}
