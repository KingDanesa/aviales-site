'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useState, useEffect } from 'react';

export default function VacanciesPage() {
  const t = useTranslations();
  const locale = useLocale();
  useScrollReveal();
  
  const [vacancies, setVacancies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/vacancies')
      .then(r => r.json())
      .then(data => {
        setVacancies(data.filter((v: any) => v.published));
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="bg-forest px-8 md:px-14 py-14 relative overflow-hidden">
        <div className="absolute -right-15 -top-15 w-80 h-80 rounded-full bg-white/[0.03]" />
        <div className="flex items-center gap-2 text-[11px] text-white/40 tracking-widest uppercase font-semibold mb-4">
          <Link href="/" className="text-white/40 no-underline hover:text-white/70 transition-colors">{t('common.home')}</Link>
          <span className="text-white/20">›</span>
          <span>{t('vacanciesPage.title')}</span>
        </div>
        <h1 className="text-[clamp(28px,4vw,52px)] font-extrabold text-white tracking-tight leading-[1.05] max-w-[700px] relative z-[1]">
          {t('vacanciesPage.title')}
        </h1>
        <p className="mt-3 text-[15px] text-white/55 max-w-[560px] leading-relaxed relative z-[1]">
          {t('vacanciesPage.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 px-8 md:px-14 py-16 items-start">
        <div className="flex flex-col gap-6">
          <div className="text-[11px] tracking-[0.18em] uppercase font-bold text-forest-light mb-2 flex items-center gap-3 reveal from-bottom">
            <span className="w-7 h-0.5 bg-forest-light shrink-0" />{t('vacanciesPage.openPositions')}
          </div>
          
          {loading ? (
            <div className="p-10 text-center text-text-dim">{t('common.loading')}</div>
          ) : vacancies.length === 0 ? (
            <div className="p-10 text-center text-text-dim border border-border">Нет активных вакансий</div>
          ) : (
            vacancies.map((v, i) => {
              const title = locale === 'kz' ? v.titleKz || v.titleRu : locale === 'en' ? v.titleEn || v.titleRu : v.titleRu;
              const desc = locale === 'kz' ? v.descriptionKz || v.descriptionRu : locale === 'en' ? v.descriptionEn || v.descriptionRu : v.descriptionRu;
              
              return (
                <div key={i} className="border border-border bg-white reveal from-bottom" style={{ transitionDelay: `${i * 0.1}s` }}>
                  <div className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border">
                    <div>
                      <div className="flex gap-2 mb-3">
                        {v.isHot && <span className="bg-red-500/10 text-red-500 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1">{t('vacanciesPage.hotVacancy')}</span>}
                        <span className="bg-sky text-forest-light text-[10px] font-bold tracking-widest uppercase px-2.5 py-1">📍 {v.location || 'Республика Казахстан'}</span>
                      </div>
                      <h2 className="text-[22px] font-extrabold text-forest">{title}</h2>
                    </div>
                    <div className="bg-sky px-5 py-3 rounded-sm self-stretch md:self-auto flex flex-col justify-center">
                      <div className="text-[10px] text-text-dim font-bold tracking-widest uppercase mb-1">{t('vacanciesPage.salary')}</div>
                      <div className="text-[15px] font-extrabold text-forest">{v.salary || t('vacanciesPage.byAgreement')}</div>
                    </div>
                  </div>
                  <div className="p-6 md:p-8">
                    <p className="text-[14px] text-text-mid leading-relaxed mb-6">{desc}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <div className="text-[12px] font-bold tracking-wider uppercase text-forest-light mb-3">{t('vacanciesPage.requirements')}</div>
                        <ul className="list-disc list-inside text-[13px] text-text-dim flex flex-col gap-2">
                          <li>Высшее или среднее профильное образование</li>
                          <li>Опыт работы от 1 года приветствуется</li>
                          <li>Готовность к командировкам</li>
                        </ul>
                      </div>
                      <div>
                        <div className="text-[12px] font-bold tracking-wider uppercase text-forest-light mb-3">{t('vacanciesPage.conditions')}</div>
                        <ul className="list-disc list-inside text-[13px] text-text-dim flex flex-col gap-2">
                          <li>Официальное трудоустройство по ТК РК</li>
                          <li>Социальный пакет</li>
                          <li>Обучение и повышение квалификации</li>
                        </ul>
                      </div>
                    </div>
                    <div className="mt-8 pt-6 border-t border-border">
                      <button className="px-8 py-3.5 text-[12.5px] font-bold tracking-wider uppercase bg-amber text-white rounded-sm hover:bg-amber-dark hover:-translate-y-0.5 hover:shadow-lg transition-all cursor-pointer border-none font-sans">
                        {t('vacanciesPage.apply')}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Sidebar Info */}
        <aside className="bg-sky p-8 reveal from-right">
          <div className="w-12 h-12 bg-white flex items-center justify-center text-2xl mb-5 shadow-sm">🌲</div>
          <h3 className="text-[18px] font-extrabold text-forest leading-tight mb-3">{t('vacanciesPage.whyWork')}</h3>
          <p className="text-[13px] text-text-dim leading-relaxed mb-6">{t('vacanciesPage.whyDesc')}</p>
          <div className="flex flex-col gap-3 mb-8">
            <div className="flex items-start gap-3">
              <div className="text-amber mt-0.5">✓</div>
              <div className="text-[13px] font-semibold text-text-mid">{t('vacanciesPage.benefit1')}</div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-amber mt-0.5">✓</div>
              <div className="text-[13px] font-semibold text-text-mid">{t('vacanciesPage.benefit2')}</div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-amber mt-0.5">✓</div>
              <div className="text-[13px] font-semibold text-text-mid">{t('vacanciesPage.benefit3')}</div>
            </div>
          </div>
          <div className="pt-6 border-t border-border">
            <div className="text-[10px] text-text-dim font-bold tracking-widest uppercase mb-2">{t('vacanciesPage.hrTitle')}</div>
            <a href="mailto:hr@aviales.kz" className="text-[15px] font-bold text-forest no-underline">hr@aviales.kz</a>
            <br />
            <a href="tel:+77273461371" className="text-[15px] font-bold text-forest no-underline mt-1 inline-block">+7 (727) 346-13-71</a>
          </div>
        </aside>
      </div>
    </>
  );
}
