'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function VacancyPage() {
  const t = useTranslations();
  const locale = useLocale();
  const params = useParams();
  const id = params?.id as string;

  const [v, setV] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/vacancies/${id}`)
      .then(async (r) => { if (!r.ok) { setNotFound(true); return null; } return r.json(); })
      .then((data) => { if (data && data.id) setV(data); else setNotFound(true); })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-24 text-center text-text-dim">{t('common.loading')}</div>;

  if (notFound || !v) {
    return (
      <div className="px-8 py-24 text-center">
        <div className="text-6xl opacity-20 mb-4">📋</div>
        <p className="text-text-dim text-[15px] mb-6">Вакансия не найдена.</p>
        <Link href="/vacancies" className="inline-flex items-center gap-2 px-6 py-3 text-[12.5px] font-bold tracking-wider uppercase bg-forest text-white rounded-sm no-underline hover:bg-forest-mid transition-colors">← {t('vacanciesPage.title')}</Link>
      </div>
    );
  }

  const title = locale === 'kz' ? v.titleKz || v.titleRu : locale === 'en' ? v.titleEn || v.titleRu : v.titleRu;
  const desc = locale === 'kz' ? v.descriptionKz || v.descriptionRu : locale === 'en' ? v.descriptionEn || v.descriptionRu : v.descriptionRu;

  const requirements = ['Высшее или среднее профильное образование', 'Опыт работы от 1 года приветствуется', 'Готовность к командировкам'];
  const conditions = ['Официальное трудоустройство по ТК РК', 'Социальный пакет', 'Обучение и повышение квалификации'];

  return (
    <>
      <div className="bg-forest px-8 md:px-14 py-14 relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-white/[0.03]" />
        <div className="flex items-center gap-2 text-[11px] text-white/40 tracking-widest uppercase font-semibold mb-5 relative z-[1] flex-wrap">
          <Link href="/" className="text-white/40 no-underline hover:text-white/70 transition-colors">{t('common.home')}</Link>
          <span className="text-white/20">›</span>
          <Link href="/vacancies" className="text-white/40 no-underline hover:text-white/70 transition-colors">{t('vacanciesPage.title')}</Link>
        </div>
        <div className="flex gap-2 mb-4 flex-wrap relative z-[1]">
          {v.isHot && <span className="bg-amber text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-sm">{t('vacanciesPage.hotVacancy')}</span>}
          <span className="bg-white/15 backdrop-blur-sm text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-sm">📍 {v.location || 'Республика Казахстан'}</span>
        </div>
        <h1 className="text-[clamp(24px,3.4vw,42px)] font-extrabold text-white tracking-tight leading-[1.12] max-w-[820px] relative z-[1]">{title}</h1>
      </div>

      <div className="max-w-[860px] mx-auto px-6 md:px-8 py-12">
        {/* Salary */}
        <div className="bg-sky rounded-xl p-6 mb-9 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <div className="text-[10px] text-text-dim font-bold tracking-widest uppercase mb-1">{t('vacanciesPage.salary')}</div>
            <div className="text-[22px] font-extrabold text-forest">{v.salary || t('vacanciesPage.byAgreement')}</div>
          </div>
          <span className="bg-white text-forest-light text-[11px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-sm">{t('vacanciesPage.fullTime')}</span>
        </div>

        {desc && <p className="text-[15.5px] text-text-mid leading-[1.85] whitespace-pre-line mb-10">{desc}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="text-[12px] font-bold tracking-wider uppercase text-forest-light mb-3">{t('vacanciesPage.requirements')}</div>
            <ul className="list-disc list-inside text-[14px] text-text-dim flex flex-col gap-2">
              {requirements.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          </div>
          <div>
            <div className="text-[12px] font-bold tracking-wider uppercase text-forest-light mb-3">{t('vacanciesPage.conditions')}</div>
            <ul className="list-disc list-inside text-[14px] text-text-dim flex flex-col gap-2">
              {conditions.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex items-center justify-between gap-4 flex-wrap">
          <Link href="/vacancies" className="inline-flex items-center gap-2 px-6 py-3 text-[12.5px] font-bold tracking-wider uppercase bg-forest text-white rounded-sm no-underline hover:bg-forest-mid hover:-translate-y-0.5 transition-all">
            ← {t('vacanciesPage.title')}
          </Link>
          <div className="text-[13px] text-text-dim">
            {t('vacanciesPage.hrTitle')}: <a href="tel:+77273461371" className="font-bold text-forest no-underline">+7 (727) 346-13-71</a>
          </div>
        </div>
      </div>
    </>
  );
}
