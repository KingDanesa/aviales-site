'use client';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import Image from 'next/image';

const timeline = [
  { year: '1948', active: true },
  { year: '1972', active: false },
  { year: '1978', active: true },
  { year: '1989', active: false },
  { year: '2003', active: false },
  { year: '2026', active: true },
];

const functions = [
  { num: '01', icon: '🔥' },
  { num: '02', icon: '🌲' },
  { num: '03', icon: '🔬' },
  { num: '04', icon: '🚁' },
  { num: '05', icon: '🦌' },
  { num: '06', icon: '📢' },
];

export default function AboutPage() {
  const t = useTranslations();
  useScrollReveal();

  return (
    <>
      <div className="bg-forest px-8 md:px-14 py-14 relative overflow-hidden">
        <div className="absolute -right-15 -top-15 w-80 h-80 rounded-full bg-white/[0.03]" />
        <div className="flex items-center gap-2 text-[11px] text-white/40 tracking-widest uppercase font-semibold mb-4">
          <Link href="/" className="text-white/40 no-underline hover:text-white/70">{t('common.home')}</Link>
          <span className="text-white/20">›</span><span>{t('aboutPage.title')}</span>
        </div>
        <h1 className="text-[clamp(28px,4vw,52px)] font-extrabold text-white tracking-tight leading-[1.05] max-w-[700px] relative z-[1]">{t('aboutPage.title')}</h1>
        <p className="mt-3 text-[15px] text-white/55 max-w-[560px] leading-relaxed relative z-[1]">{t('aboutPage.subtitle')}</p>
      </div>

      {/* Lead */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-18 px-8 md:px-14 py-18 items-center">
        <div>
          <div className="text-[11px] tracking-[0.18em] uppercase font-bold text-forest-light mb-4 flex items-center gap-3 reveal from-bottom">
            <span className="w-7 h-0.5 bg-forest-light shrink-0" />{t('aboutPage.whoWeAre')}
          </div>
          <h2 className="text-[clamp(28px,3.5vw,48px)] font-extrabold leading-[1.05] tracking-tight text-forest mb-10 reveal from-bottom" style={{ transitionDelay: '.05s' }}>{t('aboutPage.uniqueService')}</h2>
          <div className="reveal from-bottom" style={{ transitionDelay: '.1s' }}>
            <p className="text-[16px] text-text-mid leading-[1.85] mb-5">{t('aboutSection.p1')}</p>
            <p className="text-[16px] text-text-mid leading-[1.85] mb-5">{t('aboutSection.p2')}</p>
          </div>
        </div>
        <div className="relative reveal from-right">
          <div className="absolute -top-3.5 -right-3.5 bottom-3.5 left-3.5 border border-forest-pale -z-10" />
          <Image src="https://aviales.kz/uploads/posts/2025-01/1737613841_5ac076e3-c844-4aa4-8a2c-8296e9d2d16c.jpg" alt="" width={600} height={450} className="w-full aspect-[4/3] object-cover saturate-[0.85]" />
        </div>
      </div>

      {/* Functions */}
      <div className="bg-sky px-8 md:px-14 py-18">
        <div className="text-[11px] tracking-[0.18em] uppercase font-bold text-forest-light mb-4 flex items-center gap-3 reveal from-bottom">
          <span className="w-7 h-0.5 bg-forest-light shrink-0" />{t('aboutPage.functions')}
        </div>
        <h2 className="text-[clamp(28px,3.5vw,48px)] font-extrabold leading-[1.05] tracking-tight text-forest mb-10 reveal from-bottom">{t('aboutPage.functionsTitle')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border reveal-stagger">
          {functions.map((f, i) => (
            <div key={i} className="bg-white p-8 hover:bg-sky transition-colors">
              <div className="text-[40px] font-extrabold text-forest-pale leading-none mb-3.5 tracking-tight">{f.num}</div>
              <div className="text-[14px] font-bold text-forest mb-2 leading-snug">{t(`services.s${i + 1}_title`)}</div>
              <div className="text-[12.5px] text-text-dim leading-relaxed">{t(`services.s${i + 1}_desc`)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="px-8 md:px-14 py-18">
        <div className="text-[11px] tracking-[0.18em] uppercase font-bold text-forest-light mb-4 flex items-center gap-3 reveal from-bottom">
          <span className="w-7 h-0.5 bg-forest-light shrink-0" />{t('aboutPage.history')}
        </div>
        <h2 className="text-[clamp(28px,3.5vw,48px)] font-extrabold leading-[1.05] tracking-tight text-forest mb-10 reveal from-bottom">{t('aboutPage.historyTitle')}</h2>
        <div className="flex flex-col gap-0 relative mt-10">
          <div className="absolute left-[120px] top-0 bottom-0 w-px bg-border hidden md:block" />
          {timeline.map((item, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-4 md:gap-10 py-8 border-b border-border last:border-b-0 relative reveal from-bottom" style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="text-[26px] font-extrabold text-forest tracking-tight leading-none pt-1">{item.year}</div>
              <div className={`absolute left-[112px] top-[38px] w-[17px] h-[17px] rounded-full border-2 hidden md:block ${item.active ? 'bg-amber border-amber' : 'bg-white border-forest-light'}`} />
              <div>
                <h3 className="text-[15px] font-bold text-forest mb-2">
                  {i === 0 ? 'Начало авиационной охраны' : i === 1 ? 'Казахский авиарайон' : i === 2 ? 'Основание Казавиалесоохраны' : i === 3 ? 'Расцвет службы' : i === 4 ? 'Восстановление и рост' : 'Сегодня'}
                </h3>
                <p className="text-[13.5px] text-text-dim leading-relaxed">
                  {i === 0 ? 'Авиационная охрана лесов в Казахстане была начата в трёх наиболее опасных в пожарном отношении областях.' : i === 1 ? 'Создан Казахский авиарайон Западно-Сибирской авиабазы.' : i === 2 ? 'В республике организована самостоятельная специализированная служба — Казахская база авиационной охраны лесов.' : i === 3 ? '14 авиалесоохранных подразделений охраняли более 6,5 млн га лесов.' : i === 4 ? 'С 2003 года налёты стали стабильными: от 6 200 до 9 000 часов в год.' : '«Казавиалесоохрана» продолжает выполнять миссию по защите лесов Казахстана.'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery */}
      <div className="bg-sky px-8 md:px-14 py-18">
        <div className="text-[11px] tracking-[0.18em] uppercase font-bold text-forest-light mb-4 flex items-center gap-3 reveal from-bottom">
          <span className="w-7 h-0.5 bg-forest-light shrink-0" />{t('aboutPage.gallery')}
        </div>
        <h2 className="text-[clamp(28px,3.5vw,48px)] font-extrabold leading-[1.05] tracking-tight text-forest mb-10 reveal from-bottom">{t('aboutPage.galleryTitle')}</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 reveal-stagger">
          {[
            'https://aviales.kz/uploads/posts/2025-03/1740983100_1d54e5a8-6001-4326-871d-5c442eec8053.jpg',
            'https://aviales.kz/uploads/posts/2026-02/1772079209_img_2683.jpg',
            'https://aviales.kz/uploads/posts/2025-03/1740984680_image-01-03-25-06-22-2.jpeg',
            'https://aviales.kz/uploads/posts/2025-01/1737613841_5ac076e3-c844-4aa4-8a2c-8296e9d2d16c.jpg',
            'https://aviales.kz/uploads/posts/2025-03/1740999322_0bb049fe-b780-479b-bc52-99e18433af92.jpeg',
            'https://aviales.kz/uploads/posts/2025-01/1737613856_d08a05b9-5719-48d7-a649-ad49cc53d40a.jpg',
            'https://aviales.kz/uploads/posts/2024-10/1728895509_img_20241006_164710.jpg',
          ].map((src, i) => (
            <Image key={i} src={src} alt="" width={300} height={225} className={`w-full aspect-[4/3] object-cover saturate-[0.8] hover:saturate-110 hover:scale-[1.02] transition-all cursor-pointer ${i === 0 ? 'col-span-2 aspect-video' : ''}`} />
          ))}
        </div>
      </div>
    </>
  );
}
