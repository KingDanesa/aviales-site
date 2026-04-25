'use client';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useState } from 'react';

const branchesData = [
  { id: 'almaty', name: 'Алматинское', region: 'Алматинская область', phone: '+7 (727) 346-13-71', area: '1,200,000 га', staff: 28 },
  { id: 'borovoe', name: 'Боровское', region: 'Акмолинская область', phone: '+7 (716) 253-12-55', area: '850,000 га', staff: 22 },
  { id: 'karkaralinsk', name: 'Каркаралинское', region: 'Карагандинская область', phone: '+7 (721) 441-23-80', area: '1,100,000 га', staff: 18 },
  { id: 'bayanaul', name: 'Баянаульское', region: 'Павлодарская область', phone: '+7 (718) 237-14-66', area: '650,000 га', staff: 14 },
  { id: 'semey', name: 'Семейское', region: 'Восточно-Казахстанская область', phone: '+7 (722) 252-18-90', area: '720,000 га', staff: 20 },
  { id: 'ridder', name: 'Риддерское', region: 'ВКО, Риддер', phone: '+7 (723) 336-21-77', area: '480,000 га', staff: 12 },
  { id: 'bukhtarma', name: 'Бухтарминское', region: 'ВКО', phone: '+7 (722) 255-33-44', area: '560,000 га', staff: 15 },
  { id: 'aksu', name: 'Аксу-Джабаглинское', region: 'Южный Казахстан', phone: '+7 (725) 312-45-88', area: '340,000 га', staff: 10 },
];

export default function BranchesPage() {
  const t = useTranslations();
  useScrollReveal();
  const [selected, setSelected] = useState('almaty');

  const branch = branchesData.find(b => b.id === selected)!;

  return (
    <>
      <div className="bg-forest px-8 md:px-14 py-14 relative overflow-hidden">
        <div className="flex items-center gap-2 text-[11px] text-white/40 tracking-widest uppercase font-semibold mb-4">
          <Link href="/" className="text-white/40 no-underline hover:text-white/70">{t('common.home')}</Link>
          <span className="text-white/20">›</span><span>{t('nav.branches')}</span>
        </div>
        <h1 className="text-[clamp(28px,4vw,52px)] font-extrabold text-white tracking-tight">{t('nav.branches')}</h1>
      </div>

      {/* SVG Map */}
      <div className="bg-sky px-8 md:px-14 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">
          {/* Map placeholder */}
          <div className="bg-white border border-border p-8 relative min-h-[400px] reveal from-left">
            <svg viewBox="0 0 800 400" className="w-full h-full" fill="none">
              <path d="M50 200 Q100 120 200 140 Q300 100 400 130 Q500 80 600 120 Q700 100 750 160 Q780 200 750 260 Q700 320 600 300 Q500 340 400 290 Q300 320 200 280 Q100 300 50 200Z" fill="#d4e8dc" stroke="#3d7a55" strokeWidth="1.5" opacity="0.5" />
              {branchesData.map((b, i) => {
                const positions: Record<string, { x: number; y: number }> = {
                  almaty: { x: 520, y: 280 }, borovoe: { x: 380, y: 140 }, karkaralinsk: { x: 450, y: 200 },
                  bayanaul: { x: 480, y: 150 }, semey: { x: 580, y: 180 }, ridder: { x: 640, y: 150 },
                  bukhtarma: { x: 610, y: 200 }, aksu: { x: 340, y: 300 },
                };
                const pos = positions[b.id];
                return (
                  <g key={i} onClick={() => setSelected(b.id)} className="cursor-pointer">
                    <circle cx={pos.x} cy={pos.y} r={selected === b.id ? 10 : 6} fill={selected === b.id ? '#c88c1e' : '#3d7a55'} stroke="white" strokeWidth="2" className="transition-all" />
                    {selected === b.id && <circle cx={pos.x} cy={pos.y} r="16" fill="none" stroke="#c88c1e" strokeWidth="1" opacity="0.5" />}
                    <text x={pos.x} y={pos.y - 14} textAnchor="middle" className="text-[9px] font-bold fill-forest">{b.name}</text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Branch Info */}
          <div className="reveal from-right">
            <div className="bg-white border border-border p-8">
              <div className="text-[24px] font-extrabold text-forest mb-1">{branch.name}</div>
              <div className="text-[13px] text-text-dim mb-6">{branch.region}</div>
              <div className="flex flex-col gap-4">
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 bg-sky flex items-center justify-center text-lg shrink-0">📞</div>
                  <div>
                    <div className="text-[10px] text-text-dim font-bold tracking-widest uppercase">{t('contactsPage.phone')}</div>
                    <a href={`tel:${branch.phone}`} className="text-[14px] font-semibold text-forest no-underline">{branch.phone}</a>
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 bg-sky flex items-center justify-center text-lg shrink-0">🌲</div>
                  <div>
                    <div className="text-[10px] text-text-dim font-bold tracking-widest uppercase">Площадь охраны</div>
                    <div className="text-[14px] font-semibold text-forest">{branch.area}</div>
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 bg-sky flex items-center justify-center text-lg shrink-0">👥</div>
                  <div>
                    <div className="text-[10px] text-text-dim font-bold tracking-widest uppercase">Сотрудников</div>
                    <div className="text-[14px] font-semibold text-forest">{branch.staff}</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Branch List */}
            <div className="mt-4 flex flex-col gap-1">
              {branchesData.map((b) => (
                <button key={b.id} onClick={() => setSelected(b.id)} className={`text-left px-5 py-3 text-[13px] font-semibold border-none cursor-pointer font-sans transition-all ${selected === b.id ? 'bg-forest text-white' : 'bg-white text-text-mid hover:bg-sky'} border border-border`}>
                  {b.name}
                  <span className="text-[11px] opacity-50 ml-2">{b.region}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
