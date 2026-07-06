import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const vacancy = await prisma.vacancy.findUnique({ where: { id } });
    if (!vacancy) return NextResponse.json({ error: 'Не найдено' }, { status: 404 });
    return NextResponse.json(vacancy);
  } catch {
    return NextResponse.json({ error: 'Ошибка загрузки' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await getSession())) {
    return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });
  }
  try {
    const { id } = await params;
    const body = await request.json();

    const vacancy = await prisma.vacancy.update({
      where: { id },
      data: body,
    });
    
    return NextResponse.json(vacancy);
  } catch (error) {
    return NextResponse.json({ error: 'Ошибка обновления' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await getSession())) {
    return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });
  }
  try {
    const { id } = await params;
    await prisma.vacancy.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Ошибка удаления' }, { status: 500 });
  }
}
