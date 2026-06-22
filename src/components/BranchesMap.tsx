'use client';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { branches, tr } from '@/lib/branches';

/* eslint-disable @typescript-eslint/no-explicit-any */
export function BranchesMap() {
  const locale = useLocale();
  const t = useTranslations('branchesMap');
  const [selectedId, setSelectedId] = useState('almaty');
  const selected = branches.find((b) => b.id === selectedId)!;

  const mapElRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<Record<string, { m: any; icon: (a: boolean) => any }>>({});
  const localeRef = useRef(locale);
  localeRef.current = locale;

  // Init map once
  useEffect(() => {
    let map: any;
    let cancelled = false;
    import('leaflet').then((mod: any) => {
      const L = mod.default ?? mod;
      if (cancelled || !mapElRef.current || (mapElRef.current as any)._leaflet_id) return;
      map = L.map(mapElRef.current, { scrollWheelZoom: false }).setView([48.4, 67.5], 5);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; OpenStreetMap',
      }).addTo(map);

      const makeIcon = (active: boolean) =>
        L.divIcon({
          className: 'branch-marker',
          html: `<span class="branch-pin${active ? ' active' : ''}"></span>`,
          iconSize: active ? [24, 24] : [16, 16],
          iconAnchor: active ? [12, 12] : [8, 8],
        });

      branches.forEach((b) => {
        const m = L.marker([b.lat, b.lng], { icon: makeIcon(b.id === selectedId) }).addTo(map);
        m.bindTooltip(tr(b.name, localeRef.current), { direction: 'top', offset: [0, -8] });
        m.on('click', () => setSelectedId(b.id));
        markersRef.current[b.id] = { m, icon: makeIcon };
      });
    });
    return () => {
      cancelled = true;
      if (map) map.remove();
      markersRef.current = {};
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update marker highlight on selection
  useEffect(() => {
    Object.entries(markersRef.current).forEach(([id, obj]) => obj.m.setIcon(obj.icon(id === selectedId)));
  }, [selectedId]);

  // Update tooltips on locale change
  useEffect(() => {
    Object.entries(markersRef.current).forEach(([id, obj]) => {
      const b = branches.find((x) => x.id === id)!;
      obj.m.setTooltipContent(tr(b.name, locale));
    });
  }, [locale]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
      {/* Map */}
      <div className="reveal from-left">
        <div ref={mapElRef} className="w-full h-[420px] md:h-[540px] rounded-sm border border-border z-0" />
        <div className="text-[12px] text-text-dim mt-2 text-center">{t('hint')}</div>
      </div>

      {/* Info panel */}
      <div className="reveal from-right">
        <div className="bg-white border border-border p-7 rounded-sm h-full flex flex-col">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div>
              <div className="text-[22px] font-extrabold text-forest leading-tight">{tr(selected.name, locale)}</div>
              <div className="text-[12px] text-text-dim font-semibold tracking-wide uppercase mt-1">{t('subtitle')}</div>
            </div>
            <span className="w-10 h-10 bg-amber/15 text-amber-dark flex items-center justify-center text-lg shrink-0 rounded-sm">📍</span>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <div className="text-[10px] text-text-dim font-bold tracking-widest uppercase mb-1">{t('address')}</div>
              <div className="text-[13.5px] text-text-mid leading-relaxed">{tr(selected.address, locale)}</div>
            </div>

            {selected.head && (
              <div>
                <div className="text-[10px] text-text-dim font-bold tracking-widest uppercase mb-1">{selected.role ? tr(selected.role, locale) : ''}</div>
                <div className="text-[14px] font-bold text-forest">{selected.head}</div>
              </div>
            )}

            <div className="flex flex-col gap-1.5 border-t border-border pt-4">
              {selected.phones?.map((p, j) => (
                <a key={j} href={`tel:${p.replace(/[^+\d]/g, '')}`} className="flex items-center gap-2 text-[13.5px] font-semibold text-forest no-underline hover:text-amber-dark">
                  <span className="text-text-dim">📞</span>{p}
                </a>
              ))}
              {selected.email && (
                <a href={`mailto:${selected.email}`} className="flex items-center gap-2 text-[13.5px] font-semibold text-forest-light no-underline hover:text-amber-dark break-all">
                  <span className="text-text-dim">✉️</span>{selected.email}
                </a>
              )}
            </div>
          </div>

          {/* quick chips */}
          <div className="mt-5 pt-4 border-t border-border flex flex-wrap gap-1.5">
            {branches.map((b) => (
              <button
                key={b.id}
                onClick={() => setSelectedId(b.id)}
                className={`text-[11px] font-semibold px-2.5 py-1 rounded-sm border cursor-pointer font-sans transition-colors ${
                  b.id === selectedId ? 'bg-forest text-white border-forest' : 'bg-white text-text-mid border-border hover:bg-sky'
                }`}
              >
                {tr(b.name, locale)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
