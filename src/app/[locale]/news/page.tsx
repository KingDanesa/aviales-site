'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const CAT_ICON: Record<string, string> = {
  fire: '🔥', training: '🎓', raids: '🚁', meetings: '🤝', events: '📅', anticorr: '🛡️', other: '📰',
};

export default function NewsPage() {
  const t = useTranslations();
  const locale = useLocale();
  useScrollReveal();

  const [newsData, setNewsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  const catLabel = (c: string): string => ({
    fire: t('newsPage.filterFire'),
    training: t('newsPage.filterTraining'),
    raids: t('newsPage.filterRaids'),
    meetings: t('newsPage.filterMeetings'),
    events: t('newsPage.filterEvents'),
    anticorr: t('newsPage.filterAnticorr'),
    other: t('newsPage.filterOther'),
  }[c] || c);

  const title = (n: any) => (locale === 'kz' ? n.titleKz || n.titleRu : locale === 'en' ? n.titleEn || n.titleRu : n.titleRu);
  const content = (n: any) => (locale === 'kz' ? n.contentKz || n.contentRu : locale === 'en' ? n.contentEn || n.contentRu : n.contentRu);
  const dateStr = (n: any) => (n.createdAt ? new Date(n.createdAt).toLocaleDateString('ru') : '');

  useEffect(() => {
    fetch('/api/news')
      .then(r => r.json())
      .then(data => {
        const arr = Array.isArray(data) ? data : [];
        setNewsData(arr.filter((n: any) => n.published));
      })
      .catch(() => setNewsData([]))
      .finally(() => setLoading(false));
  }, []);

  // Какие категории реально есть среди новостей
  const presentCats = Array.from(new Set(newsData.map(n => n.category))).filter(Boolean);

  const featured = filter === 'all' && newsData.length > 0 ? newsData[0] : null;
  const gridItems = (filter === 'all' ? newsData.slice(featured ? 1 : 0) : newsData.filter(n => n.category === filter));

  return (
    <>
      {/* Page Header */}
      <div className="bg-forest px-8 md:px-14 py-14 relative overflow-hidden">
        <div className="absolute -right-15 -top-15 w-80 h-80 rounded-full bg-white/[0.03]" />
        <div className="flex items-center gap-2 text-[11px] text-white/40 tracking-widest uppercase font-semibold mb-4">
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
        <div className="px-8 py-24 text-center">
          <div className="text-6xl opacity-20 mb-4">📰</div>
          <p className="text-text-dim text-[15px]">Пока нет опубликованных новостей.</p>
        </div>
      ) : (
        <div className="px-8 md:px-14 py-12">
          {/* Filter chips */}
          {presentCats.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10">
              <button
                onClick={() => setFilter('all')}
                className={`text-[12.5px] font-bold px-4 py-2 rounded-full border cursor-pointer font-sans transition-colors ${filter === 'all' ? 'bg-forest text-white border-forest' : 'bg-white text-text-mid border-border hover:bg-sky'}`}
              >
                {t('newsPage.filterAll')}
              </button>
              {presentCats.map((c) => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`text-[12.5px] font-bold px-4 py-2 rounded-full border cursor-pointer font-sans transition-colors inline-flex items-center gap-1.5 ${filter === c ? 'bg-forest text-white border-forest' : 'bg-white text-text-mid border-border hover:bg-sky'}`}
                >
                  <span>{CAT_ICON[c] || '📰'}</span>{catLabel(c)}
                </button>
              ))}
            </div>
          )}

          {/* Featured (latest) — always has its own background, не схлопывается */}
          {featured && (
            <Link href="/news" className="block no-underline mb-8">
              <div className="relative overflow-hidden rounded-xl min-h-[300px] md:min-h-[380px] flex items-end group bg-gradient-to-br from-forest to-forest-mid shadow-lg">
                {featured.imageUrl && (
                  <Image src={featured.imageUrl} alt="" fill sizes="100vw" className="object-cover brightness-[0.55] saturate-[0.85] group-hover:scale-[1.03] transition-transform duration-700" />
                )}
                {!featured.imageUrl && (
                  <div className="absolute inset-0 flex items-center justify-center text-[120px] opacity-10">{CAT_ICON[featured.category] || '📰'}</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,26,14,0.92)] via-[rgba(8,26,14,0.35)] to-transparent" />
                <div className="relative z-[1] p-7 md:p-10 max-w-3xl">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-amber text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-sm">{t('newsPage.featured')}</span>
                    <span className="bg-white/15 backdrop-blur-sm text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-sm">{catLabel(featured.category)}</span>
                  </div>
                  <div className="text-[clamp(20px,2.6vw,30px)] font-extrabold text-white leading-tight mb-2">{title(featured)}</div>
                  <p className="text-[13.5px] text-white/70 leading-relaxed line-clamp-2 max-w-2xl">{content(featured)}</p>
                  <div className="text-[12px] text-white/50 mt-3">{dateStr(featured)}</div>
                </div>
              </div>
            </Link>
          )}

          {/* Grid of cards */}
          {gridItems.length === 0 ? (
            <div className="py-16 text-center text-text-dim text-[14px]">В этом разделе пока нет новостей.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gridItems.map((n, i) => (
                <Link key={i} href="/news" className="no-underline group">
                  <article className="bg-white border border-border rounded-xl overflow-hidden flex flex-col h-full hover:shadow-xl hover:-translate-y-1 transition-all">
                    <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-forest-pale to-sky flex items-center justify-center">
                      {n.imageUrl ? (
                        <Image src={n.imageUrl} alt="" fill sizes="(max-width:1024px) 100vw, 33vw" className="object-cover saturate-[0.9] group-hover:scale-[1.05] transition-transform duration-500" />
                      ) : (
                        <span className="text-[52px] opacity-30">{CAT_ICON[n.category] || '📰'}</span>
                      )}
                      <span className="absolute top-3 left-3 z-[1] bg-white/90 backdrop-blur-sm text-forest text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-sm inline-flex items-center gap-1">
                        {CAT_ICON[n.category] || '📰'}{catLabel(n.category)}
                      </span>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="text-[11px] text-text-dim font-medium mb-2">{dateStr(n)}</div>
                      <h3 className="text-[16px] font-extrabold text-forest leading-snug mb-2.5 line-clamp-2">{title(n)}</h3>
                      <p className="text-[13px] text-text-dim leading-relaxed line-clamp-3 flex-1">{content(n)}</p>
                      <div className="mt-4 text-[12px] font-bold text-forest-light flex items-center gap-1 group-hover:gap-2 transition-all">{t('common.readMore')} →</div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
