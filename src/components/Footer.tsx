import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');

  return (
    <footer className="bg-forest">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 px-8 md:px-14 py-16">
        {/* Logo Column */}
        <div>
          <div className="flex items-center gap-3.5 mb-5">
            <svg className="w-[46px] h-[46px] shrink-0" viewBox="0 0 46 46" fill="none">
              <rect width="46" height="46" fill="#eef4f0"/>
              <ellipse cx="27" cy="23" rx="9.5" ry="5.2" fill="none" stroke="#1a3a28" strokeWidth="1.7"/>
              <line x1="17.5" y1="23" x2="8" y2="27" stroke="#1a3a28" strokeWidth="1.5"/>
              <line x1="8" y1="24" x2="8" y2="30" stroke="#1a3a28" strokeWidth="1.5"/>
              <line x1="11" y1="18.5" x2="40" y2="18.5" stroke="#1a3a28" strokeWidth="2.1"/>
              <line x1="27" y1="17" x2="27" y2="19.5" stroke="#1a3a28" strokeWidth="1.5"/>
              <line x1="21" y1="28" x2="21" y2="31.5" stroke="#1a3a28" strokeWidth="1.3"/>
              <line x1="33" y1="28" x2="33" y2="31.5" stroke="#1a3a28" strokeWidth="1.3"/>
              <line x1="18" y1="31.5" x2="36" y2="31.5" stroke="#1a3a28" strokeWidth="1.3"/>
              <polygon points="23,38 19,46 27,46" fill="#3d7a55" opacity="0.65"/>
              <polygon points="23,34 17,44 29,44" fill="#2a5a3e" opacity="0.45"/>
            </svg>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-extrabold text-white tracking-wide">КАЗАВИАЛЕСООХРАНА</span>
              <span className="text-[8px] text-white/35 tracking-widest uppercase mt-0.5">РГКП · Казахстан</span>
            </div>
          </div>
          <p className="text-[13px] text-white/45 leading-relaxed">{t('desc')}</p>
        </div>

        {/* Enterprise Links */}
        <div>
          <div className="text-[11px] font-bold tracking-widest uppercase text-white/35 mb-4">{t('enterprise')}</div>
          <ul className="list-none flex flex-col gap-2.5">
            <li><Link href="/about" className="text-white/55 no-underline text-[13px] font-medium hover:text-white/90 transition-colors">{nav('about')}</Link></li>
            <li><Link href="/leadership" className="text-white/55 no-underline text-[13px] font-medium hover:text-white/90 transition-colors">{nav('leadership')}</Link></li>
            <li><Link href="/branches" className="text-white/55 no-underline text-[13px] font-medium hover:text-white/90 transition-colors">{nav('branches')}</Link></li>
            <li><Link href="/equipment" className="text-white/55 no-underline text-[13px] font-medium hover:text-white/90 transition-colors">{nav('equipment')}</Link></li>
            <li><Link href="/vacancies" className="text-white/55 no-underline text-[13px] font-medium hover:text-white/90 transition-colors">{nav('vacancies')}</Link></li>
          </ul>
        </div>

        {/* State Links */}
        <div>
          <div className="text-[11px] font-bold tracking-widest uppercase text-white/35 mb-4">{t('stateCol')}</div>
          <ul className="list-none flex flex-col gap-2.5">
            <li><Link href="/state#symbols" className="text-white/55 no-underline text-[13px] font-medium hover:text-white/90 transition-colors">{t('stateSymbols')}</Link></li>
            <li><Link href="/state#message" className="text-white/55 no-underline text-[13px] font-medium hover:text-white/90 transition-colors">{t('presidentMessage')}</Link></li>
            <li><Link href="/state#docs" className="text-white/55 no-underline text-[13px] font-medium hover:text-white/90 transition-colors">{t('normativeActs')}</Link></li>
            <li><Link href="/about" className="text-white/55 no-underline text-[13px] font-medium hover:text-white/90 transition-colors">{nav('anticorruption')}</Link></li>
          </ul>
        </div>

        {/* Contacts */}
        <div>
          <div className="text-[11px] font-bold tracking-widest uppercase text-white/35 mb-4">{t('contactsCol')}</div>
          <ul className="list-none flex flex-col gap-2.5">
            <li><a href="tel:+77273461371" className="text-white/55 no-underline text-[13px] font-medium hover:text-white/90 transition-colors">+7 (727) 346-13-71</a></li>
            <li><a href="mailto:airbar@list.ru" className="text-white/55 no-underline text-[13px] font-medium hover:text-white/90 transition-colors">airbar@list.ru</a></li>
            <li><Link href="/contacts" className="text-white/55 no-underline text-[13px] font-medium hover:text-white/90 transition-colors">{t('directions')}</Link></li>
          </ul>
        </div>
      </div>
      
      {/* Bottom */}
      <div className="border-t border-white/8 px-8 md:px-14 py-5 flex flex-col md:flex-row justify-between items-center gap-2">
        <div className="text-[12px] text-white/25">{t('copyright')}</div>
        <div className="flex gap-6">
          <Link href="/" className="text-[12px] text-white/25 no-underline hover:text-white/50 transition-colors">{t('sitemap')}</Link>
          <Link href="/about" className="text-[12px] text-white/25 no-underline hover:text-white/50 transition-colors">{nav('anticorruption')}</Link>
        </div>
      </div>
    </footer>
  );
}
