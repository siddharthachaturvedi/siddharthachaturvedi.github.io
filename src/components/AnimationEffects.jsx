import { useEffect } from 'react';

export default function AnimationEffects() {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const root = document.documentElement;
      root.style.setProperty('--mouse-x', `${e.clientX}px`);
      root.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const elementsWithParallax = document.querySelectorAll('[data-parallax]');

      elementsWithParallax.forEach(element => {
        const speed = element.dataset.parallax;
        const offset = scrollY * speed;
        element.style.transform = `translateY(${offset}px)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return null;
}
