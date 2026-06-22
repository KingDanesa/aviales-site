'use client';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useScrollReveal } from '@/hooks/useScrollReveal';

type Leader = {
  name: string;
  role: string;
  email?: string;
  phones?: string[];
};

const leaders: Leader[] = [
  { name: 'Айнабеков Марлен Сансызбайулы', role: 'Генеральный директор', email: 'Airbar@list.ru', phones: ['87272482039', '87773338181'] },
  { name: 'Абсаметов Дамир Маркенович', role: 'Заместитель генерального директора', email: 'Airbar@list.ru' },
  { name: 'Абуев Игорь Александрович', role: 'Заместитель генерального директора', email: 'Airbar@list.ru', phones: ['87272472704', '87775104499'] },
];

export default function LeadershipPage() {
  const t = useTranslations();
  useScrollReveal();

  return (
    <>
      <div className="bg-forest px-8 md:px-14 py-14 relative overflow-hidden">
        <div className="flex items-center gap-2 text-[11px] text-white/40 tracking-widest uppercase font-semibold mb-4">
          <Link href="/" className="text-white/40 no-underline hover:text-white/70">{t('common.home')}</Link>
          <span className="text-white/20">›</span><span>{t('nav.leadership')}</span>
        </div>
        <h1 className="text-[clamp(28px,4vw,52px)] font-extrabold text-white tracking-tight">{t('nav.leadership')}</h1>
      </div>

      {/* Leaders */}
      <div className="px-8 md:px-14 py-18">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto reveal-stagger">
          {leaders.map((leader, i) => (
            <div key={i} className="bg-white border border-border overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col">
              <div className="w-full aspect-square bg-gradient-to-br from-forest-pale to-sky flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-forest/10 border border-forest/20 flex items-center justify-center text-5xl">👤</div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="text-[17px] font-extrabold text-forest mb-1 leading-snug">{leader.name}</div>
                <div className="text-[12px] font-bold text-amber-dark tracking-wide uppercase mb-4">{leader.role}</div>
                <div className="mt-auto flex flex-col gap-1.5 border-t border-border pt-4">
                  {leader.phones?.map((p, j) => (
                    <a key={j} href={`tel:${p.replace(/[^+\d]/g, '')}`} className="flex items-center gap-2 text-[13px] font-semibold text-forest no-underline hover:text-amber-dark">
                      <span className="text-text-dim">📞</span>{p}
                    </a>
                  ))}
                  {leader.email && (
                    <a href={`mailto:${leader.email}`} className="flex items-center gap-2 text-[13px] font-semibold text-forest-light no-underline hover:text-amber-dark break-all">
                      <span className="text-text-dim">✉️</span>{leader.email}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
