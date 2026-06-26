'use client';

import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          // Toggle on enter/leave so the animation replays both
          // when scrolling down and back up.
          e.target.classList.toggle('visible', e.isIntersecting);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    const observeAll = () => {
      document.querySelectorAll('.reveal, .reveal-stagger').forEach((el) => observer.observe(el));
    };
    observeAll();

    // Контент часто появляется асинхронно (после загрузки из БД).
    // Следим за изменениями DOM и наблюдаем новые .reveal-элементы,
    // иначе они навсегда остаются прозрачными (opacity:0).
    const mo = new MutationObserver(() => observeAll());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mo.disconnect();
    };
  }, []);
}
