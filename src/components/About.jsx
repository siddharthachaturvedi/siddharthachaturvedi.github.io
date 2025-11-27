export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="grid grid-asymmetric about-grid">
          <div className="about-left">
            <h2 className="text-headline section-header">Previous Chapter</h2>
            <p className="text-body-lg chapter-org">Microsoft Strategic Missions & Technologies</p>
            <p className="text-body chapter-role">Director of Product Management</p>
          </div>
          <div className="about-right">
            <p className="text-body-lg about-description">
              <span className="content-mobile">Led AI innovation touching millions through federal deployments and healthcare breakthroughs.</span>
              <span className="content-tablet">Former Director at Microsoft Strategic Missions & Technologies, leading responsible AI innovation across government and healthcare.</span>
              <span className="content-desktop">At Microsoft, I led product and innovation strategy for AI systems deployed across federal government and healthcare, directly impacting millions of lives through breakthrough technology.</span>
            </p>
            <div className="current-focus">
              <h3 className="text-title focus-header">Current Focus</h3>
              <p className="text-body focus-text">
                Post-agentic systems for under-represented diseases. Building beyond today's Human-AI augmentation toward tomorrow's research acceleration.
              </p>
            </div>
            <blockquote className="philosophy">
              <p className="text-title quote-text">"Strategy without execution is hallucination. Execution without strategy is chaos."</p>
              <cite className="text-caption quote-source">— Overheard at <span className="insead">INSEAD</span></cite>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
