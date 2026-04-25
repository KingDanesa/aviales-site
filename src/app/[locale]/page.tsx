'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import Image from 'next/image';
import { useEffect } from 'react';

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

  // Stats counter animation
  useEffect(() => {
    // Fetch recent news
    fetch('/api/news')
      .then(res => res.json())
      .then(data => setNews(data.filter((n: any) => n.published).slice(0, 3)));

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
                src="https://aviales.kz/uploads/posts/2024-10/1728895509_img_20241006_164710.jpg"
                alt="Forest protection"
                fill
                className="object-cover saturate-[0.7] brightness-[0.8]"
                priority
              />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[rgba(26,58,40,0.55)] to-transparent z-[1]" />

          {/* Helicopter scene */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-[2]">
            <svg className="absolute opacity-[0.18] top-[22%] filter drop-shadow-[0_4px_20px_rgba(0,0,0,0.3)]" width="160" height="60" viewBox="0 0 160 60" fill="none" style={{ animation: 'heli-fly 28s linear infinite' }}>
              <ellipse cx="90" cy="36" rx="38" ry="14" fill="#ffffff"/>
              <ellipse cx="78" cy="30" rx="18" ry="12" fill="#d4eaf0" opacity="0.9"/>
              <path d="M 52 36 L 18 44" stroke="#ffffff" strokeWidth="5" strokeLinecap="round"/>
              <path d="M 18 44 L 14 36 L 22 38 Z" fill="#ffffff"/>
              <g style={{ transformOrigin: '90px 8px', animation: 'rotor 0.18s linear infinite' }}>
                <rect x="20" y="21" width="140" height="3" rx="1.5" fill="rgba(255,255,255,0.8)"/>
              </g>
              <rect x="88" y="22" width="4" height="8" fill="#cccccc"/>
              <line x1="72" y1="50" x2="72" y2="58" stroke="#ccc" strokeWidth="2"/>
              <line x1="108" y1="50" x2="108" y2="58" stroke="#ccc" strokeWidth="2"/>
              <line x1="62" y1="58" x2="118" y2="58" stroke="#ccc" strokeWidth="2.5"/>
            </svg>
          </div>

          {/* Badge */}
          <div className="absolute bottom-10 right-10 z-[3] bg-white p-5 shadow-[0_8px_48px_rgba(0,0,0,0.2)]" style={{ animation: 'badge-float 4s ease-in-out infinite' }}>
            <div className="text-[38px] font-extrabold text-forest leading-none tracking-tight">6.5М</div>
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
          { n: '1978', target: '1978', fixed: true, label: t('stats.year'), w: '100' },
          { n: '0', target: '14', label: t('stats.branches'), w: '60' },
          { n: '0', target: '9000', label: t('stats.hours'), w: '88' },
          { n: '6.5М', label: t('stats.hectares'), w: '75' },
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
              src="https://aviales.kz/uploads/posts/2025-03/1740984680_image-01-03-25-06-22-2.jpeg"
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
                    {news[0].category === 'fire' ? t('newsPage.filterFire') : news[0].category === 'training' ? t('newsPage.filterTraining') : news[0].category}
                  </span>
                  <div className="text-[11px] text-text-dim mb-2 font-medium">{new Date(news[0].createdAt).toLocaleDateString()}</div>
                  <div className="text-[18px] font-bold leading-snug text-text">
                    {locale === 'kz' ? news[0].titleKz || news[0].titleRu : locale === 'en' ? news[0].titleEn || news[0].titleRu : news[0].titleRu}
                  </div>
                  <Link href="/news" className="mt-4 text-[12px] font-bold text-forest-light flex items-center gap-1 no-underline">{t('newsSection.readMore')} →</Link>
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
                        {n.category === 'fire' ? t('newsPage.filterFire') : n.category === 'training' ? t('newsPage.filterTraining') : n.category}
                      </span>
                      <div className="text-[11px] text-text-dim mb-2 font-medium">{new Date(n.createdAt).toLocaleDateString()}</div>
                      <div className="text-[14px] font-bold leading-snug text-text line-clamp-2">
                        {locale === 'kz' ? n.titleKz || n.titleRu : locale === 'en' ? n.titleEn || n.titleRu : n.titleRu}
                      </div>
                      <Link href="/news" className="mt-4 text-[12px] font-bold text-forest-light flex items-center gap-1 no-underline">{t('newsSection.readMore')} →</Link>
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

      {/* ═══ CTA ═══ */}
      <div className="bg-forest px-8 md:px-14 py-16 md:py-[72px] flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-[360px] h-[360px] rounded-full border border-white/5" />
        <div className="absolute right-10 -bottom-[120px] w-[240px] h-[240px] rounded-full border border-white/[0.04]" />
        <div className="reveal from-left relative z-[1]">
          <h2 className="text-[clamp(24px,3vw,36px)] font-extrabold text-white tracking-tight mb-2">{t('cta.title')}</h2>
          <p className="text-[14px] text-white/45">{t('cta.subtitle')}</p>
        </div>
        <Link href="/contacts" className="relative z-[1] inline-flex items-center gap-2 px-7 py-3.5 text-[12.5px] font-bold tracking-wider uppercase no-underline bg-transparent text-white/70 border border-white/25 rounded-sm hover:border-white/60 hover:text-white transition-all reveal from-right">
          {t('cta.btn')}
        </Link>
      </div>
    </div>
  );
}
