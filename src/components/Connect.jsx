export default function Connect() {
  const networks = [
    { label: 'LinkedIn', link: 'https://linkedin.com/in/siddharth', text: '/in/siddharth', isButton: false },
    { label: 'Schedule', link: 'https://calendly.com/s-sidc/meet', text: 'Meet', isButton: true },
    { label: 'Resume', link: '/resume.pdf', text: 'Download PDF', isButton: false }
  ];

  return (
    <section className="section connect-section" id="connect">
      <div className="container">
        <div className="connect-content">
          <h2 className="text-headline section-header centered">Let's Talk</h2>

          <div className="networks">
            {networks.map((item, index) => (
              <div key={index} className="network-item">
                <span className="text-overline network-label">{item.label}</span>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-body-lg network-link ${item.isButton ? 'network-button' : ''}`}
                >
                  {item.text}
                </a>
              </div>
            ))}
          </div>

          <div className="availability-section">
            <h3 className="text-title availability-header">Currently Available</h3>
            <p className="text-body-lg availability-items">Strategic Advisory • Keynote Speaking • Board Positions</p>
          </div>

          <div className="location">
            <p className="text-body location-text">
              <span className="content-mobile">US, UK & Asia</span>
              <span className="content-tablet content-desktop">Based between US, UK & Asia<br />Available for global engagements</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
