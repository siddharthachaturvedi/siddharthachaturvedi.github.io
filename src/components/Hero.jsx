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
          <p className="text-title hero-role">Founder • Stealth Startup</p>
          <p className="text-body-lg hero-description">
            <span className="content-mobile">Building the post-agentic web for scientific discovery</span>
            <span className="content-tablet">Transforming what-if moments into what's-next realities through next-generation AI systems</span>
            <span className="content-desktop">Building the post-agentic web for scientific discovery. Transforming what-if moments into what's-next realities.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
