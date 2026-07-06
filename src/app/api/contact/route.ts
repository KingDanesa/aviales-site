import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Имя, email и сообщение обязательны' },
        { status: 400 }
      );
    }

    // Сохраняем в БД, но даже если база недоступна — форму не ломаем
    try {
      await prisma.contactMessage.create({
        data: { name, phone: phone || '', email, subject: subject || '', message },
      });
    } catch (e) {
      console.error('contact save failed:', e);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}

export async function GET() {
  if (!(await getSession())) {
    return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });
  }
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(messages);
  } catch {
    return NextResponse.json([]);
  }
}
