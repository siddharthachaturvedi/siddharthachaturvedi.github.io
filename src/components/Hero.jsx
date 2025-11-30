import { useState, useEffect } from 'react';

export default function Hero() {
  const taglines = [
    'Scaling multi-agentic AI to responsible impact.',
    'Building post-agentic systems for scientific discovery.',
    'Evidence-grade AI for underserved disease areas.',
    'Connecting innovation with human-centered outcomes.'
  ];

  const [currentTagline, setCurrentTagline] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline(prev => (prev + 1) % taglines.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero" id="hero">
      <div className="container container-content">
        <div className="hero-content">
          <div className="hero-photo">
            <img src="/sidc.jpeg" alt="Siddhartha Chaturvedi" className="profile-image" />
          </div>
          <h1 className="text-display hero-name">
            <span className="name-first">Siddhartha</span>
            <span className="name-last">Chaturvedi</span>
          </h1>
          <div className="hero-logos">
            <a href="https://devblogs.microsoft.com/azuregov/author/sidc/" target="_blank" rel="noopener noreferrer">
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" className="hero-logo" />
            </a>
            <a href="https://www.insead.edu/bio/siddhartha-chaturvedi-mba15d" target="_blank" rel="noopener noreferrer">
              <img src="https://www.insead.edu/profiles/custom/insead/themes/insead_core/images/logo.png" alt="INSEAD" className="hero-logo" />
            </a>
          </div>
          <div className="hero-tagline-wrapper">
            {taglines.map((tagline, index) => (
              <p
                key={index}
                className={`text-body-lg hero-description tagline ${index === currentTagline ? 'active' : ''}`}
              >
                {tagline}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
