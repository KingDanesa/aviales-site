import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export const runtime = 'nodejs';

// Загрузка изображений.
//  - если задан BLOB_READ_WRITE_TOKEN (Vercel Blob) → файл в облако;
//  - иначе → на диск в public/uploads (для своего сервера / локально).
// Переезд на свой сервер: просто не задавать токен — само уйдёт на диск.
export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const file = form.get('file');
    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'Файл не получен' }, { status: 400 });
    }

    const safe = (file.name || 'image').replace(/[^a-zA-Z0-9.\-_]/g, '_');
    const key = `news/${Date.now()}-${safe}`;

    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (token) {
      const blob = await put(key, file, { access: 'public', addRandomSuffix: true, token });
      return NextResponse.json({ url: blob.url });
    }

    // На Vercel файловая система только для чтения — нужен Vercel Blob
    if (process.env.VERCEL) {
      return NextResponse.json(
        { error: 'Хранилище фото не подключено. На Vercel: Storage → Blob → Connect, затем Redeploy.' },
        { status: 500 }
      );
    }

    // Локальный диск (свой сервер / локально)
    const bytes = Buffer.from(await file.arrayBuffer());
    const dir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(dir, { recursive: true });
    const name = `${Date.now()}-${safe}`;
    await writeFile(path.join(dir, name), bytes);
    return NextResponse.json({ url: `/uploads/${name}` });
  } catch (e) {
    console.error('upload error:', e);
    const detail = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: 'Ошибка загрузки файла', detail }, { status: 500 });
  }
}
