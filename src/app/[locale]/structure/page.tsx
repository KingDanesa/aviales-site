'use client';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { OrgChart } from '@/components/OrgChart';

export default function StructurePage() {
  const t = useTranslations();
  useScrollReveal();

  return (
    <>
      <div className="bg-forest px-8 md:px-14 py-14 relative overflow-hidden">
        <div className="flex items-center gap-2 text-[11px] text-white/40 tracking-widest uppercase font-semibold mb-4">
          <Link href="/" className="text-white/40 no-underline hover:text-white/70">{t('common.home')}</Link>
          <span className="text-white/20">›</span><span>{t('nav.structure')}</span>
        </div>
        <h1 className="text-[clamp(28px,4vw,52px)] font-extrabold text-white tracking-tight">{t('nav.structure')}</h1>
        <p className="mt-3 text-[15px] text-white/55 max-w-[600px] leading-relaxed">{t('structurePage.subtitle')} · {t('structurePage.unitsTotal')}</p>
      </div>

      <div className="bg-sky px-4 md:px-10 py-16">
        <OrgChart />
      </div>
    </>
  );
}
