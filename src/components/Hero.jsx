export default function Hero() {
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
          <p className="text-body-lg hero-description">
            Scaling multi-agentic AI to responsible impact.
          </p>
        </div>
      </div>
    </section>
  );
}
