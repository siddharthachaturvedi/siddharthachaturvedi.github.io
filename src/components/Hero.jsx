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
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" className="hero-logo" />
            <img src="https://www.insead.edu/profiles/custom/insead/themes/insead_core/images/logo.png" alt="INSEAD" className="hero-logo" />
            <img src="https://upload.wikimedia.org/wikipedia/en/d/d3/BITS_Pilani-Logo.svg" alt="BITS Pilani" className="hero-logo" />
          </div>
          <p className="text-body-lg hero-description">
            Building the post-agentic web for impact and outcomes.
          </p>
        </div>
      </div>
    </section>
  );
}
