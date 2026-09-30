import { useEffect, useState } from 'react';
import api from '../../services/api';
import SectionTitle from '../../components/SectionTitle';

const ServicesPage = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    api.get('/services').then((response) => setServices(response.data.services || []));
  }, []);

  return (
    <div className="page-shell">
      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="Services" title="Digital services for modern business growth" description="From websites and customer portals to analytics, automation, and cloud operations, we support businesses at every stage of digital transformation." />
          <div className="card-grid three-col">
            {services.map((service) => (
              <div key={service._id} className="service-card">
                <span className="service-pill">{service.icon}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul>
                  {(service.features || []).map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
