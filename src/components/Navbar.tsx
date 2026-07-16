'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useState } from 'react';
import { useLocale } from 'next-intl';

export function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const switchLocale = (newLocale: 'ru' | 'kz' | 'en') => {
    router.replace(pathname, { locale: newLocale });
  };

  const isActive = (path: string) =>
    pathname === path ? 'text-forest bg-sky' : 'text-text-mid hover:text-forest hover:bg-sky';

  return (
    <nav className="fixed top-0 left-0 right-0 z-[200] flex items-center justify-between gap-2 px-4 md:px-12 h-[76px] bg-white/97 backdrop-blur-xl border-b border-border">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 md:gap-3.5 no-underline min-w-0">
        <img src="/logo.gif" alt="Казавиалесоохрана" className="w-[40px] h-[40px] md:w-[46px] md:h-[46px] shrink-0 object-contain" />
        <div className="flex flex-col leading-tight min-w-0">
          <span className="text-[12px] sm:text-[14.5px] font-extrabold text-forest tracking-tight truncate">
            {locale === 'kz' ? '«Қазавиаорманқорғау» РМҚК' : locale === 'en' ? 'RSEM «Kazavialesoohrana»' : 'РГКП «Казавиалесоохрана»'}
          </span>
          <span className="text-[8.5px] text-text-dim tracking-widest uppercase font-medium mt-0.5 truncate hidden sm:block">
            {locale === 'kz' ? 'Қазақстан ормандарын авиациялық қорғау' : locale === 'en' ? 'Aerial Forest Protection of Kazakhstan' : 'Авиационная охрана лесов Казахстана'}
          </span>
        </div>
      </Link>

      {/* Desktop Links */}
      <ul className="hidden lg:flex items-center gap-1 list-none">
        <li>
          <Link href="/" className={`flex items-center gap-1 px-3.5 py-2 text-[13px] font-semibold tracking-tight rounded transition-colors no-underline ${isActive('/')}`}>
            {t('home')}
          </Link>
        </li>
        <li>
          <Link href="/news" className={`flex items-center gap-1 px-3.5 py-2 text-[13px] font-semibold tracking-tight rounded transition-colors no-underline ${isActive('/news')}`}>
            {t('news')}
          </Link>
        </li>
        {/* Enterprise Dropdown */}
        <li className="relative group">
          <button className={`flex items-center gap-1 px-3.5 py-2 text-[13px] font-semibold tracking-tight rounded transition-colors ${pathname.startsWith('/about') || pathname.startsWith('/leadership') || pathname.startsWith('/branches') || pathname.startsWith('/equipment') || pathname.startsWith('/vacancies') ? 'text-forest bg-sky' : 'text-text-mid hover:text-forest hover:bg-sky'}`}>
            {t('enterprise')}
            <span className="text-[9px] opacity-50 group-hover:rotate-180 transition-transform">▾</span>
          </button>
          <div className="absolute top-full left-0 pt-2 min-w-[240px] opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto -translate-y-1.5 group-hover:translate-y-0 transition-all duration-200 z-[300]">
            <div className="bg-white border border-border py-2 shadow-xl">
              <Link href="/about" className="flex items-center gap-2.5 px-5 py-2.5 text-text-mid no-underline text-[13px] font-medium hover:bg-sky hover:text-forest transition-colors">
                <span className="text-[15px] w-5 text-center">🏢</span>{t('about')}
              </Link>
              <Link href="/structure" className="flex items-center gap-2.5 px-5 py-2.5 text-text-mid no-underline text-[13px] font-medium hover:bg-sky hover:text-forest transition-colors">
                <span className="text-[15px] w-5 text-center">🗂️</span>{t('structure')}
              </Link>
              <Link href="/leadership" className="flex items-center gap-2.5 px-5 py-2.5 text-text-mid no-underline text-[13px] font-medium hover:bg-sky hover:text-forest transition-colors">
                <span className="text-[15px] w-5 text-center">👤</span>{t('leadership')}
              </Link>
              <Link href="/branches" className="flex items-center gap-2.5 px-5 py-2.5 text-text-mid no-underline text-[13px] font-medium hover:bg-sky hover:text-forest transition-colors">
                <span className="text-[15px] w-5 text-center">📍</span>{t('branches')}
              </Link>
              <Link href="/equipment" className="flex items-center gap-2.5 px-5 py-2.5 text-text-mid no-underline text-[13px] font-medium hover:bg-sky hover:text-forest transition-colors">
                <span className="text-[15px] w-5 text-center">🚁</span>{t('equipment')}
              </Link>
              <Link href="/safety" className="flex items-center gap-2.5 px-5 py-2.5 text-text-mid no-underline text-[13px] font-medium hover:bg-sky hover:text-forest transition-colors">
                <span className="text-[15px] w-5 text-center">🦺</span>{t('safety')}
              </Link>
              <hr className="border-border my-1.5" />
              <Link href="/vacancies" className="flex items-center gap-2.5 px-5 py-2.5 text-text-mid no-underline text-[13px] font-medium hover:bg-sky hover:text-forest transition-colors">
                <span className="text-[15px] w-5 text-center">📋</span>{t('vacancies')}
              </Link>
            </div>
          </div>
        </li>
        {/* State Dropdown */}
        <li className="relative group">
          <button className={`flex items-center gap-1 px-3.5 py-2 text-[13px] font-semibold tracking-tight rounded transition-colors ${pathname.startsWith('/state') || pathname.startsWith('/anticorruption') ? 'text-forest bg-sky' : 'text-text-mid hover:text-forest hover:bg-sky'}`}>
            {t('state')}
            <span className="text-[9px] opacity-50 group-hover:rotate-180 transition-transform">▾</span>
          </button>
          <div className="absolute top-full left-0 pt-2 min-w-[240px] opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto -translate-y-1.5 group-hover:translate-y-0 transition-all duration-200 z-[300]">
            <div className="bg-white border border-border py-2 shadow-xl">
              <Link href="/state#symbols" className="flex items-center gap-2.5 px-5 py-2.5 text-text-mid no-underline text-[13px] font-medium hover:bg-sky hover:text-forest transition-colors">
                <span className="text-[15px] w-5 text-center">🇰🇿</span>{t('symbols')}
              </Link>
              <Link href="/state#message" className="flex items-center gap-2.5 px-5 py-2.5 text-text-mid no-underline text-[13px] font-medium hover:bg-sky hover:text-forest transition-colors">
                <span className="text-[15px] w-5 text-center">📜</span>{t('president')}
              </Link>
              <Link href="/state#docs" className="flex items-center gap-2.5 px-5 py-2.5 text-text-mid no-underline text-[13px] font-medium hover:bg-sky hover:text-forest transition-colors">
                <span className="text-[15px] w-5 text-center">📂</span>{t('docs')}
              </Link>
              <hr className="border-border my-1.5" />
              <Link href="/anticorruption" className="flex items-center gap-2.5 px-5 py-2.5 text-text-mid no-underline text-[13px] font-medium hover:bg-sky hover:text-forest transition-colors">
                <span className="text-[15px] w-5 text-center">🛡️</span>{t('anticorruption')}
              </Link>
            </div>
          </div>
        </li>
        <li>
          <Link href="/contacts" className={`flex items-center gap-1 px-3.5 py-2 text-[13px] font-semibold tracking-tight rounded transition-colors no-underline ${isActive('/contacts')}`}>
            {t('contacts')}
          </Link>
        </li>
      </ul>

      {/* Right side */}
      <div className="flex items-center gap-2 md:gap-4 shrink-0">
        {/* Language Switch */}
        <div className="flex gap-0.5 bg-sky p-[3px] rounded">
          {(['ru', 'kz', 'en'] as const).map((l) => (
            <button
              key={l}
              onClick={() => switchLocale(l)}
              className={`px-2 md:px-3 py-1 text-[10.5px] md:text-[11.5px] font-bold tracking-wide rounded-[3px] transition-all cursor-pointer border-none font-sans ${
                locale === l ? 'bg-forest text-white' : 'bg-transparent text-text-dim hover:text-forest'
              }`}
            >
              {l === 'ru' ? 'РУС' : l === 'kz' ? 'ҚАЗ' : 'ENG'}
            </button>
          ))}
        </div>
        {/* Mobile hamburger */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2 cursor-pointer border-none bg-transparent"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span className={`w-5 h-0.5 bg-forest transition-all ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`}/>
          <span className={`w-5 h-0.5 bg-forest transition-all ${mobileOpen ? 'opacity-0' : ''}`}/>
          <span className={`w-5 h-0.5 bg-forest transition-all ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`}/>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-[76px] left-0 right-0 bg-white border-b border-border shadow-xl p-6 flex flex-col gap-3 z-[200]">
          <Link href="/" onClick={() => setMobileOpen(false)} className="py-2 text-[14px] font-semibold text-text-mid no-underline hover:text-forest">{t('home')}</Link>
          <Link href="/news" onClick={() => setMobileOpen(false)} className="py-2 text-[14px] font-semibold text-text-mid no-underline hover:text-forest">{t('news')}</Link>
          <Link href="/about" onClick={() => setMobileOpen(false)} className="py-2 text-[14px] font-semibold text-text-mid no-underline hover:text-forest">{t('about')}</Link>
          <Link href="/structure" onClick={() => setMobileOpen(false)} className="py-2 text-[14px] font-semibold text-text-mid no-underline hover:text-forest">{t('structure')}</Link>
          <Link href="/leadership" onClick={() => setMobileOpen(false)} className="py-2 text-[14px] font-semibold text-text-mid no-underline hover:text-forest">{t('leadership')}</Link>
          <Link href="/branches" onClick={() => setMobileOpen(false)} className="py-2 text-[14px] font-semibold text-text-mid no-underline hover:text-forest">{t('branches')}</Link>
          <Link href="/equipment" onClick={() => setMobileOpen(false)} className="py-2 text-[14px] font-semibold text-text-mid no-underline hover:text-forest">{t('equipment')}</Link>
          <Link href="/safety" onClick={() => setMobileOpen(false)} className="py-2 text-[14px] font-semibold text-text-mid no-underline hover:text-forest">{t('safety')}</Link>
          <Link href="/vacancies" onClick={() => setMobileOpen(false)} className="py-2 text-[14px] font-semibold text-text-mid no-underline hover:text-forest">{t('vacancies')}</Link>
          <Link href="/state" onClick={() => setMobileOpen(false)} className="py-2 text-[14px] font-semibold text-text-mid no-underline hover:text-forest">{t('symbols')}</Link>
          <Link href="/anticorruption" onClick={() => setMobileOpen(false)} className="py-2 text-[14px] font-semibold text-text-mid no-underline hover:text-forest">{t('anticorruption')}</Link>
          <Link href="/contacts" onClick={() => setMobileOpen(false)} className="py-2 text-[14px] font-semibold text-text-mid no-underline hover:text-forest">{t('contacts')}</Link>
        </div>
      )}
    </nav>
  );
}
