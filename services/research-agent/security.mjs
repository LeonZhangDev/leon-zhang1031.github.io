import { randomBytes, scrypt as scryptCallback, timingSafeEqual, createHash } from 'node:crypto';
import { promisify } from 'node:util';

const scrypt = promisify(scryptCallback);
export const tokenHash = (token) => createHash('sha256').update(token).digest('hex');
export const newToken = () => randomBytes(32).toString('base64url');
export async function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const key = await scrypt(password, salt, 64);
  return `scrypt:${salt}:${key.toString('hex')}`;
}
export async function verifyPassword(password, stored) {
  const [, salt, key] = stored.split(':');
  const actual = await scrypt(password, salt, 64);
  const expected = Buffer.from(key, 'hex');
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}
export function readSession(cookie = '') {
  const value = cookie.split(';').map(item => item.trim()).find(item => item.startsWith('research_session='))?.slice('research_session='.length);
  return value && /^[A-Za-z0-9_-]{43}$/.test(value) ? value : null;
}
export function sessionCookie(token, basePath, maxAge = 28_800, secure = false) {
  return `research_session=${token}; Path=${basePath}; HttpOnly; SameSite=Strict; Max-Age=${maxAge}${secure ? '; Secure' : ''}`;
}
export function redact(value) {
  if (typeof value === 'string') return value
    .replace(/\b(?:sk-|lsv2_|tvly-)[A-Za-z0-9_-]{8,}/g, '[REDACTED_SECRET]')
    .replace(/\b(Bearer\s+)[A-Za-z0-9._~-]+/gi, '$1[REDACTED_SECRET]')
    .replace(/\b(password|api[_-]?key|token|secret)\s*[:=]\s*[^\s,;]+/gi, '$1=[REDACTED_SECRET]');
  if (Array.isArray(value)) return value.map(redact);
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key,
    /password|authorization|cookie|api.?key|secret|^token$/i.test(key) ? '[REDACTED_SECRET]' : redact(item)]));
  return value;
}
