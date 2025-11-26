import { useState, useEffect } from 'react';

export function useScrollSpy(sectionIds) {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const options = {
      threshold: [0, 0.25, 0.5, 0.75, 1],
      rootMargin: '-80px 0px -50% 0px'
    };

    let mostVisibleSection = null;
    let maxRatio = 0;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          mostVisibleSection = entry.target.id;
        }
      });

      if (mostVisibleSection) {
        setActiveSection(mostVisibleSection);
        maxRatio = 0;
        mostVisibleSection = null;
      }
    }, options);

    sectionIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      let currentSection = 'hero';

      sectionIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            currentSection = id;
          }
        }
      });

      setActiveSection(currentSection);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionIds]);

  return activeSection;
}
