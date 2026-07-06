import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin, hashPassword } from '@/lib/auth';

// PATCH — сбросить пароль и/или сменить роль. Только admin.
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: 'Нет доступа' }, { status: 403 });

  try {
    const { id } = await params;
    const { password, role } = await request.json();

    const data: { password?: string; role?: string } = {};

    if (password !== undefined) {
      if (String(password).length < 6) {
        return NextResponse.json({ error: 'Пароль должен быть не короче 6 символов' }, { status: 400 });
      }
      data.password = await hashPassword(String(password));
    }

    if (role !== undefined) {
      const finalRole = role === 'admin' ? 'admin' : 'editor';
      // нельзя снять с себя роль admin (чтобы не остаться без администратора)
      if (id === admin.id && finalRole !== 'admin') {
        return NextResponse.json({ error: 'Нельзя снять роль администратора с самого себя' }, { status: 400 });
      }
      data.role = finalRole;
    }

    if (Object.keys(data).length === 0) {
      return NextResponse.json({ error: 'Нечего обновлять' }, { status: 400 });
    }

    await prisma.user.update({ where: { id }, data });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Ошибка обновления пользователя' }, { status: 500 });
  }
}

// DELETE — удалить пользователя. Только admin, нельзя удалить себя.
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: 'Нет доступа' }, { status: 403 });

  try {
    const { id } = await params;
    if (id === admin.id) {
      return NextResponse.json({ error: 'Нельзя удалить свою учётную запись' }, { status: 400 });
    }
    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Ошибка удаления пользователя' }, { status: 500 });
  }
}
