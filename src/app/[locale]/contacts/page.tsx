'use client';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useState } from 'react';

export default function ContactsPage() {
  const t = useTranslations();
  useScrollReveal();
  const [sent, setSent] = useState(false);

  return (
    <>
      <div className="bg-forest px-8 md:px-14 py-14 relative overflow-hidden">
        <div className="absolute -right-15 -top-15 w-80 h-80 rounded-full bg-white/[0.03]" />
        <div className="flex items-center gap-2 text-[11px] text-white/40 tracking-widest uppercase font-semibold mb-4">
          <Link href="/" className="text-white/40 no-underline hover:text-white/70">{t('common.home')}</Link>
          <span className="text-white/20">›</span><span>{t('contactsPage.title')}</span>
        </div>
        <h1 className="text-[clamp(28px,4vw,52px)] font-extrabold text-white tracking-tight">{t('contactsPage.title')}</h1>
        <p className="mt-3 text-[15px] text-white/55 max-w-[560px] leading-relaxed">{t('contactsPage.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] min-h-[70vh]">
        {/* Left Panel */}
        <div className="bg-forest px-8 md:px-12 py-16 flex flex-col gap-10 relative overflow-hidden">
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full border border-white/5" />
          <div className="absolute -top-10 -right-15 w-[200px] h-[200px] rounded-full border border-white/[0.04]" />
          <div className="relative z-[1]">
            <div className="text-2xl font-extrabold text-white tracking-tight mb-1">Казавиалесоохрана</div>
            <div className="text-[13px] text-white/45 leading-relaxed">РГКП · {t('hero.kicker')}</div>
          </div>
          <div className="flex flex-col gap-6 relative z-[1]">
            {[
              { icon: '📍', label: t('contactsPage.address'), value: 'г. Алматы, ул. Абая 32/2\nРеспублика Казахстан' },
              { icon: '📞', label: t('contactsPage.phone'), value: '+7 (727) 346-13-71', href: 'tel:+77273461371' },
              { icon: '✉️', label: t('contactsPage.email'), value: 'airbar@list.ru', href: 'mailto:airbar@list.ru' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-11 h-11 border border-white/15 flex items-center justify-center text-lg shrink-0 text-amber">{item.icon}</div>
                <div>
                  <div className="text-[10px] font-bold tracking-widest uppercase text-white/35 mb-1">{item.label}</div>
                  {item.href ? (
                    <a href={item.href} className="text-[15px] text-white/85 font-medium no-underline hover:text-white transition-colors whitespace-pre-line">{item.value}</a>
                  ) : (
                    <div className="text-[15px] text-white/85 font-medium whitespace-pre-line">{item.value}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <hr className="border-white/8" />
          <div className="bg-white/5 border border-white/8 p-5 relative z-[1]">
            <div className="text-[11px] font-bold tracking-widest uppercase text-white/35 mb-3">{t('contactsPage.schedule')}</div>
            <div className="flex justify-between text-[13px] py-1.5 border-b border-white/[0.06]">
              <span className="text-white/50">{t('contactsPage.weekdays')}</span><span className="text-white/80 font-semibold">09:00 — 18:00</span>
            </div>
            <div className="flex justify-between text-[13px] py-1.5 border-b border-white/[0.06]">
              <span className="text-white/50">{t('contactsPage.saturday')}</span><span className="text-white/80 font-semibold">{t('contactsPage.dayOff')}</span>
            </div>
            <div className="flex justify-between text-[13px] py-1.5">
              <span className="text-white/50">{t('contactsPage.sunday')}</span><span className="text-white/80 font-semibold">{t('contactsPage.dayOff')}</span>
            </div>
          </div>
        </div>

        {/* Map Area */}
        <div className="flex flex-col">
          <div className="flex-1 bg-sky relative min-h-[400px] overflow-hidden">
            <div className="w-full h-full flex items-center justify-center relative" style={{ background: 'repeating-linear-gradient(0deg,rgba(26,58,40,0.03) 0px,rgba(26,58,40,0.03) 1px,transparent 1px,transparent 40px),repeating-linear-gradient(90deg,rgba(26,58,40,0.03) 0px,rgba(26,58,40,0.03) 1px,transparent 1px,transparent 40px),var(--color-sky)' }}>
              <div className="absolute top-[40%] left-0 right-0 h-9 bg-white border border-border" />
              <div className="absolute top-[60%] left-0 right-0 h-6 bg-white border border-border opacity-70" />
              <div className="absolute left-[45%] top-0 bottom-0 w-7 bg-white border border-border" />
              <div className="absolute left-[65%] top-0 bottom-0 w-5 bg-white border border-border opacity-70" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                <div className="w-6 h-6 bg-amber rounded-full border-[3px] border-white shadow-[0_0_0_4px_rgba(200,140,30,0.25),0_4px_16px_rgba(200,140,30,0.4)]" style={{ animation: 'pin-pulse 2s ease-in-out infinite' }} />
                <div className="w-0.5 h-5 bg-amber" />
                <div className="bg-forest text-white px-3.5 py-2 text-[11px] font-bold tracking-wide whitespace-nowrap shadow-[0_4px_20px_rgba(0,0,0,0.2)] mt-1">ул. Абая 32/2</div>
              </div>
            </div>
          </div>
          <div className="bg-white border-t border-border px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
            <div>
              <div className="text-[14px] font-bold text-forest">г. Алматы, ул. Абая 32/2</div>
              <div className="text-[12px] text-text-dim mt-0.5">Республика Казахстан, 050022</div>
            </div>
            <a href="https://2gis.kz/almaty/search/ул.%20Абая%2032" target="_blank" className="inline-flex items-center gap-2 px-7 py-3.5 text-[12.5px] font-bold tracking-wider uppercase no-underline bg-forest text-white rounded-sm hover:bg-forest-mid transition-colors">{t('contactsPage.openMap')}</a>
          </div>
        </div>
      </div>

      {/* Form */}
      <section className="bg-sky px-8 md:px-14 py-18">
        <div className="text-[11px] tracking-[0.18em] uppercase font-bold text-forest-light mb-4 flex items-center gap-3 reveal from-bottom">
          <span className="w-7 h-0.5 bg-forest-light shrink-0" />{t('contactsPage.formTitle')}
        </div>
        <h2 className="text-[clamp(28px,3.5vw,48px)] font-extrabold leading-[1.05] tracking-tight text-forest mb-10 reveal from-bottom">{t('contactsPage.formSubtitle')}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="reveal from-bottom" style={{ transitionDelay: '.1s' }}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold tracking-widest uppercase text-text-dim">{t('contactsPage.name')}</label>
                <input type="text" className="border-[1.5px] border-border bg-white px-4 py-3 text-sm font-sans text-text focus:border-forest outline-none transition-colors" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold tracking-widest uppercase text-text-dim">{t('contactsPage.phoneLbl')}</label>
                <input type="tel" className="border-[1.5px] border-border bg-white px-4 py-3 text-sm font-sans text-text focus:border-forest outline-none transition-colors" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5 mb-4">
              <label className="text-[11px] font-bold tracking-widest uppercase text-text-dim">{t('contactsPage.emailLbl')}</label>
              <input type="email" className="border-[1.5px] border-border bg-white px-4 py-3 text-sm font-sans text-text focus:border-forest outline-none transition-colors" />
            </div>
            <div className="flex flex-col gap-1.5 mb-4">
              <label className="text-[11px] font-bold tracking-widest uppercase text-text-dim">{t('contactsPage.subject')}</label>
              <input type="text" className="border-[1.5px] border-border bg-white px-4 py-3 text-sm font-sans text-text focus:border-forest outline-none transition-colors" />
            </div>
            <div className="flex flex-col gap-1.5 mb-4">
              <label className="text-[11px] font-bold tracking-widest uppercase text-text-dim">{t('contactsPage.message')}</label>
              <textarea className="border-[1.5px] border-border bg-white px-4 py-3 text-sm font-sans text-text focus:border-forest outline-none transition-colors min-h-[140px] resize-y" />
            </div>
            <button onClick={() => setSent(true)} className="w-full px-7 py-3.5 text-[12.5px] font-bold tracking-wider uppercase bg-amber text-white rounded-sm hover:bg-amber-dark hover:-translate-y-0.5 hover:shadow-lg transition-all cursor-pointer border-none font-sans">{t('contactsPage.send')}</button>
            <p className="text-[12px] text-text-dim leading-relaxed mt-3">{t('contactsPage.consent')}</p>
            {sent && <div className="bg-forest text-white p-5 text-sm font-semibold mt-4">✓ {t('contactsPage.success')}</div>}
          </div>
          <div className="reveal from-right" style={{ transitionDelay: '.15s' }}>
            {[
              { title: t('contactsPage.generalQ'), desc: t('contactsPage.generalQDesc') },
              { title: t('contactsPage.procurement'), desc: t('contactsPage.procurementDesc') },
              { title: t('contactsPage.hotline'), desc: t('contactsPage.hotlineDesc') },
            ].map((block, i) => (
              <div key={i} className="mb-7">
                <div className="text-[14px] font-extrabold text-forest mb-2">{block.title}</div>
                <div className="text-[13px] text-text-dim leading-relaxed">{block.desc}</div>
                {i === 2 && <a href="tel:101" className="mt-4 inline-flex items-center gap-2 px-7 py-3.5 text-lg font-bold bg-amber text-white rounded-sm no-underline">☎ 101</a>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
