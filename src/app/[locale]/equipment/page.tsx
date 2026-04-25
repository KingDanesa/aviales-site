'use client';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import Image from 'next/image';

const equipment = [
  { name: 'Ан-2', type: 'Самолёт', specs: [['Скорость', '180 км/ч'], ['Дальность', '845 км'], ['Экипаж', '2 чел.'], ['Вместимость', '12 чел.']], img: 'https://aviales.kz/uploads/posts/2025-03/1740983100_1d54e5a8-6001-4326-871d-5c442eec8053.jpg' },
  { name: 'Ми-8', type: 'Вертолёт', specs: [['Скорость', '250 км/ч'], ['Дальность', '465 км'], ['Экипаж', '3 чел.'], ['Груз', '4 000 кг']], img: 'https://aviales.kz/uploads/posts/2026-02/1772079209_img_2683.jpg' },
  { name: 'Ка-32', type: 'Вертолёт', specs: [['Скорость', '260 км/ч'], ['Дальность', '800 км'], ['Экипаж', '2 чел.'], ['Водосл. бак', '3 000 л']], img: 'https://aviales.kz/uploads/posts/2025-01/1737613841_5ac076e3-c844-4aa4-8a2c-8296e9d2d16c.jpg' },
];

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

      <div className="px-8 md:px-14 py-18 flex flex-col gap-12">
        {equipment.map((eq, i) => (
          <div key={i} className="grid grid-cols-1 lg:grid-cols-2 border border-border overflow-hidden hover:shadow-xl transition-shadow reveal from-bottom" style={{ transitionDelay: `${i * 0.1}s` }}>
            <div className="overflow-hidden aspect-video lg:aspect-auto">
              <Image src={eq.img} alt={eq.name} width={700} height={450} className="w-full h-full object-cover saturate-[0.85] hover:scale-[1.03] transition-transform duration-500" />
            </div>
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <span className="bg-sky text-forest-light text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 self-start mb-4">{eq.type}</span>
              <h2 className="text-[clamp(28px,3vw,42px)] font-extrabold text-forest tracking-tight mb-4">{eq.name}</h2>
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
    </>
  );
}
