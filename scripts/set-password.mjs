// Создать или сбросить пароль пользователя админки.
//
// Запуск на сервере (Node 22):
//   npm run set-password -- <email> <пароль> [роль]
// Примеры:
//   npm run set-password -- admin@aviales.kz Новый_Пароль123 admin
//   npm run set-password -- editor@aviales.kz Пароль123 editor
//
// Если пользователя нет — он создаётся; если есть — обновляется пароль (и роль, если указана).
// Это же — аварийное восстановление доступа, если админ забыл пароль.

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const [email, password, roleArg] = process.argv.slice(2);

if (!email || !password) {
  console.error('Использование: npm run set-password -- <email> <пароль> [admin|editor]');
  process.exit(1);
}
if (password.length < 6) {
  console.error('Пароль должен быть не короче 6 символов.');
  process.exit(1);
}

const role = roleArg === 'editor' ? 'editor' : 'admin';
const cleanEmail = email.trim().toLowerCase();
const prisma = new PrismaClient();

try {
  const hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.upsert({
    where: { email: cleanEmail },
    update: { password: hash, role },
    create: { email: cleanEmail, password: hash, role },
  });
  console.log(`✓ Готово: ${user.email} — роль «${user.role}», пароль установлен.`);
} catch (e) {
  console.error('Ошибка:', e?.message || e);
  process.exit(1);
} finally {
  await prisma.$disconnect();
}
