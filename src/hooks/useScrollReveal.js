import { useEffect } from 'react';

export function useScrollReveal(ref, options = {}) {
  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: options.threshold || 0.1,
      rootMargin: options.rootMargin || '0px 0px -50px 0px',
      ...options
    });

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, options]);
}
