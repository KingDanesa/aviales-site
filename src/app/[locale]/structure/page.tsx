'use client';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useState } from 'react';

export default function StructurePage() {
  const t = useTranslations();
  const locale = useLocale();
  useScrollReveal();
  const [zoom, setZoom] = useState(false);

  // RU chart for ru/en, KZ chart for kz
  const src = locale === 'kz' ? '/structure-kz.png' : '/structure-ru.png';

  return (
    <>
      <div className="bg-forest px-8 md:px-14 py-14 relative overflow-hidden">
        <div className="flex items-center gap-2 text-[11px] text-white/40 tracking-widest uppercase font-semibold mb-4">
          <Link href="/" className="text-white/40 no-underline hover:text-white/70">{t('common.home')}</Link>
          <span className="text-white/20">›</span><span>{t('nav.structure')}</span>
        </div>
        <h1 className="text-[clamp(28px,4vw,52px)] font-extrabold text-white tracking-tight">{t('nav.structure')}</h1>
        <p className="mt-3 text-[15px] text-white/55 max-w-[560px] leading-relaxed">{t('structurePage.subtitle')}</p>
      </div>

      <div className="px-8 md:px-14 py-14">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <div className="text-[13px] text-text-dim">{t('structurePage.hint')}</div>
          <button
            onClick={() => setZoom(true)}
            className="inline-flex items-center gap-2 bg-forest text-white text-[13px] font-bold px-5 py-2.5 rounded cursor-pointer border-none font-sans hover:bg-forest-light transition-colors"
          >
            <span className="text-[15px]">🔍</span>{t('structurePage.openFull')}
          </button>
        </div>

        {/* Inline preview */}
        <div
          className="border border-border bg-white p-3 md:p-6 reveal from-bottom cursor-zoom-in select-none"
          onClick={() => setZoom(true)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={t('nav.structure')}
            className="w-full h-auto select-none pointer-events-none"
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>
      </div>

      {/* Fullscreen zoom lightbox */}
      {zoom && (
        <div
          className="fixed inset-0 z-[1000] bg-black/90 flex flex-col"
          onClick={() => setZoom(false)}
        >
          <div className="flex items-center justify-between px-6 py-4 shrink-0">
            <span className="text-white/70 text-[13px] font-semibold">{t('nav.structure')}</span>
            <button
              onClick={() => setZoom(false)}
              className="text-white/80 hover:text-white text-[15px] font-bold bg-white/10 hover:bg-white/20 rounded px-4 py-2 cursor-pointer border-none font-sans"
            >
              ✕ {t('common.back')}
            </button>
          </div>
          {/* Scrollable / pannable canvas: image at native width, user scrolls to inspect */}
          <div className="flex-1 overflow-auto p-4" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={t('nav.structure')}
              className="max-w-none mx-auto select-none"
              style={{ width: 'min(2380px, 180vw)' }}
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
        </div>
      )}
    </>
  );
}
