'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import Image from 'next/image';
import { useEffect, useState } from 'react';

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
                src="/hero-forest.png"
                alt="Forest protection"
                fill
                className="object-cover saturate-[0.85] brightness-[0.75]"
                priority
              />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[rgba(26,58,40,0.6)] via-[rgba(26,58,40,0.2)] to-transparent z-[1]" />

          {/* Helicopter scene */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-[2]">
            {/* Primary helicopter — Mi-8 Avialesookhrana livery */}
            <svg
              className="absolute top-[16%]"
              width="240" height="100" viewBox="0 0 260 110" fill="none"
              style={{ animation: 'heli-fly 22s linear infinite', filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.5))' }}
            >
              {/* === TAIL SECTION === */}
              {/* Tail boom — upper blue, lower red */}
              <path d="M68 50 L22 38 C18 37, 16 34, 17 31 L18 29 L60 40 C64 42, 66 46, 68 50Z" fill="#3a6da8" stroke="#2d5a8e" strokeWidth="0.6" />
              <path d="M68 54 L22 42 L22 38 L68 50Z" fill="#d44030" stroke="#b83528" strokeWidth="0.4" />
              {/* White stripe on tail */}
              <path d="M66 48 L24 37 L24 39 L66 50.5Z" fill="#f0f0f0" opacity="0.95" />

              {/* Tail fin — vertical stabilizer */}
              <path d="M20 29 L8 10 L14 12 L22 29Z" fill="#3a6da8" stroke="#2d5a8e" strokeWidth="0.5" />
              {/* Red tip on fin */}
              <path d="M8 10 L11 11 L14 12 L10 10.5Z" fill="#d44030" />
              {/* Horizontal stabilizer */}
              <path d="M16 35 L4 30 L6 26 L20 31Z" fill="#3a6da8" stroke="#2d5a8e" strokeWidth="0.4" />
              <path d="M16 37 L4 32 L4 30 L16 35Z" fill="#d44030" opacity="0.8" />

              {/* Tail rotor */}
              <g style={{ transformOrigin: '11px 18px', animation: 'rotor-tail 0.08s linear infinite' }}>
                <rect x="9" y="6" width="4" height="24" rx="2" fill="rgba(220,230,240,0.7)" />
              </g>

              {/* === FUSELAGE === */}
              {/* Upper fuselage — blue */}
              <path d="M68 44 C68 32, 85 22, 115 22 C145 22, 164 30, 168 38 L168 44 C165 42, 130 38, 90 40 L68 44Z" fill="#3a6da8" stroke="#2d5a8e" strokeWidth="0.8" />

              {/* Lower fuselage — red/orange */}
              <path d="M68 52 C66 56, 68 60, 72 62 L146 62 C152 62, 165 56, 168 50 L168 44 C130 46, 90 48, 68 52Z" fill="#d44030" stroke="#b83528" strokeWidth="0.7" />

              {/* White accent stripe — middle of fuselage */}
              <path d="M68 46 C90 43, 130 41, 168 42 L168 48 C130 46, 90 48, 68 51Z" fill="#f5f5f5" stroke="#e0e0e0" strokeWidth="0.3" />

              {/* АВИАЛЕСООХРАНА text on white stripe */}
              <text x="94" y="48" fill="#2d5a8e" fontSize="4.5" fontWeight="bold" fontFamily="sans-serif" letterSpacing="0.5" opacity="0.7">АВИАЛЕСООХРАНА</text>

              {/* Nose — rounded, characteristic Mi-8 */}
              <path d="M164 38 C170 36, 176 38, 178 42 C180 46, 178 52, 172 56 L168 56 C170 52, 170 44, 168 38 L164 38Z" fill="#3a6da8" stroke="#2d5a8e" strokeWidth="0.5" />
              <path d="M168 50 C170 52, 172 56, 168 56Z" fill="#d44030" />

              {/* Cockpit windows — large, characteristic Mi-8 greenhouse */}
              <path d="M160 32 C168 32, 176 36, 177 40 C178 44, 174 50, 168 52 L158 52 C156 46, 156 38, 160 32Z" fill="url(#mi8cockpit)" stroke="#4a7ab0" strokeWidth="0.6" opacity="0.9" />
              {/* Window dividers */}
              <line x1="166" y1="34" x2="166" y2="50" stroke="#4a7ab0" strokeWidth="0.5" opacity="0.5" />
              <line x1="172" y1="36" x2="172" y2="48" stroke="#4a7ab0" strokeWidth="0.4" opacity="0.4" />
              {/* Cockpit glare */}
              <path d="M163 35 C167 35, 173 38, 175 41 L168 42 C166 39, 163 37, 163 35Z" fill="rgba(200,230,255,0.4)" />

              {/* Side windows */}
              <rect x="140" y="36" width="8" height="6" rx="1.5" fill="#6aa0d0" opacity="0.5" stroke="#4a7ab0" strokeWidth="0.3" />
              <rect x="128" y="37" width="7" height="5.5" rx="1.5" fill="#6aa0d0" opacity="0.4" stroke="#4a7ab0" strokeWidth="0.3" />
              <rect x="117" y="38" width="7" height="5" rx="1.5" fill="#6aa0d0" opacity="0.35" stroke="#4a7ab0" strokeWidth="0.3" />

              {/* Door line */}
              <line x1="148" y1="32" x2="148" y2="58" stroke="#2d5a8e" strokeWidth="0.5" opacity="0.5" />

              {/* Belly detail */}
              <path d="M80 58 C85 62, 135 64, 155 60" stroke="#a03025" strokeWidth="0.5" fill="none" opacity="0.4" />

              {/* === ENGINE / TOP === */}
              {/* Twin engine nacelles — characteristic Mi-8 */}
              <rect x="100" y="18" width="32" height="8" rx="3.5" fill="#4a80b8" stroke="#3a6da8" strokeWidth="0.5" />
              {/* Engine intakes */}
              <ellipse cx="132" cy="22" rx="3" ry="3.5" fill="#2d5a8e" stroke="#1e4a7e" strokeWidth="0.3" />
              <ellipse cx="100" cy="22" rx="3" ry="3.5" fill="#2d5a8e" stroke="#1e4a7e" strokeWidth="0.3" />
              {/* Exhaust */}
              <ellipse cx="96" cy="22" rx="2" ry="1.5" fill="#3a3a3a" opacity="0.6" />

              {/* Rotor mast */}
              <rect x="114" y="10" width="4" height="10" rx="1" fill="#4a6a8a" />

              {/* Main rotor blades — 5 blades (Mi-8) */}
              <g style={{ transformOrigin: '116px 8px', animation: 'rotor 0.12s linear infinite' }}>
                <ellipse cx="116" cy="8" rx="110" ry="2.5" fill="rgba(200,215,230,0.55)" stroke="rgba(100,140,180,0.25)" strokeWidth="0.3" />
                <ellipse cx="116" cy="8" rx="110" ry="2.5" fill="rgba(200,215,230,0.4)" transform="rotate(72, 116, 8)" />
                <ellipse cx="116" cy="8" rx="110" ry="2.5" fill="rgba(200,215,230,0.3)" transform="rotate(144, 116, 8)" />
              </g>
              {/* Rotor hub */}
              <circle cx="116" cy="8" r="4" fill="#3a5a7a" stroke="#2d4a6a" strokeWidth="0.5" />
              <circle cx="116" cy="8" r="2" fill="#5a7a9a" />

              {/* === LANDING GEAR (wheels) === */}
              {/* Front wheel strut */}
              <line x1="155" y1="60" x2="155" y2="72" stroke="#555" strokeWidth="1.5" />
              <circle cx="155" cy="74" r="3.5" fill="#333" stroke="#555" strokeWidth="0.5" />
              <circle cx="155" cy="74" r="1.5" fill="#666" />

              {/* Rear wheel struts */}
              <line x1="95" y1="60" x2="90" y2="72" stroke="#555" strokeWidth="1.5" />
              <line x1="125" y1="60" x2="130" y2="72" stroke="#555" strokeWidth="1.5" />
              {/* Rear wheels — twin */}
              <ellipse cx="88" cy="74" rx="4" ry="3.5" fill="#333" stroke="#555" strokeWidth="0.5" />
              <ellipse cx="88" cy="74" rx="2" ry="1.5" fill="#666" />
              <ellipse cx="132" cy="74" rx="4" ry="3.5" fill="#333" stroke="#555" strokeWidth="0.5" />
              <ellipse cx="132" cy="74" rx="2" ry="1.5" fill="#666" />

              {/* Registration number on tail */}
              <text x="32" y="36" fill="#f0f0f0" fontSize="4" fontWeight="bold" fontFamily="sans-serif" opacity="0.7">КА-25</text>

              {/* Gradient definitions */}
              <defs>
                <linearGradient id="mi8cockpit" x1="155" y1="30" x2="178" y2="52">
                  <stop offset="0%" stopColor="#8ec0e8" stopOpacity="0.8" />
                  <stop offset="40%" stopColor="#a8d4f0" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#6aa0d0" stopOpacity="0.7" />
                </linearGradient>
              </defs>
            </svg>

            {/* Secondary helicopter — smaller, distant Mi-8 flying opposite */}
            <svg
              className="absolute top-[52%]"
              width="110" height="46" viewBox="0 0 260 110" fill="none"
              style={{ animation: 'heli-fly2 30s linear infinite', opacity: 0.4, filter: 'drop-shadow(0 5px 18px rgba(0,0,0,0.35))' }}
            >
              {/* Tail */}
              <path d="M68 50 L22 38 C18 37, 16 34, 17 31 L18 29 L60 40 C64 42, 66 46, 68 50Z" fill="#3a6da8" />
              <path d="M68 54 L22 42 L22 38 L68 50Z" fill="#d44030" />
              <path d="M66 48 L24 37 L24 39 L66 50.5Z" fill="#f0f0f0" opacity="0.9" />
              <path d="M20 29 L8 10 L14 12 L22 29Z" fill="#3a6da8" />
              <path d="M8 10 L11 11 L14 12 L10 10.5Z" fill="#d44030" />
              <g style={{ transformOrigin: '11px 18px', animation: 'rotor-tail 0.08s linear infinite' }}>
                <rect x="9" y="6" width="4" height="24" rx="2" fill="rgba(200,220,240,0.6)" />
              </g>
              {/* Body */}
              <path d="M68 44 C68 32, 85 22, 115 22 C145 22, 164 30, 168 38 L168 44 C130 42, 90 40, 68 44Z" fill="#3a6da8" />
              <path d="M68 52 C66 56, 68 60, 72 62 L146 62 C152 62, 165 56, 168 50 L168 44 C130 46, 90 48, 68 52Z" fill="#d44030" />
              <path d="M68 46 C90 43, 130 41, 168 42 L168 48 C130 46, 90 48, 68 51Z" fill="#f5f5f5" />
              {/* Nose & cockpit */}
              <path d="M164 38 C170 36, 176 38, 178 42 C180 46, 178 52, 172 56 L168 56 C170 52, 170 44, 168 38Z" fill="#3a6da8" />
              <path d="M160 32 C168 32, 176 36, 177 40 C178 44, 174 50, 168 52 L158 52 C156 46, 156 38, 160 32Z" fill="#8ec0e8" opacity="0.6" />
              {/* Engine */}
              <rect x="100" y="18" width="32" height="8" rx="3.5" fill="#4a80b8" />
              <rect x="114" y="10" width="4" height="10" rx="1" fill="#4a6a8a" />
              {/* Rotor */}
              <g style={{ transformOrigin: '116px 8px', animation: 'rotor 0.12s linear infinite' }}>
                <ellipse cx="116" cy="8" rx="110" ry="2.5" fill="rgba(200,215,230,0.45)" />
                <ellipse cx="116" cy="8" rx="110" ry="2.5" fill="rgba(200,215,230,0.3)" transform="rotate(72, 116, 8)" />
              </g>
              <circle cx="116" cy="8" r="3.5" fill="#3a5a7a" />
              {/* Wheels */}
              <circle cx="155" cy="74" r="3" fill="#333" />
              <ellipse cx="90" cy="74" rx="3.5" ry="3" fill="#333" />
              <ellipse cx="130" cy="74" rx="3.5" ry="3" fill="#333" />
            </svg>
          </div>

          {/* Badge */}
          <div className="absolute bottom-10 right-10 z-[3] bg-white/95 backdrop-blur-sm p-5 shadow-[0_8px_48px_rgba(0,0,0,0.2)] rounded-sm" style={{ animation: 'badge-float 4s ease-in-out infinite' }}>
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

      {/* ═══ FLEET / AIRCRAFT ═══ */}
      <section className="bg-forest px-8 md:px-14 py-16 md:py-24 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -right-32 -top-32 w-[500px] h-[500px] rounded-full border border-white/[0.04] pointer-events-none" />
        <div className="absolute -left-20 bottom-10 w-[300px] h-[300px] rounded-full border border-white/[0.03] pointer-events-none" />

        <div className="relative z-[1]">
          <div className="text-[11px] tracking-[0.18em] uppercase font-bold text-amber mb-4 flex items-center gap-3 reveal from-bottom">
            <span className="w-7 h-0.5 bg-amber shrink-0" />Авиационный парк
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <h2 className="text-[clamp(28px,3.5vw,48px)] font-extrabold leading-[1.05] tracking-tight text-white reveal from-bottom" style={{ transitionDelay: '.1s', textWrap: 'balance' as never }}>
              Наш парк<br />воздушных судов
            </h2>
            <Link href="/equipment" className="inline-flex items-center gap-1.5 no-underline text-[13px] font-bold text-white/60 hover:text-white hover:gap-3 transition-all reveal from-right">
              Подробнее о технике →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 reveal-stagger">
            {[
              { name: 'Ми-8', country: 'Россия', type: 'Транспортный', desc: 'Многоцелевой средний вертолёт. Основная рабочая машина для тушения пожаров и доставки десанта.', icon: '🚁' },
              { name: 'Ми-171', country: 'Россия', type: 'Транспортный', desc: 'Модернизированная версия Ми-8. Повышенная грузоподъёмность и дальность полёта.', icon: '🚁' },
              { name: 'Ми-2', country: 'Россия', type: 'Лёгкий', desc: 'Лёгкий многоцелевой вертолёт для патрулирования и разведки лесных массивов.', icon: '🚁' },
              { name: 'Bell 206', country: 'США', type: 'Лёгкий', desc: 'Лёгкий вертолёт для оперативного авиапатрулирования лесных территорий.', icon: '🚁' },
              { name: 'MD-600', country: 'США', type: 'Лёгкий', desc: 'Однодвигательный вертолёт с системой NOTAR для тихого патрулирования.', icon: '🚁' },
              { name: 'EC-120B', country: 'Франция', type: 'Лёгкий', desc: 'Лёгкий вертолёт Eurocopter для наблюдения и мониторинга пожарной обстановки.', icon: '🚁' },
              { name: 'BO-105', country: 'Германия', type: 'Лёгкий', desc: 'Лёгкий многоцелевой вертолёт с высокой манёвренностью для сложного рельефа.', icon: '🚁' },
            ].map((aircraft, i) => (
              <div key={i} className="bg-white/[0.07] backdrop-blur-sm border border-white/[0.08] p-6 hover:bg-white/[0.12] hover:-translate-y-1 transition-all group cursor-default rounded-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[28px] group-hover:scale-110 transition-transform">{aircraft.icon}</span>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-amber/70 bg-amber/10 px-2 py-0.5 rounded-sm">{aircraft.type}</span>
                </div>
                <div className="text-[20px] font-extrabold text-white tracking-tight mb-1">{aircraft.name}</div>
                <div className="text-[11px] text-white/40 font-semibold tracking-wide mb-3">{aircraft.country}</div>
                <div className="text-[12.5px] text-white/50 leading-relaxed">{aircraft.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BRANCHES / АВИАОТДЕЛЕНИЯ ═══ */}
      <section className="bg-sky px-8 md:px-14 py-16 md:py-24">
        <div className="text-[11px] tracking-[0.18em] uppercase font-bold text-forest-light mb-4 flex items-center gap-3 reveal from-bottom">
          <span className="w-7 h-0.5 bg-forest-light shrink-0" />География присутствия
        </div>
        <h2 className="text-[clamp(28px,3.5vw,48px)] font-extrabold leading-[1.05] tracking-tight text-forest mb-4 reveal from-bottom" style={{ transitionDelay: '.1s', textWrap: 'balance' as never }}>
          14 авиаотделений<br />по всему Казахстану
        </h2>
        <p className="text-[15px] text-text-mid leading-[1.8] mb-12 max-w-[620px] reveal from-bottom" style={{ transitionDelay: '.2s' }}>
          От Костаная на севере до Алматы на юге — наши подразделения обеспечивают охрану лесных массивов на всей территории республики
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10">
          {/* Map */}
          <div className="bg-white border border-border p-6 md:p-8 relative min-h-[380px] reveal from-left rounded-sm">
            <svg viewBox="0 0 800 380" className="w-full h-full" fill="none">
              {/* Kazakhstan outline — simplified */}
              <path d="M60 180 Q80 120 140 110 Q200 80 280 100 Q340 70 420 90 Q500 60 560 80 Q640 60 700 100 Q750 120 740 160 Q760 200 740 240 Q720 290 660 280 Q600 310 520 290 Q460 320 400 300 Q340 330 280 300 Q200 320 140 280 Q80 260 60 180Z" fill="#d4e8dc" stroke="#3d7a55" strokeWidth="1.2" opacity="0.6" />
              {/* Grid lines for realism */}
              <line x1="100" y1="100" x2="100" y2="320" stroke="#3d7a55" strokeWidth="0.15" opacity="0.3" />
              <line x1="200" y1="80" x2="200" y2="320" stroke="#3d7a55" strokeWidth="0.15" opacity="0.3" />
              <line x1="300" y1="70" x2="300" y2="330" stroke="#3d7a55" strokeWidth="0.15" opacity="0.3" />
              <line x1="400" y1="60" x2="400" y2="320" stroke="#3d7a55" strokeWidth="0.15" opacity="0.3" />
              <line x1="500" y1="60" x2="500" y2="310" stroke="#3d7a55" strokeWidth="0.15" opacity="0.3" />
              <line x1="600" y1="60" x2="600" y2="310" stroke="#3d7a55" strokeWidth="0.15" opacity="0.3" />
              <line x1="700" y1="80" x2="700" y2="280" stroke="#3d7a55" strokeWidth="0.15" opacity="0.3" />
              <line x1="60" y1="150" x2="750" y2="150" stroke="#3d7a55" strokeWidth="0.15" opacity="0.3" />
              <line x1="60" y1="200" x2="750" y2="200" stroke="#3d7a55" strokeWidth="0.15" opacity="0.3" />
              <line x1="60" y1="250" x2="740" y2="250" stroke="#3d7a55" strokeWidth="0.15" opacity="0.3" />

              {/* Branch dots */}
              {[
                { name: 'Костанайское', x: 230, y: 115 },
                { name: 'Боровское', x: 350, y: 120 },
                { name: 'Кокшетауское', x: 380, y: 138 },
                { name: 'Павлодарское', x: 470, y: 130 },
                { name: 'Баянаульское', x: 450, y: 165 },
                { name: 'Каркаралинское', x: 420, y: 200 },
                { name: 'Семейское', x: 560, y: 170 },
                { name: 'Букебаевское', x: 530, y: 155 },
                { name: 'Бородулихинское', x: 590, y: 150 },
                { name: 'Усть-Каменогорское', x: 640, y: 155 },
                { name: 'Риддерское', x: 660, y: 135 },
                { name: 'Катон-Карагайское', x: 680, y: 175 },
                { name: 'Талдыкорганское', x: 540, y: 265 },
                { name: 'Алматинское', x: 500, y: 280 },
              ].map((branch, i) => (
                <g key={i}>
                  <circle cx={branch.x} cy={branch.y} r="5" fill="#c88c1e" stroke="white" strokeWidth="1.5" style={{ animation: `pin-pulse 3s ease-in-out ${i * 0.2}s infinite` }} />
                  <circle cx={branch.x} cy={branch.y} r="10" fill="none" stroke="#c88c1e" strokeWidth="0.5" opacity="0.3" />
                  <text x={branch.x} y={branch.y - 10} textAnchor="middle" className="text-[7px] font-bold" fill="#1a3a28" opacity="0.8">{branch.name}</text>
                </g>
              ))}
            </svg>
          </div>

          {/* Branch list */}
          <div className="reveal from-right">
            <div className="grid grid-cols-1 gap-1.5">
              {[
                'Алматинское', 'Талдыкорганское', 'Усть-Каменогорское', 'Букебаевское',
                'Бородулихинское', 'Риддерское', 'Каркаралинское', 'Боровское',
                'Кокшетауское', 'Павлодарское', 'Костанайское', 'Катон-Карагайское',
                'Баянаульское', 'Семейское',
              ].map((name, i) => (
                <div key={i} className="flex items-center gap-3 bg-white border border-border px-5 py-3 hover:bg-forest hover:text-white hover:border-forest transition-all group cursor-default rounded-sm">
                  <div className="w-2 h-2 rounded-full bg-amber group-hover:bg-white shrink-0 transition-colors" />
                  <span className="text-[13px] font-semibold text-text group-hover:text-white transition-colors">{name}</span>
                  <span className="text-[11px] text-text-dim group-hover:text-white/50 ml-auto transition-colors">авиаотделение</span>
                </div>
              ))}
            </div>
            <Link href="/branches" className="mt-6 inline-flex items-center gap-2 px-7 py-3.5 text-[12.5px] font-bold tracking-wider uppercase no-underline bg-forest text-white rounded-sm hover:bg-forest-mid hover:-translate-y-0.5 transition-all">
              Все отделения →
            </Link>
          </div>
        </div>
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
