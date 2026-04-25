import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const news = await prisma.news.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json({ error: 'Ошибка загрузки новостей' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { titleRu, titleKz, titleEn, contentRu, contentKz, contentEn, category, imageUrl, published } = body;

    // Generate a simple slug from the Russian title
    const slug = titleRu.toLowerCase().replace(/[^a-z0-9а-яё]/g, '-').replace(/-+/g, '-').substring(0, 50) + '-' + Date.now();

    const news = await prisma.news.create({
      data: {
        titleRu, titleKz, titleEn,
        contentRu, contentKz, contentEn,
        category, imageUrl, published,
        slug,
      },
    });
    
    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json({ error: 'Ошибка создания новости' }, { status: 500 });
  }
}
