import SectionTitle from '../../components/SectionTitle';

const AboutPage = () => (
  <div className="page-shell">
    <section className="section">
      <div className="container narrow-container">
        <SectionTitle eyebrow="About" title="We build the digital engine behind growth." description="Weblytics Studio is a digital technology company focused on helping businesses move online, automate internal work, and make smarter decisions with data." />
      </div>
    </section>

    <section className="section section-muted">
      <div className="container two-col-copy">
        <div>
          <h3>What we do</h3>
          <p>We design and deliver business websites, web apps, automation systems, analytics dashboards, and custom software for growing organizations. We support teams that need better digital operations, stronger customer experiences, and clearer business visibility.</p>
        </div>
        <div>
          <h3>How we work</h3>
          <p>We start by understanding the business process, identify the bottlenecks, and then build digital systems that are practical, measurable, and scalable. We work across strategy, product direction, engineering, and optimization.</p>
        </div>
      </div>
    </section>
  </div>
);

export default AboutPage;
