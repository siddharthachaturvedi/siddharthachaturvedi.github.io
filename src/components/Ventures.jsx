function VentureCard({ role, name, description, link, isFeatured = false, isThoughtLeadership = false }) {
  const cardClass = `venture-card ${isFeatured ? 'featured-venture' : ''} ${isThoughtLeadership ? 'thought-leadership' : ''}`;

  const getVentureIcon = (name) => {
    switch (name.toLowerCase()) {
      case 'veriscience.ai':
        return '⚗️';
      case 'samvidhaan.ai':
        return '⚖️';
      case 'unfreeze.org':
        return '🔓';
      case 'stratified advisory':
        return '📋';
      case 'justai.fyi':
        return '📖';
      default:
        return '🚀';
    }
  };

  return (
    <div className={cardClass} data-role={role}>
      <div className="venture-preview">
        <div className="venture-icon-display">
          <span className="venture-display-icon">{getVentureIcon(name)}</span>
        </div>
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
      role: 'Co-Founder',
      name: 'Samvidhaan.AI',
      description: 'Giving solo-practicioners the same AI-powered document intelligence that BigLaw firms use.',
      link: 'https://samvidhaan.ai'
    },
    {
      role: 'Co-Founder',
      name: 'Unfreeze.org',
      description: 'Multi-agentic system of intelligence for people frozen by layoffs.',
      link: 'https://unfreeze.org'
    },
    {
      role: 'Founding Partner',
      name: 'Stratified Advisory',
      description: 'Board-as-a-Service practice to elevate and transform your executive boards.',
      link: 'https://stratcorp.ai'
    },
    {
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
