'use client';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useState } from 'react';

export default function StatePage() {
  const t = useTranslations();
  useScrollReveal();
  const [tab, setTab] = useState<'symbols' | 'message' | 'docs'>('symbols');

  return (
    <>
      <div className="bg-forest px-8 md:px-14 py-14 relative overflow-hidden">
        <div className="flex items-center gap-2 text-[11px] text-white/40 tracking-widest uppercase font-semibold mb-4">
          <Link href="/" className="text-white/40 no-underline hover:text-white/70">{t('common.home')}</Link>
          <span className="text-white/20">›</span><span>{t('nav.state')}</span>
        </div>
        <h1 className="text-[clamp(28px,4vw,52px)] font-extrabold text-white tracking-tight">{t('nav.state')}</h1>
      </div>

      {/* Tabs */}
      <div className="border-b border-border px-8 md:px-14 flex gap-0">
        {(['symbols', 'message', 'docs'] as const).map((key) => (
          <button key={key} onClick={() => setTab(key)} className={`px-6 py-4 text-[13px] font-bold border-b-2 transition-all cursor-pointer bg-transparent border-t-0 border-l-0 border-r-0 font-sans ${tab === key ? 'border-forest text-forest' : 'border-transparent text-text-dim hover:text-forest'}`}>
            {key === 'symbols' ? t('nav.symbols') : key === 'message' ? t('nav.president') : t('nav.docs')}
          </button>
        ))}
      </div>

      <div className="px-8 md:px-14 py-18">
        {tab === 'symbols' && (
          <div id="symbols" className="reveal from-bottom visible">
            <h2 className="text-[clamp(28px,3.5vw,48px)] font-extrabold text-forest mb-8">{t('nav.symbols')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Flag */}
              <div className="border border-border overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                <div className="bg-sky flex items-center justify-center p-6 aspect-[4/3]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/kz-flag.svg" alt={t('statePage.flagTitle')} className="w-full h-full object-contain shadow-md" />
                </div>
                <div className="p-7">
                  <h3 className="text-[18px] font-extrabold text-forest mb-3">{t('statePage.flagTitle')}</h3>
                  <p className="text-[13px] text-text-dim leading-relaxed">{t('statePage.flagDesc')}</p>
                </div>
              </div>
              {/* Emblem */}
              <div className="border border-border overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                <div className="bg-sky flex items-center justify-center p-6 aspect-[4/3]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/kz-emblem.svg" alt={t('statePage.emblemTitle')} className="h-full object-contain" />
                </div>
                <div className="p-7">
                  <h3 className="text-[18px] font-extrabold text-forest mb-3">{t('statePage.emblemTitle')}</h3>
                  <p className="text-[13px] text-text-dim leading-relaxed">{t('statePage.emblemDesc')}</p>
                </div>
              </div>
              {/* Anthem */}
              <div className="border border-border overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                <div className="bg-forest flex items-center justify-center p-6 aspect-[4/3]">
                  <div className="text-7xl">🎵</div>
                </div>
                <div className="p-7">
                  <h3 className="text-[18px] font-extrabold text-forest mb-3">{t('statePage.anthemTitle')}</h3>
                  <p className="text-[13px] text-text-dim leading-relaxed mb-4">{t('statePage.anthemDesc')}</p>
                  <audio controls preload="none" controlsList="nodownload" className="w-full">
                    <source src="/kz-anthem.mp3" type="audio/mpeg" />
                    <source src="/kz-anthem.ogg" type="audio/ogg" />
                  </audio>
                </div>
              </div>
            </div>
          </div>
        )}
        {tab === 'message' && (
          <div id="message" className="reveal from-bottom visible max-w-3xl">
            <h2 className="text-[clamp(28px,3.5vw,48px)] font-extrabold text-forest mb-8">{t('nav.president')}</h2>
            <blockquote className="border-l-4 border-amber pl-6 py-2 text-[18px] italic text-text-mid leading-relaxed mb-8">
              «Наша священная обязанность — защитить природу для будущих поколений казахстанцев.»
            </blockquote>
            <p className="text-[15px] text-text-mid leading-[1.85] mb-5">
              Послание Президента Республики Казахстан определяет основные направления развития государства, включая вопросы экологической безопасности и защиты лесного фонда.
            </p>
            <p className="text-[15px] text-text-mid leading-[1.85]">
              Деятельность РГКП «Казавиалесоохрана» полностью соответствует государственной политике в области охраны окружающей среды и рационального использования природных ресурсов.
            </p>
          </div>
        )}
        {tab === 'docs' && (
          <div id="docs" className="reveal from-bottom visible">
            <h2 className="text-[clamp(28px,3.5vw,48px)] font-extrabold text-forest mb-8">{t('nav.docs')}</h2>
            <div className="flex flex-col gap-3">
              {[
                'Лесной кодекс Республики Казахстан',
                'Закон «Об особо охраняемых природных территориях»',
                'Правила пожарной безопасности в лесах',
                'Правила ведения лесного хозяйства',
                'Указ Президента «О государственном предприятии»',
                'Постановление Правительства РК о лесоохране',
              ].map((doc, i) => (
                <div key={i} className="grid grid-cols-[40px_1fr_auto] items-center gap-4 p-4 px-5 border border-border bg-white hover:bg-sky transition-colors cursor-pointer">
                  <div className="text-2xl">📄</div>
                  <div>
                    <div className="text-[14px] font-bold text-forest">{doc}</div>
                    <div className="text-[11px] text-text-dim mt-0.5">PDF · Нормативный акт</div>
                  </div>
                  <span className="text-[11px] text-forest-light font-bold">Скачать →</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
