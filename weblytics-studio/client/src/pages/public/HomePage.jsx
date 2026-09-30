import { useEffect, useState } from 'react';
import { ArrowRight, BarChart3, Bot, Cloud, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import SectionTitle from '../../components/SectionTitle';

const HomePage = () => {
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [solutions, setSolutions] = useState([]);
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [servicesResponse, projectsResponse, solutionsResponse, faqsResponse] = await Promise.all([
        api.get('/services'),
        api.get('/projects'),
        api.get('/solutions'),
        api.get('/faqs'),
      ]);

      setServices(servicesResponse.data.services || []);
      setProjects((projectsResponse.data.projects || []).slice(0, 3));
      setSolutions((solutionsResponse.data.solutions || []).slice(0, 3));
      setFaqs((faqsResponse.data.faqs || []).slice(0, 4));
    };

    fetchData();
  }, []);

  return (
    <>
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">Digital transformation company</span>
            <h1>Turn Your Business Into a Digital Business.</h1>
            <p>
              We design, develop, automate, and analyze the technology behind modern businesses.
            </p>
            <div className="button-row">
              <Link className="button button-primary" to="/contact">Start Your Project</Link>
              <Link className="button button-secondary" to="/services">Explore Services</Link>
            </div>
            <div className="hero-metrics">
              <div><strong>Custom</strong><span>software</span></div>
              <div><strong>AI</strong><span>automation</span></div>
              <div><strong>Cloud</strong><span>deployment</span></div>
            </div>
          </div>

          <div className="dashboard-visual">
            <div className="dashboard-card main-card">
              <div className="mini-label">Business health</div>
              <div className="chart-bars">
                <span style={{ height: '30%' }} />
                <span style={{ height: '50%' }} />
                <span style={{ height: '75%' }} />
                <span style={{ height: '60%' }} />
                <span style={{ height: '90%' }} />
                <span style={{ height: '100%' }} />
              </div>
            </div>
            <div className="dashboard-card floating-card small-card">
              <Sparkles size={18} />
              <span>AI Workflow</span>
            </div>
            <div className="dashboard-card floating-card accent-card">
              <BarChart3 size={18} />
              <span>Growth Analytics</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <SectionTitle eyebrow="Why teams choose us" title="Technology built for real business operations" description="From customer experiences to internal automation, Weblytics Studio helps your business grow through better systems and clearer data." />
          <div className="feature-grid three-col">
            <div className="feature-card">
              <Sparkles />
              <h3>Launch faster</h3>
              <p>Modern product strategy and delivery for websites, apps, and operational tools.</p>
            </div>
            <div className="feature-card">
              <BarChart3 />
              <h3>Measure what matters</h3>
              <p>Dashboards that turn raw data into decisions, not just pretty reports.</p>
            </div>
            <div className="feature-card">
              <Bot />
              <h3>Automate consistently</h3>
              <p>Reduce repeat work with CRM, messaging, AI, and reporting automation.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="Core services" title="Business systems that help you scale" description="Everything from digital marketing infrastructure to custom business software." />
          <div className="card-grid three-col">
            {services.map((service) => (
              <div key={service._id} className="service-card">
                <span className="service-pill">{service.icon}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul>
                  {(service.features || []).slice(0, 4).map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <SectionTitle eyebrow="Transformation" title="Optimization across the entire digital journey" description="We connect strategy, design, engineering, automation, and reporting into a single operating model." />
          <div className="feature-grid two-col">
            <div className="text-panel">
              <h3>Build better digital experiences</h3>
              <p>From sales websites and portals to internal platforms, we design systems that customers and teams can trust.</p>
            </div>
            <div className="text-panel">
              <h3>Turn operations into leverage</h3>
              <p>Automations, dashboards, and data workflows help teams move with speed and clarity.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="Industry solutions" title="Built for the way modern businesses work" description="We create digital solutions for service businesses, retail teams, healthcare providers, education brands, and more." />
          <div className="pill-list">
            {['Retail', 'Restaurants', 'Education', 'Healthcare', 'Real Estate', 'Manufacturing', 'Professional Services', 'Agriculture', 'Logistics', 'Custom Business'].map((industry) => (
              <span key={industry} className="chip">{industry}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <SectionTitle eyebrow="Selected work" title="Project ideas and concept direction" description="Demo, concept, and case study style examples designed to represent how we structure digital transformation engagements." />
          <div className="card-grid three-col">
            {projects.map((project) => (
              <div key={project._id} className="project-card">
                <span className="status-badge">{project.status}</span>
                <h3>{project.title}</h3>
                <p>{project.shortDescription}</p>
                <small>{project.industry}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="Business process" title="A structured delivery model" description="We combine strategy, product thinking, engineering, and optimization into a clear path to growth." />
          <div className="steps-grid">
            <div className="step-card"><span>01</span><h3>Discover</h3><p>We assess workflows, goals, gaps, and opportunities.</p></div>
            <div className="step-card"><span>02</span><h3>Design</h3><p>We shape user journeys, process flows, and technical architecture.</p></div>
            <div className="step-card"><span>03</span><h3>Build</h3><p>We develop the product, automation, and reporting layer.</p></div>
            <div className="step-card"><span>04</span><h3>Optimize</h3><p>We monitor adoption, improve conversion, and refine systems over time.</p></div>
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <SectionTitle eyebrow="FAQ" title="Questions teams ask before they begin" description="A few common answers about project fit, scope, and delivery." />
          <div className="faq-list">
            {faqs.map((faq) => (
              <div key={faq._id} className="faq-item">
                <strong>{faq.question}</strong>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="container cta-wrap">
          <div>
            <span className="eyebrow">Let’s build your next system</span>
            <h2>Need a web platform, automation layer, or business dashboard?</h2>
          </div>
          <Link to="/contact" className="button button-primary">Book a discovery call</Link>
        </div>
      </section>
    </>
  );
};

export default HomePage;
