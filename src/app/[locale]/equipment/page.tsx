'use client';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import Image from 'next/image';

type Aircraft = {
  name: string;
  type: string;
  category: 'plane' | 'heli';
  specs: [string, string][];
  img?: string;
};

// Парк ВС РГКП «Казавиалесоохрана». ТТХ — типовые паспортные значения, уточняются.
const equipment: Aircraft[] = [
  // Самолёты
  { name: 'Ан-2', type: 'Самолёт', category: 'plane', specs: [['Скорость', '180 км/ч'], ['Дальность', '845 км'], ['Экипаж', '2 чел.'], ['Вместимость', '12 чел.']], img: '/equipment/an-2.webp' },
  { name: 'PA-68 «Partenavia»', type: 'Самолёт', category: 'plane', specs: [['Скорость', '300 км/ч'], ['Дальность', '2 000 км'], ['Экипаж', '2 чел.'], ['Вместимость', '6 чел.']], img: '/equipment/pa-68.webp' },
  // Вертолёты
  { name: 'Ми-8', type: 'Вертолёт', category: 'heli', specs: [['Скорость', '250 км/ч'], ['Дальность', '465 км'], ['Экипаж', '3 чел.'], ['Груз', '4 000 кг']], img: '/equipment/mi-8.jpeg' },
  { name: 'Ми-2', type: 'Вертолёт', category: 'heli', specs: [['Скорость', '200 км/ч'], ['Дальность', '580 км'], ['Экипаж', '1 чел.'], ['Вместимость', '8 чел.']], img: '/equipment/mi-2.webp' },
  { name: 'EC-130', type: 'Вертолёт', category: 'heli', specs: [['Скорость', '235 км/ч'], ['Дальность', '610 км'], ['Экипаж', '1 чел.'], ['Вместимость', '7 чел.']], img: '/equipment/ec-130.jpg' },
  { name: 'EC-145', type: 'Вертолёт', category: 'heli', specs: [['Скорость', '250 км/ч'], ['Дальность', '680 км'], ['Экипаж', '2 чел.'], ['Вместимость', '9 чел.']], img: '/equipment/ec-145.jpg' },
  { name: 'AS-350', type: 'Вертолёт', category: 'heli', specs: [['Скорость', '245 км/ч'], ['Дальность', '660 км'], ['Экипаж', '1 чел.'], ['Вместимость', '5 чел.']], img: '/equipment/as-350.jpg' },
  { name: 'BO-105', type: 'Вертолёт', category: 'heli', specs: [['Скорость', '240 км/ч'], ['Дальность', '575 км'], ['Экипаж', '2 чел.'], ['Вместимость', '4 чел.']], img: '/equipment/bo-105.jpg' },
];

const planes = equipment.filter((e) => e.category === 'plane');
const helis = equipment.filter((e) => e.category === 'heli');

export default function EquipmentPage() {
  const t = useTranslations();
  useScrollReveal();

  return (
    <>
      <div className="bg-forest px-8 md:px-14 py-14 relative overflow-hidden">
        <div className="flex items-center gap-2 text-[11px] text-white/40 tracking-widest uppercase font-semibold mb-4">
          <Link href="/" className="text-white/40 no-underline hover:text-white/70">{t('common.home')}</Link>
          <span className="text-white/20">›</span><span>{t('nav.equipment')}</span>
        </div>
        <h1 className="text-[clamp(28px,4vw,52px)] font-extrabold text-white tracking-tight">{t('nav.equipment')}</h1>
      </div>

      {[
        { key: 'planes', icon: '✈️', label: t('equipmentPage.planes'), list: planes },
        { key: 'helis', icon: '🚁', label: t('equipmentPage.helicopters'), list: helis },
      ].map((group) => (
        <div key={group.key} className="px-8 md:px-14 pt-14 pb-4 last:pb-18">
          <div className="flex items-center gap-3 mb-8 reveal from-bottom">
            <span className="text-3xl">{group.icon}</span>
            <h2 className="text-[clamp(22px,3vw,34px)] font-extrabold text-forest tracking-tight">{group.label}</h2>
            <span className="ml-1 text-[13px] font-bold text-text-dim bg-sky px-2.5 py-1 rounded">{group.list.length}</span>
          </div>
          <div className="flex flex-col gap-12">
            {group.list.map((eq, i) => (
              <div key={i} className="grid grid-cols-1 lg:grid-cols-2 border border-border overflow-hidden hover:shadow-xl transition-shadow reveal from-bottom" style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="overflow-hidden aspect-video lg:aspect-auto bg-gradient-to-br from-forest-pale to-sky flex items-center justify-center">
                  {eq.img ? (
                    <Image src={eq.img} alt={eq.name} width={700} height={450} className="w-full h-full object-cover saturate-[0.85] hover:scale-[1.03] transition-transform duration-500" />
                  ) : (
                    <span className="text-7xl opacity-40">{group.icon}</span>
                  )}
                </div>
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <span className="bg-sky text-forest-light text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 self-start mb-4">{eq.type}</span>
                  <h3 className="text-[clamp(28px,3vw,42px)] font-extrabold text-forest tracking-tight mb-4">{eq.name}</h3>
                  <table className="w-full border-collapse mt-4">
                    <tbody>
                      {eq.specs.map(([label, val], j) => (
                        <tr key={j} className="border-b border-border last:border-b-0">
                          <td className="py-3 text-[12px] font-bold tracking-widest uppercase text-text-dim w-[140px]">{label}</td>
                          <td className="py-3 text-[15px] font-semibold text-forest">{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
