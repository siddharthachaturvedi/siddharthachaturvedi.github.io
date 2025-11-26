import { useState } from 'react';

export default function Navigation({ activeSection, isDarkTheme, toggleTheme }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'recognition', label: 'Recognition' },
    { id: 'ventures', label: 'Ventures' },
    { id: 'current', label: 'Current' },
    { id: 'connect', label: 'Connect' }
  ];

  const scrollToSection = (sectionId) => {
    const targetSection = document.getElementById(sectionId);
    if (!targetSection) return;

    const sectionHeight = targetSection.offsetHeight;
    const viewportHeight = window.innerHeight;
    const sectionTop = targetSection.offsetTop;

    let scrollPosition;
    if (sectionHeight >= viewportHeight) {
      scrollPosition = sectionTop;
    } else {
      scrollPosition = sectionTop - (viewportHeight - sectionHeight) / 2;
    }

    window.scrollTo({
      top: Math.max(0, scrollPosition),
      behavior: 'smooth'
    });

    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="nav" role="navigation" aria-label="Main navigation">
      <div className="nav-content">
        <div className="nav-links" id="nav-links">
          {sections.map(section => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`nav-link ${activeSection === section.id ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(section.id);
              }}
            >
              {section.label}
            </a>
          ))}
        </div>

        <div className="nav-actions">
          <div className="theme-toggle-wrapper">
            <input
              type="checkbox"
              id="theme-toggle"
              className="theme-toggle-checkbox"
              checked={isDarkTheme}
              onChange={toggleTheme}
            />
            <label htmlFor="theme-toggle" className="theme-toggle">
              <span className="toggle-button"></span>
            </label>
          </div>

          <button
            className={`nav-toggle ${isMobileMenuOpen ? 'active' : ''}`}
            id="nav-toggle"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="nav-toggle-line"></span>
            <span className="nav-toggle-line"></span>
            <span className="nav-toggle-line"></span>
          </button>
        </div>
      </div>

      <div className={`nav-mobile-overlay ${isMobileMenuOpen ? 'active' : ''}`} id="nav-mobile-overlay" onClick={(e) => e.target === e.currentTarget && setIsMobileMenuOpen(false)}>
        <div className="nav-mobile-links">
          {sections.map(section => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="nav-mobile-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(section.id);
              }}
            >
              {section.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
