import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['ru', 'kz', 'en'],
  defaultLocale: 'ru',
  localePrefix: 'as-needed',
  // Не определять язык по браузеру — сайт по умолчанию на русском,
  // язык переключается только вручную (РУС/ҚАЗ/ENG).
  localeDetection: false
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
