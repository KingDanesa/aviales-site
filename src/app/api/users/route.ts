import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin, hashPassword } from '@/lib/auth';

// GET — список пользователей (без паролей). Только admin.
export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: 'Нет доступа' }, { status: 403 });
  }
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'asc' },
    select: { id: true, email: true, name: true, role: true, createdAt: true },
  });
  return NextResponse.json(users);
}

// POST — создать пользователя. Только admin.
export async function POST(request: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: 'Нет доступа' }, { status: 403 });

  try {
    const { email, password, role, name } = await request.json();
    const cleanEmail = String(email ?? '').trim().toLowerCase();

    if (!cleanEmail || !password) {
      return NextResponse.json({ error: 'Укажите email и пароль' }, { status: 400 });
    }
    if (String(password).length < 6) {
      return NextResponse.json({ error: 'Пароль должен быть не короче 6 символов' }, { status: 400 });
    }
    const finalRole = role === 'admin' ? 'admin' : 'editor';

    const exists = await prisma.user.findUnique({ where: { email: cleanEmail } });
    if (exists) {
      return NextResponse.json({ error: 'Пользователь с таким email уже существует' }, { status: 409 });
    }

    const user = await prisma.user.create({
      data: {
        email: cleanEmail,
        name: name ? String(name) : null,
        password: await hashPassword(String(password)),
        role: finalRole,
      },
      select: { id: true, email: true, name: true, role: true, createdAt: true },
    });
    return NextResponse.json(user);
  } catch {
    return NextResponse.json({ error: 'Ошибка создания пользователя' }, { status: 500 });
  }
}
