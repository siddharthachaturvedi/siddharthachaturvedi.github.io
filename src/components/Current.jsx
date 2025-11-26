export default function Current() {
  const investigations = [
    {
      title: 'Post-Agentic AI Systems',
      mobile: 'Next-generation scientific computing platforms.',
      desktop: 'Next-generation scientific computing platforms that transcend current agent limitations.'
    },
    {
      title: 'Scientific Knowledge Graphs',
      mobile: 'Reimagining research connections.',
      desktop: 'Reimagining how research connections are discovered and accelerated.'
    },
    {
      title: 'Public-Private Innovation',
      mobile: 'Healthcare partnerships through responsible AI.',
      desktop: 'Healthcare and government partnerships through responsible AI governance.'
    }
  ];

  const advisoryItems = [
    { role: 'Limited Partner', org: 'rpv (DeepTech VC)' },
    { role: 'Advisor', org: 'Loyal VC' }
  ];

  return (
    <section className="section current-section" id="current">
      <div className="container">
        <div className="grid grid-asymmetric current-grid">
          <div className="current-main">
            <h2 className="text-headline section-header">Current Investigations</h2>
            <div className="investigations-list">
              {investigations.map((item, index) => (
                <div key={index} className="investigation-item">
                  <h3 className="text-title investigation-title">{item.title}</h3>
                  <p className="text-body investigation-description">
                    <span className="content-mobile">{item.mobile}</span>
                    <span className="content-tablet content-desktop">{item.desktop}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="current-side">
            <div className="advisory-section">
              <h3 className="text-title advisory-header">Advisory & Investment</h3>
              <div className="advisory-items">
                {advisoryItems.map((item, index) => (
                  <div key={index} className="advisory-item">
                    <span className="text-overline advisory-role">{item.role}</span>
                    <span className="text-body advisory-org">{item.org}</span>
                  </div>
                ))}
              </div>
              <p className="text-caption availability">Available for strategic engagements.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
