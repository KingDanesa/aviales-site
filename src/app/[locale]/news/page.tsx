'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function NewsPage() {
  const t = useTranslations();
  const locale = useLocale();
  useScrollReveal();
  
  const [newsData, setNewsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/news')
      .then(r => r.json())
      .then(data => {
        // Filter only published
        setNewsData(data.filter((n: any) => n.published));
        setLoading(false);
      });
  }, []);

  // Fallback for empty state
  const featured = newsData.length > 0 ? newsData[0] : null;

  return (
    <>
      {/* Page Header */}
      <div className="bg-forest px-8 md:px-14 py-14 relative overflow-hidden">
        <div className="absolute -right-15 -top-15 w-80 h-80 rounded-full bg-white/[0.03]" />
        <div className="breadcrumb flex items-center gap-2 text-[11px] text-white/40 tracking-widest uppercase font-semibold mb-4">
          <Link href="/" className="text-white/40 no-underline hover:text-white/70 transition-colors">{t('common.home')}</Link>
          <span className="text-white/20">›</span>
          <span>{t('newsPage.title')}</span>
        </div>
        <h1 className="text-[clamp(28px,4vw,52px)] font-extrabold text-white tracking-tight leading-[1.05] max-w-[700px] relative z-[1]">
          {t('newsPage.title')}
        </h1>
        <p className="mt-3 text-[15px] text-white/55 max-w-[560px] leading-relaxed relative z-[1]">
          {t('newsPage.subtitle')}
        </p>
      </div>

      {loading ? (
        <div className="p-20 text-center text-text-dim">{t('common.loading')}</div>
      ) : newsData.length === 0 ? (
        <div className="p-20 text-center text-text-dim">Нет новостей</div>
      ) : (
        <>
          {/* Featured */}
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5 px-8 md:px-14 pb-10 reveal from-bottom">
            {featured && (
              <div className="relative overflow-hidden cursor-pointer group bg-forest">
                {featured.imageUrl && (
                  <Image src={featured.imageUrl} alt="" width={800} height={350} className="w-full aspect-[16/7] object-cover brightness-75 saturate-[0.8] group-hover:scale-[1.03] transition-transform duration-500" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,30,16,0.9)] to-transparent flex flex-col justify-end p-6 md:p-9">
                  <span className="bg-amber text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 self-start mb-3">{t('newsPage.featured')}</span>
                  <div className="text-[22px] font-extrabold text-white leading-tight">
                    {locale === 'kz' ? featured.titleKz || featured.titleRu : locale === 'en' ? featured.titleEn || featured.titleRu : featured.titleRu}
                  </div>
                  <div className="text-[11px] text-white/50 mt-2">{new Date(featured.createdAt).toLocaleDateString()}</div>
                </div>
              </div>
            )}
            <div className="flex flex-col gap-4">
              {newsData.slice(1, 5).map((n, i) => (
                <div key={i} className="grid grid-cols-[90px_1fr] border border-border overflow-hidden cursor-pointer hover:shadow-md transition-shadow h-[90px] bg-white">
                  {n.imageUrl ? (
                    <Image src={n.imageUrl} alt="" width={90} height={90} className="w-[90px] h-[90px] object-cover saturate-[0.8]" />
                  ) : (
                    <div className="w-[90px] h-[90px] bg-sky flex items-center justify-center text-2xl">📰</div>
                  )}
                  <div className="p-2.5 px-3.5 flex flex-col justify-center">
                    <div className="text-[10px] text-text-dim mb-1">{new Date(n.createdAt).toLocaleDateString()}</div>
                    <div className="text-[12.5px] font-bold text-text leading-snug line-clamp-2">
                      {locale === 'kz' ? n.titleKz || n.titleRu : locale === 'en' ? n.titleEn || n.titleRu : n.titleRu}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Articles */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 px-8 md:px-14 py-14">
            <div className="flex flex-col gap-0">
              {newsData.map((n, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-[280px_1fr] border-b border-border overflow-hidden hover:bg-sky transition-colors cursor-pointer reveal from-bottom" style={{ transitionDelay: `${i * 0.08}s` }}>
                  <div className="overflow-hidden aspect-[4/3] bg-sky flex items-center justify-center">
                    {n.imageUrl ? (
                      <Image src={n.imageUrl} alt="" width={280} height={210} className="w-full h-full object-cover saturate-[0.85] hover:scale-[1.04] transition-transform duration-500" />
                    ) : (
                      <div className="text-4xl">📰</div>
                    )}
                  </div>
                  <div className="p-6 md:p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="bg-sky text-forest-light text-[10px] font-bold tracking-widest uppercase px-2.5 py-1">
                        {n.category === 'fire' ? t('newsPage.filterFire') : n.category === 'training' ? t('newsPage.filterTraining') : n.category}
                      </span>
                      <span className="text-[11px] text-text-dim font-medium">{new Date(n.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="text-[17px] font-bold text-text leading-snug mb-3">
                      {locale === 'kz' ? n.titleKz || n.titleRu : locale === 'en' ? n.titleEn || n.titleRu : n.titleRu}
                    </div>
                    <div className="text-[13px] text-text-dim leading-relaxed line-clamp-3">
                      {locale === 'kz' ? n.contentKz || n.contentRu : locale === 'en' ? n.contentEn || n.contentRu : n.contentRu}
                    </div>
                    <div className="mt-4 text-[12px] font-bold text-forest-light flex items-center gap-1">{t('common.readMore')} →</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar */}
            <aside className="flex flex-col gap-8">
              <div className="reveal from-right">
                <div className="text-[11px] font-bold tracking-[0.14em] uppercase text-text-dim mb-4 pb-2.5 border-b-2 border-forest inline-block">{t('newsPage.categories')}</div>
                <div className="flex flex-col gap-1">
                  {[
                    { name: t('newsPage.filterFire'), count: newsData.filter((n:any) => n.category==='fire').length },
                    { name: t('newsPage.filterTraining'), count: newsData.filter((n:any) => n.category==='training').length },
                    { name: t('newsPage.filterRaids'), count: newsData.filter((n:any) => n.category==='raids').length },
                    { name: t('newsPage.filterMeetings'), count: newsData.filter((n:any) => n.category==='meetings').length },
                    { name: t('newsPage.filterAnticorr'), count: newsData.filter((n:any) => n.category==='anticorr').length },
                  ].map((c, i) => (
                    <a key={i} href="#" className="flex justify-between items-center p-2.5 px-3.5 bg-sky text-[13px] font-semibold text-text-mid no-underline hover:bg-forest hover:text-white transition-colors">
                      {c.name}
                      <span className="text-[11px] font-bold opacity-50">{c.count}</span>
                    </a>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </>
      )}
    </>
  );
}
