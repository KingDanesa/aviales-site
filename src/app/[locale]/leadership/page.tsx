'use client';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const leaders = [
  { name: 'Иванов Алексей Николаевич', role: 'Генеральный директор', desc: 'Руководит предприятием с 2015 года. Имеет более 20 лет стажа в области лесного хозяйства.' },
  { name: 'Сериков Нурлан Кайратович', role: 'Заместитель генерального директора', desc: 'Отвечает за оперативно-диспетчерское управление и координацию работы филиалов.' },
  { name: 'Жумабаев Ерлан Маратович', role: 'Главный инженер', desc: 'Обеспечивает техническое состояние авиационного парка и наземного оборудования.' },
];

const departments = [
  { name: 'Абишева Айгерим Серікқызы', role: 'Отдел кадров' },
  { name: 'Козлов Дмитрий Алексеевич', role: 'Бухгалтерия' },
  { name: 'Нурланова Алия Бахытовна', role: 'Юридический отдел' },
  { name: 'Темирханов Бауыржан Ермекович', role: 'Лётная служба' },
  { name: 'Каримов Руслан Олегович', role: 'ПДС' },
  { name: 'Жансеитова Маржан Канатовна', role: 'Административный отдел' },
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 reveal-stagger">
          {leaders.map((leader, i) => (
            <div key={i} className="bg-white border border-border overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="w-full aspect-square bg-gradient-to-br from-forest-pale to-sky flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-forest/10 border border-forest/20 flex items-center justify-center text-5xl">👤</div>
              </div>
              <div className="p-6">
                <div className="text-[17px] font-extrabold text-forest mb-1">{leader.name}</div>
                <div className="text-[12px] font-bold text-amber-dark tracking-wide uppercase mb-3">{leader.role}</div>
                <div className="text-[13px] text-text-dim leading-relaxed">{leader.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Departments */}
      <div className="bg-sky px-8 md:px-14 py-18">
        <h2 className="text-[clamp(24px,3vw,36px)] font-extrabold text-forest tracking-tight mb-8 reveal from-bottom">Руководители подразделений</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border reveal-stagger">
          {departments.map((d, i) => (
            <div key={i} className="bg-white px-7 py-6 hover:bg-sky transition-colors flex gap-4 items-center">
              <div className="w-12 h-12 rounded-full bg-forest-pale flex items-center justify-center text-xl shrink-0">👤</div>
              <div>
                <div className="text-[14px] font-bold text-forest leading-snug">{d.name}</div>
                <div className="text-[11px] text-text-dim font-semibold tracking-wide">{d.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
