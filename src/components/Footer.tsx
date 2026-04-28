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
            <img src="/logo.gif" alt="Казавиалесоохрана" className="w-[46px] h-[46px] shrink-0 object-contain rounded-sm" />
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
