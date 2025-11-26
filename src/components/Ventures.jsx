import { useEffect, useRef } from 'react';

function VentureCard({ url, role, name, description, link, isFeatured = false, isThoughtLeadership = false }) {
  const imgRef = useRef(null);
  const retryLimit = 2;
  const retryDelay = 2000;

  useEffect(() => {
    const loadScreenshot = () => {
      const width = isFeatured ? 1440 : 1200;
      const height = isFeatured ? 900 : 800;
      const screenshotUrl = `https://image.thum.io/get/width=${width}/height=${height}/${encodeURIComponent(url)}`;

      const img = imgRef.current;
      if (!img) return;

      let retryCount = 0;

      const attemptLoad = () => {
        img.onload = () => {
          setTimeout(() => {
            img.classList.add('loaded');
            const loadingContainer = img.parentElement.querySelector('.venture-preview-loading');
            if (loadingContainer) {
              loadingContainer.style.display = 'none';
            }
          }, 200);
        };

        img.onerror = () => {
          if (retryCount < retryLimit) {
            retryCount++;
            setTimeout(attemptLoad, retryDelay);
          } else {
            img.classList.add('error');
            const loadingContainer = img.parentElement.querySelector('.venture-preview-loading');
            if (loadingContainer) {
              loadingContainer.innerHTML = '<div style="color: var(--text-secondary); font-size: var(--text-sm); text-align: center; padding: var(--space-md); width: 100%;">Preview unavailable</div>';
            }
          }
        };

        img.crossOrigin = 'anonymous';
        img.src = screenshotUrl;
      };

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && !img.src) {
              attemptLoad();
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.05, rootMargin: '150px' }
      );

      const card = img.closest('.venture-card');
      if (card) {
        observer.observe(card);
      }

      return () => observer.disconnect();
    };

    loadScreenshot();
  }, [url, isFeatured]);

  const cardClass = `venture-card ${isFeatured ? 'featured-venture' : ''} ${isThoughtLeadership ? 'thought-leadership' : ''}`;
  const previewClass = `venture-preview ${!isFeatured ? 'compact' : ''}`;

  return (
    <div className={cardClass} data-url={url} data-role={role}>
      <div className={previewClass}>
        <div className="venture-preview-loading">
          <div className="loading-skeleton"></div>
        </div>
        <img ref={imgRef} className="venture-screenshot" src="" alt={`${name} website preview`} loading="lazy" />
      </div>
      <div className="venture-content">
        <div className="text-overline venture-role">{role}</div>
        <h3 className="text-title venture-name">{name}</h3>
        <p className="text-body venture-description">{description}</p>
        <a href={link} target="_blank" rel="noopener noreferrer" className="venture-link">Visit →</a>
      </div>
    </div>
  );
}

export default function Ventures() {
  const ventures = [
    {
      url: 'https://samvidhaan.ai',
      role: 'Co-Founder',
      name: 'Samvidhaan.AI',
      description: 'Giving solo-practicioners the same AI-powered document intelligence that BigLaw firms use.',
      link: 'https://samvidhaan.ai'
    },
    {
      url: 'https://unfreeze.org',
      role: 'Co-Founder',
      name: 'Unfreeze.org',
      description: 'Multi-agentic system of intelligence for people frozen by layoffs.',
      link: 'https://unfreeze.org'
    },
    {
      url: 'https://stratcorp.ai',
      role: 'Founding Partner',
      name: 'Stratified Advisory',
      description: 'Board-as-a-Service practice to elevate and transform your executive boards.',
      link: 'https://stratcorp.ai'
    },
    {
      url: 'https://justai.fyi',
      role: 'Author',
      name: 'JustAI.FYI',
      description: 'Synthesis of Software 3.0 and post-agentic systems.',
      link: 'https://justai.fyi',
      isThoughtLeadership: true
    }
  ];

  return (
    <section className="section ventures-section" id="ventures">
      <div className="container">
        <h2 className="text-headline section-header">Building the Future</h2>

        <div className="ventures-featured">
          <VentureCard
            url="https://veriscience.ai"
            role="Founder"
            name="Veriscience.AI"
            description="Evidence-grade SLM fine tuning for underserved disease areas, starting with Endometriosis."
            link="https://veriscience.ai"
            isFeatured={true}
          />
        </div>

        <div className="ventures-grid">
          {ventures.map((venture, index) => (
            <VentureCard key={index} {...venture} />
          ))}
        </div>
      </div>
    </section>
  );
}
