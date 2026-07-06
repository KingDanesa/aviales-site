import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    const items = await prisma.vacancy.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: 'Ошибка загрузки вакансий' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await getSession())) {
    return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });
  }
  try {
    const body = await request.json();

    const vacancy = await prisma.vacancy.create({
      data: body,
    });
    
    return NextResponse.json(vacancy);
  } catch (error) {
    return NextResponse.json({ error: 'Ошибка создания вакансии' }, { status: 500 });
  }
}
