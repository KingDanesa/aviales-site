'use client';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { tr, type Localized } from '@/lib/branches';

type Leader = {
  name: string;
  role: Localized;
  email?: string;
  phones?: string[];
};

const ROLE_DIRECTOR: Localized = { ru: 'Генеральный директор', kz: 'Бас директор', en: 'General Director' };
const ROLE_DEPUTY: Localized = { ru: 'Заместитель генерального директора', kz: 'Бас директордың орынбасары', en: 'Deputy General Director' };

const director: Leader = {
  name: 'Айнабеков Марлен Сансызбайулы',
  role: ROLE_DIRECTOR,
  email: 'Airbar@list.ru',
  phones: ['87272482039', '87773338181'],
};

const deputies: Leader[] = [
  { name: 'Абсаметов Дамир Маркенович', role: ROLE_DEPUTY, email: 'Airbar@list.ru' },
  { name: 'Абуев Игорь Александрович', role: ROLE_DEPUTY, email: 'Airbar@list.ru', phones: ['87272472704', '87775104499'] },
];

function Contacts({ leader, center }: { leader: Leader; center?: boolean }) {
  return (
    <div className={`flex flex-col gap-1.5 ${center ? 'items-center' : ''}`}>
      {leader.phones?.map((p, j) => (
        <a key={j} href={`tel:${p.replace(/[^+\d]/g, '')}`} className="flex items-center gap-2 text-[13.5px] font-semibold text-forest no-underline hover:text-amber-dark">
          <span className="text-text-dim">📞</span>{p}
        </a>
      ))}
      {leader.email && (
        <a href={`mailto:${leader.email}`} className="flex items-center gap-2 text-[13.5px] font-semibold text-forest-light no-underline hover:text-amber-dark break-all">
          <span className="text-text-dim">✉️</span>{leader.email}
        </a>
      )}
    </div>
  );
}

export default function LeadershipPage() {
  const t = useTranslations();
  const locale = useLocale();
  useScrollReveal();

  return (
    <>
      <div className="bg-forest px-8 md:px-14 py-14 relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-white/[0.03]" />
        <div className="flex items-center gap-2 text-[11px] text-white/40 tracking-widest uppercase font-semibold mb-4">
          <Link href="/" className="text-white/40 no-underline hover:text-white/70">{t('common.home')}</Link>
          <span className="text-white/20">›</span><span>{t('nav.leadership')}</span>
        </div>
        <h1 className="text-[clamp(28px,4vw,52px)] font-extrabold text-white tracking-tight relative z-[1]">{t('nav.leadership')}</h1>
      </div>

      <div className="bg-sky px-8 md:px-14 py-20">
        <div className="flex flex-col items-center max-w-4xl mx-auto">
          {/* Director */}
          <div className="w-full max-w-[480px] reveal from-bottom">
            <div className="relative bg-white border border-border rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all">
              <div className="h-1.5 bg-gradient-to-r from-forest via-forest-light to-amber" />
              <div className="p-8 flex flex-col sm:flex-row items-center gap-6">
                <div className="relative shrink-0">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-forest-pale to-sky border-4 border-white shadow-md flex items-center justify-center text-5xl">👤</div>
                  <span className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-amber text-white flex items-center justify-center text-base shadow-md">★</span>
                </div>
                <div className="text-center sm:text-left flex-1">
                  <div className="inline-block text-[11px] font-bold tracking-widest uppercase text-white bg-forest px-3 py-1 rounded-sm mb-3">{tr(director.role, locale)}</div>
                  <div className="text-[22px] font-extrabold text-forest leading-tight mb-4">{director.name}</div>
                  <Contacts leader={director} />
                </div>
              </div>
            </div>
          </div>

          {/* Connectors */}
          <div className="w-px h-12 bg-gradient-to-b from-forest/50 to-border" />

          {/* Deputies */}
          <div className="relative w-full">
            {/* tree lines (desktop) */}
            <div className="hidden md:block absolute -top-6 left-1/2 -translate-x-1/2 w-1/2 h-px bg-border" />
            <div className="hidden md:block absolute -top-6 left-1/4 w-px h-6 bg-border" />
            <div className="hidden md:block absolute -top-6 right-1/4 w-px h-6 bg-border" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 reveal-stagger">
              {deputies.map((d, i) => (
                <div key={i} className="bg-white border border-border rounded-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all">
                  <div className="h-1 bg-gradient-to-r from-forest-light to-amber/70" />
                  <div className="p-7 flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-forest-pale to-sky border-4 border-white shadow flex items-center justify-center text-4xl mb-4">👤</div>
                    <div className="text-[11px] font-bold tracking-widest uppercase text-amber-dark mb-2">{tr(d.role, locale)}</div>
                    <div className="text-[17px] font-extrabold text-forest leading-snug mb-4">{d.name}</div>
                    <div className="w-full border-t border-border pt-4 flex justify-center">
                      <Contacts leader={d} center />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
