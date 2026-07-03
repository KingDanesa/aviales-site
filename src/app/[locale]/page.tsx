'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { BranchesMap } from '@/components/BranchesMap';
import { HomeContact } from '@/components/HomeContact';
import { tr } from '@/lib/branches';
import { siteStats } from '@/lib/siteStats';

const services = [
  { icon: '🔥', key: 's1' },
  { icon: '🌲', key: 's2' },
  { icon: '🚁', key: 's3' },
  { icon: '🦌', key: 's4' },
  { icon: '🔬', key: 's5' },
  { icon: '📢', key: 's6' },
];

export default function HomePage() {
  const t = useTranslations();
  const locale = useLocale();
  useScrollReveal();

  const [news, setNews] = useState<any[]>([]);

  const catLabel = (c: string): string => ({
    fire: t('newsPage.filterFire'),
    training: t('newsPage.filterTraining'),
    raids: t('newsPage.filterRaids'),
    meetings: t('newsPage.filterMeetings'),
    events: t('newsPage.filterEvents'),
    anticorr: t('newsPage.filterAnticorr'),
    other: t('newsPage.filterOther'),
  }[c] || c);

  // Stats counter animation
  useEffect(() => {
    // Fetch recent news
    fetch('/api/news')
      .then(res => res.json())
      .then(data => setNews((Array.isArray(data) ? data : []).filter((n: any) => n.published).slice(0, 3)))
      .catch(() => setNews([]));

    const statsObs = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        document.querySelectorAll('.stat-n[data-target]').forEach((el) => {
          const target = +(el as HTMLElement).dataset.target!;
          const dur = 1600;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / dur, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(target * ease).toLocaleString('ru');
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
        document.querySelectorAll<HTMLElement>('.stat-fill[data-w]').forEach((el) => {
          el.style.width = el.dataset.w + '%';
        });
        statsObs.disconnect();
      },
      { threshold: 0.3 }
    );
    const statsEl = document.getElementById('stats');
    if (statsEl) statsObs.observe(statsEl);

    // Parallax effect
    const handleScroll = () => {
      const scrolled = window.scrollY;
      document.querySelectorAll('.parallax').forEach(el => {
        const speed = parseFloat((el as HTMLElement).dataset.speed || '0.2');
        (el as HTMLElement).style.transform = `translateY(${scrolled * speed}px)`;
      });
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      statsObs.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="-mt-[76px]">
      {/* ═══ HERO ═══ */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-screen relative">
        {/* Left */}
        <div className="bg-forest px-8 md:px-16 py-20 lg:py-0 flex flex-col justify-center relative z-[3] overflow-hidden">
          {/* Decorative rings */}
          <div className="absolute -bottom-[120px] -left-[80px] w-[420px] h-[420px] rounded-full border border-white/[0.04] pointer-events-none" />
          <div className="absolute -bottom-[60px] -left-[30px] w-[280px] h-[280px] rounded-full border border-white/[0.06] pointer-events-none" />

          <div className="flex items-center gap-2.5 mb-7 relative z-[1]">
            <div className="w-2 h-2 rounded-full bg-amber animate-pulse" />
            <span className="text-[11px] text-white/40 tracking-[0.16em] uppercase font-semibold">
              {t('hero.kicker')}
            </span>
          </div>

          <h1 className="text-[clamp(44px,5.5vw,78px)] font-extrabold text-white leading-[0.98] tracking-tight mb-6 relative z-[1]" style={{ textWrap: 'balance' as never }}>
            {t('hero.title1')}<br />
            {t('hero.title2')}<br />
            <em className="text-amber not-italic">{t('hero.title3')}</em>
          </h1>

          <p className="text-[15px] text-white/50 leading-[1.78] mb-10 max-w-[440px] font-normal relative z-[1]">
            {t('hero.subtitle')}
          </p>

          <div className="flex gap-3 flex-wrap relative z-[1]">
            <Link href="/about" className="inline-flex items-center gap-2 px-7 py-3.5 text-[12.5px] font-bold tracking-wider uppercase no-underline bg-amber text-white rounded-sm hover:bg-amber-dark hover:-translate-y-0.5 hover:shadow-lg transition-all">
              {t('hero.btnAbout')}
            </Link>
            <Link href="/news" className="inline-flex items-center gap-2 px-7 py-3.5 text-[12.5px] font-bold tracking-wider uppercase no-underline bg-transparent text-white/70 border border-white/25 rounded-sm hover:border-white/60 hover:text-white transition-all">
              {t('hero.btnNews')}
            </Link>
          </div>

          <div className="absolute bottom-9 left-14 text-[10.5px] text-white/[0.18] tracking-widest font-medium">
            © РГКП «Казавиалесоохрана» · 1978—2026
          </div>
        </div>

        {/* Right */}
        <div className="relative overflow-hidden hidden lg:block">
          <div className="absolute inset-0">
            <div className="absolute -top-[15%] left-0 right-0 h-[130%] parallax origin-top" data-speed="0.3" style={{ animation: 'slowzoom 18s ease-in-out infinite alternate' }}>
              <Image
                src="/hero-forest.png"
                alt="Forest protection"
                fill
                className="object-cover saturate-[0.85] brightness-[0.75]"
                priority
              />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[rgba(26,58,40,0.6)] via-[rgba(26,58,40,0.2)] to-transparent z-[1]" />

          {/* Badge */}
          <div className="absolute bottom-10 right-10 z-[3] bg-white/95 backdrop-blur-sm p-5 shadow-[0_8px_48px_rgba(0,0,0,0.2)] rounded-sm" style={{ animation: 'badge-float 4s ease-in-out infinite' }}>
            <div className="text-[38px] font-extrabold text-forest leading-none tracking-tight">{siteStats.protectedArea}</div>
            <div className="text-[11px] text-text-dim mt-1 leading-snug max-w-[140px]">{t('hero.badge')}</div>
          </div>
        </div>
      </section>

      {/* ═══ TICKER ═══ */}
      <div className="bg-amber h-[46px] flex items-center overflow-hidden">
        <div className="bg-amber-dark text-white px-6 h-full flex items-center text-[10.5px] font-bold tracking-widest uppercase shrink-0 whitespace-nowrap">
          {t('ticker.label')}
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="flex whitespace-nowrap" style={{ animation: 'ticker 32s linear infinite' }}>
            {[
              'Сотрудники Южного авиационного звена успешно прошли плановую аттестацию',
              'Подготовка к пожароопасному сезону 2025 завершена',
              'Обучение природоохранных учреждений проведено в Кокшетау',
              'Руководитель Каркаралинского отделения прошёл обучение во Франции',
            ].map((item, i) => (
              <span key={i} className="px-9 text-[12px] text-black/65 font-semibold tracking-wide after:content-['·'] after:ml-9 after:opacity-40">
                {item}
              </span>
            ))}
            {[
              'Сотрудники Южного авиационного звена успешно прошли плановую аттестацию',
              'Подготовка к пожароопасному сезону 2025 завершена',
              'Обучение природоохранных учреждений проведено в Кокшетау',
              'Руководитель Каркаралинского отделения прошёл обучение во Франции',
            ].map((item, i) => (
              <span key={`dup-${i}`} className="px-9 text-[12px] text-black/65 font-semibold tracking-wide after:content-['·'] after:ml-9 after:opacity-40">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ STATS ═══ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 bg-sky border-b border-border" id="stats">
        {[
          { n: siteStats.foundedYear, target: siteStats.foundedYear, fixed: true, label: t('stats.year'), w: '100' },
          { n: '0', target: siteStats.branchesCount, label: t('stats.branches'), w: '75' },
          { n: '0', target: siteStats.flightHours, label: t('stats.hours'), w: '88' },
          { n: siteStats.protectedArea, label: t('stats.hectares'), w: '75' },
        ].map((stat, i) => (
          <div key={i} className="p-8 md:p-10 border-r border-border last:border-r-0 reveal from-bottom" style={{ transitionDelay: `${i * 0.1}s` }}>
            <span className={`stat-n text-[clamp(36px,4vw,52px)] font-extrabold text-forest tracking-tight leading-none block`} {...(stat.target ? { 'data-target': stat.target, ...(stat.fixed ? { 'data-fixed': '1' } : {}) } : {})}>
              {stat.n}
            </span>
            <div className="text-[12px] text-text-dim mt-2 leading-snug font-medium">{stat.label}</div>
            <div className="h-0.5 bg-border-strong mt-3.5 overflow-hidden rounded-sm">
              <div className="stat-fill h-full bg-amber rounded-sm w-0 transition-[width] duration-[1.4s] ease-[cubic-bezier(.4,0,.2,1)]" data-w={stat.w} />
            </div>
          </div>
        ))}
      </div>

      {/* ═══ ABOUT ═══ */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative overflow-hidden min-h-[400px] lg:min-h-[500px] reveal from-left group">
          <div className="absolute -top-[10%] left-0 right-0 h-[120%] parallax" data-speed="0.15">
            <Image
              src="/gallery/g4.jpeg"
              alt="About"
              fill
              className="object-cover saturate-[0.8] brightness-[0.9] group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-sky2/10" />
        </div>
        <div className="bg-sky2 px-8 md:px-16 py-16 md:py-20 flex flex-col justify-center">
          <div className="text-[11px] tracking-[0.18em] uppercase font-bold text-forest-light mb-4 flex items-center gap-3 reveal from-right">
            <span className="w-7 h-0.5 bg-forest-light shrink-0" />{t('aboutSection.eyebrow')}
          </div>
          <h2 className="text-[clamp(28px,3.5vw,48px)] font-extrabold leading-[1.05] tracking-tight text-forest mb-10 reveal from-right" style={{ transitionDelay: '.1s', textWrap: 'balance' as never }}>
            {t('aboutSection.title')}
          </h2>
          <div className="reveal from-right" style={{ transitionDelay: '.2s' }}>
            <p className="text-[15px] text-text-mid leading-[1.8] mb-4">{t('aboutSection.p1')}</p>
            <p className="text-[15px] text-text-mid leading-[1.8] mb-4">{t('aboutSection.p2')}</p>
          </div>
          <Link href="/about" className="self-start mt-6 inline-flex items-center gap-2 px-7 py-3.5 text-[12.5px] font-bold tracking-wider uppercase no-underline bg-forest text-white rounded-sm hover:bg-forest-mid hover:-translate-y-0.5 transition-all reveal from-right" style={{ transitionDelay: '.3s' }}>
            {t('aboutSection.btn')}
          </Link>
        </div>
      </div>

      {/* ═══ SERVICES ═══ */}
      <section className="bg-sky px-8 md:px-14 py-16 md:py-20">
        <div className="text-[11px] tracking-[0.18em] uppercase font-bold text-forest-light mb-4 flex items-center gap-3 reveal from-bottom">
          <span className="w-7 h-0.5 bg-forest-light shrink-0" />{t('services.eyebrow')}
        </div>
        <h2 className="text-[clamp(28px,3.5vw,48px)] font-extrabold leading-[1.05] tracking-tight text-forest mb-10 reveal from-bottom" style={{ transitionDelay: '.1s' }}>
          {t('services.title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border reveal-stagger">
          {services.map((s, i) => (
            <div key={i} className="bg-white p-8 md:p-9 hover:bg-sky transition-colors cursor-default">
              <div className="text-[11px] font-bold text-forest-pale tracking-widest mb-4 font-mono">0{i + 1}</div>
              <div className="text-[26px] mb-3.5">{s.icon}</div>
              <div className="text-[15px] font-bold text-forest mb-2.5 leading-tight">{t(`services.${s.key}_title`)}</div>
              <div className="text-[13px] text-text-dim leading-relaxed">{t(`services.${s.key}_desc`)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ FOREST DECO ═══ */}
      <div className="h-1.5 opacity-15" style={{ background: 'repeating-linear-gradient(90deg, var(--color-forest) 0px, var(--color-forest) 16px, var(--color-forest-light) 16px, var(--color-forest-light) 32px)' }} />

      {/* ═══ FLEET / AIRCRAFT ═══ */}
      <section className="bg-forest px-8 md:px-14 py-16 md:py-24 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -right-32 -top-32 w-[500px] h-[500px] rounded-full border border-white/[0.04] pointer-events-none" />
        <div className="absolute -left-20 bottom-10 w-[300px] h-[300px] rounded-full border border-white/[0.03] pointer-events-none" />

        <div className="relative z-[1]">
          <div className="text-[11px] tracking-[0.18em] uppercase font-bold text-amber mb-4 flex items-center gap-3 reveal from-bottom">
            <span className="w-7 h-0.5 bg-amber shrink-0" />{t('homeFleet.eyebrow')}
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <h2 className="text-[clamp(28px,3.5vw,48px)] font-extrabold leading-[1.05] tracking-tight text-white reveal from-bottom max-w-[420px]" style={{ transitionDelay: '.1s', textWrap: 'balance' as never }}>
              {t('homeFleet.title')}
            </h2>
            <Link href="/equipment" className="inline-flex items-center gap-1.5 no-underline text-[13px] font-bold text-white/60 hover:text-white hover:gap-3 transition-all reveal from-right">
              {t('homeFleet.more')} →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 reveal-stagger">
            {[
              { name: 'Ан-2', country: { ru: 'СССР', kz: 'КСРО', en: 'USSR' }, type: { ru: 'Самолёт', kz: 'Ұшақ', en: 'Airplane' }, desc: { ru: 'Лёгкий многоцелевой самолёт-биплан для авиапатрулирования и доставки парашютистов-пожарных.', kz: 'Авиапатрульдеу мен парашютист-өрт сөндірушілерді жеткізуге арналған жеңіл көпмақсатты биплан ұшақ.', en: 'Light multipurpose biplane for aerial patrol and delivery of smokejumpers.' }, icon: '✈️' },
              { name: 'PA-68 «Partenavia»', country: { ru: 'Италия', kz: 'Италия', en: 'Italy' }, type: { ru: 'Самолёт', kz: 'Ұшақ', en: 'Airplane' }, desc: { ru: 'Лёгкий двухмоторный самолёт для авиационного наблюдения и патрулирования лесов.', kz: 'Авиациялық бақылау мен орманды патрульдеуге арналған жеңіл екі қозғалтқышты ұшақ.', en: 'Light twin-engine aircraft for aerial observation and forest patrol.' }, icon: '✈️' },
              { name: 'Ми-8', country: { ru: 'Россия', kz: 'Ресей', en: 'Russia' }, type: { ru: 'Вертолёт', kz: 'Тікұшақ', en: 'Helicopter' }, desc: { ru: 'Многоцелевой средний вертолёт. Основная рабочая машина для тушения пожаров и доставки десанта.', kz: 'Көпмақсатты орта тікұшақ. Өрт сөндіру мен десант жеткізудің негізгі көлігі.', en: 'Multipurpose medium helicopter. The main workhorse for firefighting and crew delivery.' }, icon: '🚁' },
              { name: 'Ми-2', country: { ru: 'Россия / Польша', kz: 'Ресей / Польша', en: 'Russia / Poland' }, type: { ru: 'Вертолёт', kz: 'Тікұшақ', en: 'Helicopter' }, desc: { ru: 'Лёгкий многоцелевой вертолёт для патрулирования и разведки лесных массивов.', kz: 'Орман алқаптарын патрульдеу мен барлауға арналған жеңіл көпмақсатты тікұшақ.', en: 'Light multipurpose helicopter for patrol and reconnaissance of forests.' }, icon: '🚁' },
              { name: 'EC-130', country: { ru: 'Франция', kz: 'Франция', en: 'France' }, type: { ru: 'Вертолёт', kz: 'Тікұшақ', en: 'Helicopter' }, desc: { ru: 'Лёгкий вертолёт Airbus для наблюдения и мониторинга пожарной обстановки.', kz: 'Өрт жағдайын бақылау мен мониторингке арналған жеңіл Airbus тікұшағы.', en: 'Light Airbus helicopter for observation and fire monitoring.' }, icon: '🚁' },
              { name: 'EC-145', country: { ru: 'Франция / Германия', kz: 'Франция / Германия', en: 'France / Germany' }, type: { ru: 'Вертолёт', kz: 'Тікұшақ', en: 'Helicopter' }, desc: { ru: 'Двухдвигательный вертолёт для доставки десанта и решения оперативных задач.', kz: 'Десант жеткізу мен жедел міндеттерді шешуге арналған екі қозғалтқышты тікұшақ.', en: 'Twin-engine helicopter for crew delivery and operational tasks.' }, icon: '🚁' },
              { name: 'AS-350', country: { ru: 'Франция', kz: 'Франция', en: 'France' }, type: { ru: 'Вертолёт', kz: 'Тікұшақ', en: 'Helicopter' }, desc: { ru: 'Лёгкий вертолёт Écureuil с высокой манёвренностью для патрулирования.', kz: 'Патрульдеуге арналған жоғары маневрлі жеңіл Écureuil тікұшағы.', en: 'Light, highly maneuverable Écureuil helicopter for patrol.' }, icon: '🚁' },
              { name: 'BO-105', country: { ru: 'Германия', kz: 'Германия', en: 'Germany' }, type: { ru: 'Вертолёт', kz: 'Тікұшақ', en: 'Helicopter' }, desc: { ru: 'Лёгкий многоцелевой вертолёт с высокой манёвренностью для сложного рельефа.', kz: 'Күрделі жер бедеріне арналған жоғары маневрлі жеңіл көпмақсатты тікұшақ.', en: 'Light, highly maneuverable multipurpose helicopter for complex terrain.' }, icon: '🚁' },
            ].map((aircraft, i) => (
              <div key={i} className="bg-white/[0.07] backdrop-blur-sm border border-white/[0.08] p-6 hover:bg-white/[0.12] hover:-translate-y-1 transition-all group cursor-default rounded-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[28px] group-hover:scale-110 transition-transform">{aircraft.icon}</span>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-amber/70 bg-amber/10 px-2 py-0.5 rounded-sm">{tr(aircraft.type, locale)}</span>
                </div>
                <div className="text-[20px] font-extrabold text-white tracking-tight mb-1">{aircraft.name}</div>
                <div className="text-[11px] text-white/40 font-semibold tracking-wide mb-3">{tr(aircraft.country, locale)}</div>
                <div className="text-[12.5px] text-white/50 leading-relaxed">{tr(aircraft.desc, locale)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BRANCHES / АВИАОТДЕЛЕНИЯ ═══ */}
      <section className="bg-sky px-8 md:px-14 py-16 md:py-24">
        <div className="text-[11px] tracking-[0.18em] uppercase font-bold text-forest-light mb-4 flex items-center gap-3 reveal from-bottom">
          <span className="w-7 h-0.5 bg-forest-light shrink-0" />{t('homeGeo.eyebrow')}
        </div>
        <h2 className="text-[clamp(28px,3.5vw,48px)] font-extrabold leading-[1.05] tracking-tight text-forest mb-4 reveal from-bottom max-w-[520px]" style={{ transitionDelay: '.1s', textWrap: 'balance' as never }}>
          {t('homeGeo.title', { count: siteStats.branchesCount })}
        </h2>
        <p className="text-[15px] text-text-mid leading-[1.8] mb-12 max-w-[620px] reveal from-bottom" style={{ transitionDelay: '.2s' }}>
          {t('homeGeo.desc')}
        </p>

        <BranchesMap />

        <Link href="/branches" className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 text-[12.5px] font-bold tracking-wider uppercase no-underline bg-forest text-white rounded-sm hover:bg-forest-mid hover:-translate-y-0.5 transition-all">
          {t('homeGeo.all')} →
        </Link>
      </section>

      {/* ═══ NEWS ═══ */}
      <section className="px-8 md:px-14 py-16 md:py-20">
        <div className="flex justify-between items-end mb-9">
          <div>
            <div className="text-[11px] tracking-[0.18em] uppercase font-bold text-forest-light mb-4 flex items-center gap-3 reveal from-bottom">
              <span className="w-7 h-0.5 bg-forest-light shrink-0" />{t('newsSection.eyebrow')}
            </div>
            <h2 className="text-[clamp(28px,3.5vw,48px)] font-extrabold leading-[1.05] tracking-tight text-forest reveal from-bottom" style={{ transitionDelay: '.1s' }}>
              {t('newsSection.title')}
            </h2>
          </div>
          <Link href="/news" className="inline-flex items-center gap-1.5 no-underline text-[13px] font-bold text-forest hover:gap-3 transition-all reveal from-right">
            {t('newsSection.allNews')} →
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr] gap-5 reveal-stagger">
          {news.length > 0 ? (
            <>
              {/* Main card */}
              <div className="bg-white border border-border overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all group reveal from-bottom" style={{ transitionDelay: '.2s' }}>
                <div className="overflow-hidden aspect-[16/8] bg-sky flex items-center justify-center">
                  {news[0].imageUrl ? (
                    <Image src={news[0].imageUrl} alt="" width={800} height={400} className="w-full h-full object-cover saturate-[0.85] group-hover:scale-[1.08] group-hover:rotate-1 transition-all duration-700" />
                  ) : (
                    <div className="text-4xl">📰</div>
                  )}
                </div>
                <div className="p-5 md:p-6">
                  <span className="inline-block bg-sky text-forest-light text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 mb-2.5">
                    {catLabel(news[0].category)}
                  </span>
                  <div className="text-[11px] text-text-dim mb-2 font-medium">{new Date(news[0].createdAt).toLocaleDateString()}</div>
                  <div className="text-[18px] font-bold leading-snug text-text">
                    {locale === 'kz' ? news[0].titleKz || news[0].titleRu : locale === 'en' ? news[0].titleEn || news[0].titleRu : news[0].titleRu}
                  </div>
                  <Link href={`/news/${news[0].id}`} className="mt-4 text-[12px] font-bold text-forest-light flex items-center gap-1 no-underline">{t('newsSection.readMore')} →</Link>
                </div>
              </div>

              {/* Side cards */}
              <div className="flex flex-col gap-5">
                {news.slice(1, 3).map((n, i) => (
                  <div key={i} className="bg-white border border-border overflow-hidden hover:shadow-xl hover:-translate-x-1 transition-all group reveal from-right" style={{ transitionDelay: `${0.3 + i * 0.1}s` }}>
                    <div className="overflow-hidden aspect-video bg-sky flex items-center justify-center">
                      {n.imageUrl ? (
                        <Image src={n.imageUrl} alt="" width={400} height={225} className="w-full h-full object-cover saturate-[0.85] group-hover:scale-[1.08] transition-transform duration-700" />
                      ) : (
                        <div className="text-3xl">📰</div>
                      )}
                    </div>
                    <div className="p-5">
                      <span className="inline-block bg-sky text-forest-light text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 mb-2.5">
                        {catLabel(n.category)}
                      </span>
                      <div className="text-[11px] text-text-dim mb-2 font-medium">{new Date(n.createdAt).toLocaleDateString()}</div>
                      <div className="text-[14px] font-bold leading-snug text-text line-clamp-2">
                        {locale === 'kz' ? n.titleKz || n.titleRu : locale === 'en' ? n.titleEn || n.titleRu : n.titleRu}
                      </div>
                      <Link href={`/news/${n.id}`} className="mt-4 text-[12px] font-bold text-forest-light flex items-center gap-1 no-underline">{t('newsSection.readMore')} →</Link>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="col-span-full py-10 text-center text-text-dim">Загрузка новостей...</div>
          )}
        </div>
      </section>

      {/* ═══ CONTACT (form + map) ═══ */}
      <HomeContact />
    </div>
  );
}
