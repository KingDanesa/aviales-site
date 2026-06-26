'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const CAT_ICON: Record<string, string> = {
  fire: '🔥', training: '🎓', raids: '🚁', meetings: '🤝', events: '📅', anticorr: '🛡️', other: '📰',
};

export default function NewsArticlePage() {
  const t = useTranslations();
  const locale = useLocale();
  const params = useParams();
  const id = params?.id as string;

  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const catLabel = (c: string): string => ({
    fire: t('newsPage.filterFire'),
    training: t('newsPage.filterTraining'),
    raids: t('newsPage.filterRaids'),
    meetings: t('newsPage.filterMeetings'),
    events: t('newsPage.filterEvents'),
    anticorr: t('newsPage.filterAnticorr'),
    other: t('newsPage.filterOther'),
  }[c] || c);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/news/${id}`)
      .then(async (r) => {
        if (!r.ok) { setNotFound(true); return null; }
        return r.json();
      })
      .then((data) => { if (data && data.id) setItem(data); else setNotFound(true); })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  const title = item ? (locale === 'kz' ? item.titleKz || item.titleRu : locale === 'en' ? item.titleEn || item.titleRu : item.titleRu) : '';
  const content = item ? (locale === 'kz' ? item.contentKz || item.contentRu : locale === 'en' ? item.contentEn || item.contentRu : item.contentRu) : '';
  const dateStr = item?.createdAt ? new Date(item.createdAt).toLocaleDateString('ru') : '';

  if (loading) {
    return <div className="p-24 text-center text-text-dim">{t('common.loading')}</div>;
  }

  if (notFound || !item) {
    return (
      <div className="px-8 py-24 text-center">
        <div className="text-6xl opacity-20 mb-4">📰</div>
        <p className="text-text-dim text-[15px] mb-6">Новость не найдена.</p>
        <Link href="/news" className="inline-flex items-center gap-2 px-6 py-3 text-[12.5px] font-bold tracking-wider uppercase bg-forest text-white rounded-sm no-underline hover:bg-forest-mid transition-colors">← {t('newsPage.title')}</Link>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="bg-forest px-8 md:px-14 py-14 relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-white/[0.03]" />
        <div className="flex items-center gap-2 text-[11px] text-white/40 tracking-widest uppercase font-semibold mb-5 relative z-[1] flex-wrap">
          <Link href="/" className="text-white/40 no-underline hover:text-white/70 transition-colors">{t('common.home')}</Link>
          <span className="text-white/20">›</span>
          <Link href="/news" className="text-white/40 no-underline hover:text-white/70 transition-colors">{t('newsPage.title')}</Link>
        </div>
        <div className="flex items-center gap-3 mb-4 relative z-[1]">
          <span className="bg-amber text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-sm inline-flex items-center gap-1">{CAT_ICON[item.category] || '📰'}{catLabel(item.category)}</span>
          <span className="text-[12px] text-white/50">{dateStr}</span>
        </div>
        <h1 className="text-[clamp(24px,3.4vw,42px)] font-extrabold text-white tracking-tight leading-[1.12] max-w-[860px] relative z-[1]">{title}</h1>
      </div>

      {/* Body */}
      <article className="max-w-[820px] mx-auto px-6 md:px-8 py-12">
        {item.imageUrl && (
          <div className="relative w-full aspect-[16/8] rounded-xl overflow-hidden mb-9 bg-sky">
            <Image src={item.imageUrl} alt="" fill sizes="820px" className="object-cover" />
          </div>
        )}
        <div className="text-[16px] text-text-mid leading-[1.85] whitespace-pre-line">{content}</div>

        <div className="mt-12 pt-8 border-t border-border">
          <Link href="/news" className="inline-flex items-center gap-2 px-6 py-3 text-[12.5px] font-bold tracking-wider uppercase bg-forest text-white rounded-sm no-underline hover:bg-forest-mid hover:-translate-y-0.5 transition-all">
            ← {t('newsPage.title')}
          </Link>
        </div>
      </article>
    </>
  );
}
