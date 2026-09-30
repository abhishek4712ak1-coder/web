import { useEffect, useState } from 'react';
import api from '../../services/api';
import SectionTitle from '../../components/SectionTitle';

const SolutionsPage = () => {
  const [solutions, setSolutions] = useState([]);

  useEffect(() => {
    api.get('/solutions').then((response) => setSolutions(response.data.solutions || []));
  }, []);

  return (
    <div className="page-shell">
      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="Solutions" title="Industry-ready digital systems" description="Each solution is tailored to the structure, goals, and process realities of a specific business environment." />
          <div className="card-grid three-col">
            {solutions.map((solution) => (
              <div key={solution._id} className="service-card">
                <span className="service-pill">{solution.industry}</span>
                <h3>{solution.title}</h3>
                <p>{solution.description}</p>
                <ul>
                  {(solution.benefits || []).map((benefit) => (
                    <li key={benefit}>{benefit}</li>
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

export default SolutionsPage;
