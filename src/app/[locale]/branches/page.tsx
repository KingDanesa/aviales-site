'use client';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { branches, tr } from '@/lib/branches';
import { BranchesMap } from '@/components/BranchesMap';

export default function BranchesPage() {
  const t = useTranslations();
  const locale = useLocale();
  useScrollReveal();

  return (
    <>
      <div className="bg-forest px-8 md:px-14 py-14 relative overflow-hidden">
        <div className="flex items-center gap-2 text-[11px] text-white/40 tracking-widest uppercase font-semibold mb-4">
          <Link href="/" className="text-white/40 no-underline hover:text-white/70">{t('common.home')}</Link>
          <span className="text-white/20">›</span><span>{t('nav.branches')}</span>
        </div>
        <h1 className="text-[clamp(28px,4vw,52px)] font-extrabold text-white tracking-tight">{t('nav.branches')}</h1>
        <p className="mt-3 text-[15px] text-white/55 max-w-[620px] leading-relaxed">{t('branchesPage.subtitle')}</p>
      </div>

      {/* Interactive map */}
      <div className="px-8 md:px-14 py-14">
        <BranchesMap />
      </div>

      <div className="bg-sky px-8 md:px-14 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 reveal-stagger">
          {branches.map((b, i) => (
            <div key={i} className="bg-white border border-border p-6 flex flex-col hover:shadow-xl hover:-translate-y-0.5 transition-all">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="text-[17px] font-extrabold text-forest leading-tight">{tr(b.name, locale)}</div>
                  <div className="text-[11px] text-text-dim font-semibold tracking-wide uppercase mt-1">{tr(b.region, locale)}</div>
                </div>
                <span className="w-9 h-9 bg-sky flex items-center justify-center text-base shrink-0">📍</span>
              </div>

              <div className="text-[13px] text-text-mid leading-relaxed mb-4 flex-1">{tr(b.address, locale)}</div>

              {b.head && (
                <div className="border-t border-border pt-4 mt-auto">
                  <div className="text-[10px] text-text-dim font-bold tracking-widest uppercase mb-1">{b.role ? tr(b.role, locale) : ''}</div>
                  <div className="text-[14px] font-bold text-forest mb-2.5">{b.head}</div>
                  <div className="flex flex-col gap-1.5">
                    {b.phones?.map((p, j) => (
                      <a key={j} href={`tel:${p.replace(/[^+\d]/g, '')}`} className="flex items-center gap-2 text-[13px] font-semibold text-forest no-underline hover:text-amber-dark">
                        <span className="text-text-dim">📞</span>{p}
                      </a>
                    ))}
                    {b.email && (
                      <a href={`mailto:${b.email}`} className="flex items-center gap-2 text-[13px] font-semibold text-forest-light no-underline hover:text-amber-dark break-all">
                        <span className="text-text-dim">✉️</span>{b.email}
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
