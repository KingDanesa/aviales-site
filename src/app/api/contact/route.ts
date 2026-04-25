import { NextResponse } from 'next/server';

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

    // TODO: Save to database with Prisma when DB is connected
    // await prisma.contactMessage.create({
    //   data: { name, phone, email, subject, message }
    // });

    console.log('New contact message:', { name, phone, email, subject, message });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
