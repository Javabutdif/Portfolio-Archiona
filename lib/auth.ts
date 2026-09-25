import { cookies } from 'next/headers';
import { getIronSession, type IronSession } from 'iron-session';
import { timingSafeEqual } from 'node:crypto';

const COOKIE_NAME = 'admin_session';

function sessionOpts() {
  return {
    password: process.env.SESSION_SECRET ?? '',
    cookieName: COOKIE_NAME,
    cookieOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      maxAge: 60 * 60 * 24 * 7,
    },
  };
}

type SessionData = { isAdmin: boolean };

export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  const session: IronSession<SessionData> = await getIronSession(
    store,
    sessionOpts()
  );
  return session.isAdmin === true;
}

export async function setAdminSession(): Promise<void> {
  const store = await cookies();
  const session: IronSession<SessionData> = await getIronSession(
    store,
    sessionOpts()
  );
  session.isAdmin = true;
  await session.save();
}

export async function clearAdminSession(): Promise<void> {
  const store = await cookies();
  const session: IronSession<SessionData> = await getIronSession(
    store,
    sessionOpts()
  );
  session.isAdmin = false;
  await session.destroy();
}

export async function checkPassword(password: string): Promise<boolean> {
  const expected = process.env.ADMIN_PASSWORD ?? '';
  if (!expected) return false;
  const a = Buffer.from(password, 'utf8');
  const b = Buffer.from(expected, 'utf8');
  return a.length === b.length && timingSafeEqual(a, b);
}
