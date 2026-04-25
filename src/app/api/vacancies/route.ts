import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

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
