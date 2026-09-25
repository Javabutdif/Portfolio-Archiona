import { neon } from '@neondatabase/serverless';
import { createHash } from 'node:crypto';

const sql = neon(process.env.DATABASE_URL ?? '');

export interface Feedback {
  id: number;
  name_hash: string;
  display_name: string;
  body: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export function hashName(raw: string): string {
  return createHash('sha256')
    .update(raw.trim().toLowerCase().split(/\s+/).join(' '), 'utf8')
    .digest('hex');
}

export function maskName(raw: string): string {
  const name = raw
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(' ');
  if (name.length <= 3) return name + '***';
  return name.slice(0, 3) + '***';
}

export async function listPublicFeedback(
  limit = 100
): Promise<Pick<Feedback, 'id' | 'display_name' | 'body' | 'created_at'>[]> {
  return (await sql`
    SELECT id, display_name, body, created_at
    FROM feedback
    WHERE deleted_at IS NULL
    ORDER BY created_at DESC
    LIMIT ${limit}
  `) as unknown as Pick<
    Feedback,
    'id' | 'display_name' | 'body' | 'created_at'
  >[];
}

export async function createFeedback(
  rawName: string,
  body: string
): Promise<Feedback> {
  const displayName = maskName(rawName);
  const nameHash = hashName(rawName);
  const rows = (await sql`
    INSERT INTO feedback (name_hash, display_name, body)
    VALUES (${nameHash}, ${displayName}, ${body})
    RETURNING id, display_name, body, created_at
  `) as unknown as Pick<
    Feedback,
    'id' | 'display_name' | 'body' | 'created_at'
  >[];
  const row = rows[0];
  if (!row) throw new Error('Failed to create feedback');
  return {
    ...row,
    name_hash: nameHash,
    updated_at: row.created_at,
    deleted_at: null,
  };
}

export async function listAdminFeedback(
  includeDeleted = false
): Promise<Feedback[]> {
  if (includeDeleted) {
    return (await sql`
      SELECT * FROM feedback ORDER BY created_at DESC
    `) as unknown as Feedback[];
  }
  return (await sql`
    SELECT * FROM feedback WHERE deleted_at IS NULL ORDER BY created_at DESC
  `) as unknown as Feedback[];
}

export async function updateFeedback(
  id: number,
  fields: { display_name?: string; body?: string }
): Promise<Feedback | null> {
  if (fields.display_name !== undefined && fields.body !== undefined) {
    const rows = (await sql`
      UPDATE feedback
      SET display_name = ${fields.display_name},
          body = ${fields.body},
          updated_at = now()
      WHERE id = ${id}
      RETURNING *
    `) as unknown as Feedback[];
    return rows[0] ?? null;
  }
  if (fields.display_name !== undefined) {
    const rows = (await sql`
      UPDATE feedback
      SET display_name = ${fields.display_name},
          updated_at = now()
      WHERE id = ${id}
      RETURNING *
    `) as unknown as Feedback[];
    return rows[0] ?? null;
  }
  if (fields.body !== undefined) {
    const rows = (await sql`
      UPDATE feedback
      SET body = ${fields.body},
          updated_at = now()
      WHERE id = ${id}
      RETURNING *
    `) as unknown as Feedback[];
    return rows[0] ?? null;
  }
  const existing = await listAdminFeedback(true);
  return existing.find((f) => f.id === id) ?? null;
}

export async function deleteFeedback(
  id: number
): Promise<Feedback | null> {
  const rows = (await sql`
    UPDATE feedback
    SET deleted_at = now(), updated_at = now()
    WHERE id = ${id}
    RETURNING *
  `) as unknown as Feedback[];
  return rows[0] ?? null;
}
