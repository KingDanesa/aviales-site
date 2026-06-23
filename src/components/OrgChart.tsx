'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import { ORG, type OrgNode } from '@/lib/structure';
import { tx, totalLabel, OC_UI } from '@/lib/structureI18n';

const ch = ORG.children ?? [];
const GROUP_A = ch.slice(0, 5); // отделы напрямую при директоре
const GROUP_B = ch[5]; // зам (адм-хоз)
const GROUP_C = ch[6]; // лётно-производственная служба
const GROUP_D = ch[7]; // зам (авиационный)

function Box({ n, head }: { n: OrgNode; head?: boolean }) {
  const locale = useLocale();
  return (
    <div className={`box k-${n.k}${head ? ' head' : ''}`}>
      <div className="t">{tx(n.name, locale)}</div>
      {n.sub && <div className="sub">{tx(n.sub, locale)}</div>}
      {n.total && <div className="tot">{totalLabel(n.total, locale)}</div>}
      {n.posts && n.posts.length > 0 && (
        <div className="p">
          {n.posts.map(([role, count], i) => (
            <div className="r" key={i}>
              <span>{tx(role, locale)}</span>
              <b>{count}</b>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function splitCols(arr: OrgNode[], cols: number): OrgNode[][] {
  const per = Math.ceil(arr.length / cols);
  const out: OrgNode[][] = [];
  for (let i = 0; i < arr.length; i += per) out.push(arr.slice(i, i + per));
  return out;
}

function ChildrenArea({ n }: { n: OrgNode }) {
  if (!n.children || n.children.length === 0) return null;
  if (n.gridCols && n.gridCols > 1) {
    return (
      <div className="grid">
        {splitCols(n.children, n.gridCols).map((col, i) => (
          <div className="gcol" key={i}>
            <Vstack arr={col} />
          </div>
        ))}
      </div>
    );
  }
  return <Vstack arr={n.children} />;
}

function Vrow({ n }: { n: OrgNode }) {
  const fan = n.gridCols && n.gridCols > 1 ? ' fan' : '';
  return (
    <div className={`vrow${fan}`}>
      <Box n={n} />
      <ChildrenArea n={n} />
    </div>
  );
}

function Vstack({ arr }: { arr: OrgNode[] }) {
  return (
    <div className="vstack">
      {arr.map((n, i) => (
        <Vrow n={n} key={i} />
      ))}
    </div>
  );
}

type Anchor = { x: number; top: number };
function fanPath(sx: number, sy: number, anchors: Anchor[]): string {
  if (!anchors.length) return '';
  const busY = sy + 20;
  const xs = anchors.map((a) => a.x).concat([sx]);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  let d = `M ${sx} ${sy} V ${busY} M ${minX} ${busY} H ${maxX} `;
  anchors.forEach((a) => {
    d += `M ${a.x} ${busY} V ${a.top} `;
  });
  return d;
}

export function OrgChart() {
  const locale = useLocale();
  const ui = OC_UI[(locale as 'ru' | 'kz' | 'en')] ?? OC_UI.ru;
  const [scale, setScale] = useState(1);
  const scaleRef = useRef(1);
  scaleRef.current = scale;

  const scrollRef = useRef<HTMLDivElement>(null);
  const treeRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const drawLinks = useCallback(() => {
    const tree = treeRef.current;
    const svg = svgRef.current;
    const lp = pathRef.current;
    if (!tree || !svg || !lp) return;
    const tb = tree.getBoundingClientRect();
    const sc = scaleRef.current || 1;
    const R = (el: Element) => {
      const r = el.getBoundingClientRect();
      return { l: (r.left - tb.left) / sc, t: (r.top - tb.top) / sc, w: r.width / sc, b: (r.bottom - tb.top) / sc };
    };
    let d = '';

    const gdBox = tree.querySelector('.gd-row .box');
    if (gdBox) {
      const gd = R(gdBox);
      const branchEls = Array.from(tree.querySelectorAll('.branches > .branch'));
      const bAnchors: Anchor[] = branchEls.map((br) => {
        if (br.classList.contains('nohead')) {
          const v = R(br.querySelector('.vstack')!);
          return { x: v.l + 10, top: v.t };
        }
        const h = R(br.querySelector(':scope > .box')!);
        return { x: h.l + h.w / 2, top: h.t };
      });
      d += fanPath(gd.l + gd.w / 2, gd.b, bAnchors);
    }

    tree.querySelectorAll('.fan').forEach((f) => {
      const box = f.querySelector(':scope > .box');
      if (!box) return;
      const pb = R(box);
      const cols: Anchor[] = Array.from(f.querySelectorAll(':scope > .grid > .gcol')).map((gc) => {
        const v = R(gc.querySelector('.vstack')!);
        return { x: v.l + 10, top: v.t };
      });
      d += fanPath(pb.l + pb.w / 2, pb.b, cols);
    });

    lp.setAttribute('d', d);
    svg.setAttribute('width', String(tree.offsetWidth));
    svg.setAttribute('height', String(tree.offsetHeight));
  }, []);

  const fit = useCallback(() => {
    const tree = treeRef.current;
    const scroll = scrollRef.current;
    if (!tree || !scroll) return;
    const avail = scroll.clientWidth - 52;
    const w = tree.offsetWidth;
    if (w > 0) setScale(Math.min(1, Math.max(0.3, avail / w)));
  }, []);

  useEffect(() => {
    drawLinks();
    const onResize = () => {
      drawLinks();
    };
    window.addEventListener('resize', onResize);
    let ro: ResizeObserver | undefined;
    if (treeRef.current && typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => drawLinks());
      ro.observe(treeRef.current);
    }
    if (typeof document !== 'undefined' && document.fonts?.ready) {
      document.fonts.ready.then(() => {
        drawLinks();
        fit();
      });
    }
    const t1 = setTimeout(drawLinks, 80);
    const t2 = setTimeout(() => {
      drawLinks();
      fit();
    }, 450);
    return () => {
      window.removeEventListener('resize', onResize);
      ro?.disconnect();
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [drawLinks, fit]);

  // redraw after zoom changes
  useEffect(() => {
    drawLinks();
  }, [scale, drawLinks]);

  return (
    <div className="orgchart">
      <div className="oc-scroll" ref={scrollRef}>
        <div className="oc-tree" ref={treeRef} style={{ transform: `scale(${scale})` }}>
          <svg className="links" ref={svgRef}>
            <path ref={pathRef} d="" />
          </svg>
          <div className="gd-row">
            <Box n={ORG} head />
          </div>
          <div className="branches">
            <div className="branch nohead">
              <Vstack arr={GROUP_A} />
            </div>
            <div className="branch">
              <Box n={GROUP_B} head />
              <ChildrenArea n={GROUP_B} />
            </div>
            <div className="branch fan">
              <Box n={GROUP_C} head />
              <ChildrenArea n={GROUP_C} />
            </div>
            <div className="branch">
              <Box n={GROUP_D} head />
              <ChildrenArea n={GROUP_D} />
            </div>
          </div>
        </div>
      </div>

      <div className="oc-legend">
        <span><i style={{ borderColor: 'var(--oc-pine-deep)' }} />{ui.leadership}</span>
        <span><i style={{ borderColor: 'var(--oc-pine)' }} />{ui.deputies}</span>
        <span><i style={{ borderColor: 'var(--oc-slate)' }} />{ui.services}</span>
        <span><i style={{ borderColor: 'var(--oc-amber)' }} />{ui.branches}</span>
        <span><i style={{ borderColor: 'var(--oc-green)' }} />{ui.depts}</span>
      </div>
    </div>
  );
}
