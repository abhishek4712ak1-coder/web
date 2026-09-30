import { useState } from 'react';
import api from '../../services/api';
import SectionTitle from '../../components/SectionTitle';

const initialForm = {
  name: '',
  businessName: '',
  email: '',
  phone: '',
  serviceRequired: 'Website Development',
  budget: '₹25,000–₹50,000',
  projectDescription: '',
};

const ContactPage = () => {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      await api.post('/leads', form);
      setSubmitted(true);
      setForm(initialForm);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to submit your enquiry.');
    }
  };

  return (
    <div className="page-shell">
      <section className="section">
        <div className="container contact-grid">
          <div>
            <SectionTitle eyebrow="Contact" title="Tell us about your project" description="Share a few details about your business and growth goals, and we’ll respond with the right next step." />
          </div>

          <form onSubmit={handleSubmit} className="stack-form contact-form">
            <label><span>Name</span><input name="name" value={form.name} onChange={handleChange} required /></label>
            <label><span>Business Name</span><input name="businessName" value={form.businessName} onChange={handleChange} /></label>
            <label><span>Email</span><input type="email" name="email" value={form.email} onChange={handleChange} required /></label>
            <label><span>Phone</span><input name="phone" value={form.phone} onChange={handleChange} /></label>
            <label><span>Service Required</span>
              <select name="serviceRequired" value={form.serviceRequired} onChange={handleChange}>
                <option>Website Development</option>
                <option>Web Application</option>
                <option>E-commerce</option>
                <option>AI Automation</option>
                <option>Data Analytics</option>
                <option>Cloud & DevOps</option>
                <option>Digital Marketing</option>
                <option>Custom Software</option>
                <option>Other</option>
              </select>
            </label>
            <label><span>Budget</span>
              <select name="budget" value={form.budget} onChange={handleChange}>
                <option>Under ₹10,000</option>
                <option>₹10,000–₹25,000</option>
                <option>₹25,000–₹50,000</option>
                <option>₹50,000–₹1,00,000</option>
                <option>₹1,00,000+</option>
              </select>
            </label>
            <label className="full-width"><span>Project Description</span><textarea name="projectDescription" rows={5} value={form.projectDescription} onChange={handleChange} required /></label>

            {error && <div className="error-box">{error}</div>}
            {submitted && <div className="success-box">Your enquiry has been received successfully.</div>}

            <button type="submit" className="button button-primary">Submit enquiry</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
