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

    document.querySelectorAll('.reveal, .reveal-stagger').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}
