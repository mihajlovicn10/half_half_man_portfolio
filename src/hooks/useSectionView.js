import { useEffect } from 'react';
import { track } from '../utils/events';

export const useSectionView = (sectionId, options = {}) => {
  useEffect(() => {
    if (!sectionId) return undefined;
    if (typeof window === 'undefined') return undefined;

    const el = document.getElementById(sectionId);
    if (!el) return undefined;

    const threshold = typeof options.threshold === 'number' ? options.threshold : 0.5;
    const rootMargin = options.rootMargin || '0px';

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        track('view_section', { section: sectionId }, { oncePerSession: true });
      },
      { root: null, threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [sectionId, options.threshold, options.rootMargin]);
};

