import { useEffect, useState } from 'react';
import api from '../../services/api';
import SectionTitle from '../../components/SectionTitle';

const FAQPage = () => {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    api.get('/faqs').then((response) => setFaqs(response.data.faqs || []));
  }, []);

  return (
    <div className="page-shell">
      <section className="section">
        <div className="container narrow-container">
          <SectionTitle eyebrow="FAQ" title="Frequently asked questions" description="A quick overview of how we support businesses through digital strategy and implementation." />
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
    </div>
  );
};

export default FAQPage;
