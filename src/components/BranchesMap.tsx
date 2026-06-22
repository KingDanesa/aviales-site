'use client';
import { useState } from 'react';
import { branches, KZ_MAP } from '@/lib/branches';

export function BranchesMap() {
  const [selectedId, setSelectedId] = useState<string>('almaty');
  const selected = branches.find((b) => b.id === selectedId)!;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
      {/* Map */}
      <div className="bg-white border border-border p-4 md:p-6 rounded-sm reveal from-left">
        <svg viewBox={KZ_MAP.viewBox} className="w-full h-auto" role="img" aria-label="Карта авиаотделений Казахстана">
          <path d={KZ_MAP.path} fill="#d9ece0" stroke="#3d7a55" strokeWidth="1.4" strokeLinejoin="round" />
          {branches.map((b) => {
            const active = b.id === selectedId;
            return (
              <g
                key={b.id}
                onClick={() => setSelectedId(b.id)}
                className="cursor-pointer"
                style={{ transition: 'all .2s' }}
              >
                <title>{b.name} авиаотделение</title>
                {active && (
                  <circle cx={b.cx} cy={b.cy} r="18" fill="none" stroke="#c88c1e" strokeWidth="2" opacity="0.45">
                    <animate attributeName="r" values="12;22;12" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite" />
                  </circle>
                )}
                <circle
                  cx={b.cx}
                  cy={b.cy}
                  r={active ? 11 : 7}
                  fill={active ? '#c88c1e' : '#3d7a55'}
                  stroke="white"
                  strokeWidth="2.5"
                  className="hover:r-[10]"
                />
                {active && (
                  <text x={b.cx} y={b.cy - 18} textAnchor="middle" fontSize="15" fontWeight="700" fill="#1a3a28" stroke="white" strokeWidth="3.5" paintOrder="stroke" style={{ pointerEvents: 'none' }}>
                    {b.name}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
        <div className="text-[12px] text-text-dim mt-2 text-center">Нажмите на точку, чтобы увидеть данные авиаотделения</div>
      </div>

      {/* Info panel */}
      <div className="reveal from-right">
        <div className="bg-white border border-border p-7 rounded-sm h-full flex flex-col">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div>
              <div className="text-[22px] font-extrabold text-forest leading-tight">{selected.name}</div>
              <div className="text-[12px] text-text-dim font-semibold tracking-wide uppercase mt-1">авиационное отделение</div>
            </div>
            <span className="w-10 h-10 bg-amber/15 text-amber-dark flex items-center justify-center text-lg shrink-0 rounded-sm">📍</span>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <div className="text-[10px] text-text-dim font-bold tracking-widest uppercase mb-1">Адрес</div>
              <div className="text-[13.5px] text-text-mid leading-relaxed">{selected.address}</div>
            </div>

            {selected.head && (
              <div>
                <div className="text-[10px] text-text-dim font-bold tracking-widest uppercase mb-1">{selected.role}</div>
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
                {b.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
