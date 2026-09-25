import crypto from 'node:crypto';

export function maskName(raw: string): string {
  const name = raw.trim().split(/\s+/).map((w) =>
    w ? w[0].toUpperCase() + w.slice(1) : w
  ).join(' ');
  if (name.length <= 3) return name + '***';
  return name.slice(0, 3) + '***';
}

export function hashName(raw: string): string {
  const normalized = raw.trim().toLowerCase().split(/\s+/).join(' ');
  return crypto.createHash('sha256').update(normalized, 'utf8').digest('hex');
}
