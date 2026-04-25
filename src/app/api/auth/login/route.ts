import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Simple hardcoded check for the demo
    if (email === 'admin@aviales.kz' && password === 'admin123') {
      return NextResponse.json({ success: true, message: 'Успешный вход' });
    }

    return NextResponse.json(
      { error: 'Неверный email или пароль' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}
