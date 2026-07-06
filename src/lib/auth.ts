import 'server-only';
import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';

export const SESSION_COOKIE = 'aviales_admin';
export const MAX_AGE = 60 * 60 * 24 * 7; // 7 дней

const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET || 'dev-only-insecure-secret-set-AUTH_SECRET-in-env'
);

export type SessionUser = { id: string; email: string; role: string };

export async function hashPassword(pw: string): Promise<string> {
  return bcrypt.hash(pw, 10);
}

export async function verifyPassword(pw: string, hash: string): Promise<boolean> {
  return bcrypt.compare(pw, hash);
}

export async function createSessionToken(user: SessionUser): Promise<string> {
  return new SignJWT({ email: user.email, role: user.role })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(secret);
}

/** Текущая сессия (или null). Работает в server components и route handlers. */
export async function getSession(): Promise<SessionUser | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    return {
      id: String(payload.sub ?? ''),
      email: String(payload.email ?? ''),
      role: String(payload.role ?? ''),
    };
  } catch {
    return null;
  }
}

/** Требует любого вошедшего пользователя (admin или editor). */
export async function requireUser(): Promise<SessionUser | null> {
  return getSession();
}

/** Требует роль admin. */
export async function requireAdmin(): Promise<SessionUser | null> {
  const s = await getSession();
  return s && s.role === 'admin' ? s : null;
}
