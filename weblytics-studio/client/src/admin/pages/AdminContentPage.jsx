import { useEffect, useState } from 'react';
import api from '../../services/api';

const fieldGroups = {
  services: [
    { key: 'title', label: 'Title', type: 'text' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'icon', label: 'Icon', type: 'text' },
    { key: 'features', label: 'Features (comma separated)', type: 'text' },
    { key: 'image', label: 'Image URL', type: 'text' },
    { key: 'order', label: 'Order', type: 'number' },
    { key: 'active', label: 'Active', type: 'checkbox' },
  ],
  projects: [
    { key: 'title', label: 'Title', type: 'text' },
    { key: 'shortDescription', label: 'Short description', type: 'text' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'category', label: 'Category', type: 'text' },
    { key: 'industry', label: 'Industry', type: 'text' },
    { key: 'technologies', label: 'Technologies', type: 'text' },
    { key: 'featuredImage', label: 'Featured image', type: 'text' },
    { key: 'projectUrl', label: 'Project URL', type: 'text' },
    { key: 'githubUrl', label: 'GitHub URL', type: 'text' },
    { key: 'status', label: 'Status', type: 'text' },
    { key: 'featured', label: 'Featured', type: 'checkbox' },
    { key: 'published', label: 'Published', type: 'checkbox' },
  ],
  solutions: [
    { key: 'title', label: 'Title', type: 'text' },
    { key: 'industry', label: 'Industry', type: 'text' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'services', label: 'Services (comma separated)', type: 'text' },
    { key: 'image', label: 'Image URL', type: 'text' },
    { key: 'benefits', label: 'Benefits (comma separated)', type: 'text' },
  ],
  faqs: [
    { key: 'question', label: 'Question', type: 'text' },
    { key: 'answer', label: 'Answer', type: 'textarea' },
    { key: 'category', label: 'Category', type: 'text' },
    { key: 'order', label: 'Order', type: 'number' },
    { key: 'active', label: 'Active', type: 'checkbox' },
  ],
  leads: [
    { key: 'status', label: 'Status', type: 'select', options: ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'In Progress', 'Converted', 'Closed', 'Lost'] },
    { key: 'notes', label: 'Notes', type: 'textarea' },
  ],
};

const defaultForm = {
  services: { title: '', description: '', icon: '', features: '', image: '', order: 0, active: true },
  projects: { title: '', shortDescription: '', description: '', category: '', industry: '', technologies: '', featuredImage: '', projectUrl: '', githubUrl: '', status: 'Demo', featured: false, published: true },
  solutions: { title: '', industry: '', description: '', services: '', image: '', benefits: '' },
  faqs: { question: '', answer: '', category: 'General', order: 0, active: true },
  leads: { status: 'New', notes: '' },
};

const resourceMap = {
  services: { listEndpoint: '/services', writeEndpoint: '/services', singular: 'service' },
  projects: { listEndpoint: '/projects/admin/all', writeEndpoint: '/projects', singular: 'project' },
  solutions: { listEndpoint: '/solutions', writeEndpoint: '/solutions', singular: 'solution' },
  faqs: { listEndpoint: '/faqs', writeEndpoint: '/faqs', singular: 'faq' },
  leads: { listEndpoint: '/leads', writeEndpoint: '/leads', singular: 'lead' },
};

const AdminContentPage = ({ resource, title }) => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(defaultForm[resource] || {});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await api.get(resourceMap[resource].listEndpoint, { withCredentials: true });
      const payload = response.data;
      setItems(payload.services || payload.projects || payload.solutions || payload.faqs || payload.leads || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [resource]);

  const resetForm = () => {
    setForm(defaultForm[resource] || {});
    setEditId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);

    try {
      const payload = resource === 'leads' ? { status: form.status, notes: form.notes } : { ...form };
      if (payload.features) payload.features = payload.features.split(',').map((item) => item.trim()).filter(Boolean);
      if (payload.technologies) payload.technologies = payload.technologies.split(',').map((item) => item.trim()).filter(Boolean);
      if (payload.services) payload.services = payload.services.split(',').map((item) => item.trim()).filter(Boolean);
      if (payload.benefits) payload.benefits = payload.benefits.split(',').map((item) => item.trim()).filter(Boolean);

      if (editId) {
        if (resource === 'leads') {
          await api.patch(`${resourceMap[resource].writeEndpoint}/${editId}`, payload);
        } else {
          await api.put(`${resourceMap[resource].writeEndpoint}/${editId}`, payload);
        }
      } else {
        await api.post(resourceMap[resource].writeEndpoint, payload);
      }

      resetForm();
      fetchItems();
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item) => {
    const nextForm = { ...item };
    if (Array.isArray(item.features)) nextForm.features = item.features.join(', ');
    if (Array.isArray(item.technologies)) nextForm.technologies = item.technologies.join(', ');
    if (Array.isArray(item.services)) nextForm.services = item.services.join(', ');
    if (Array.isArray(item.benefits)) nextForm.benefits = item.benefits.join(', ');
    setForm(nextForm);
    setEditId(item._id);
  };

  const handleDelete = async (itemId) => {
    try {
      await api.delete(`${resourceMap[resource].writeEndpoint}/${itemId}`);
      fetchItems();
    } catch (error) {
      console.error(error);
    }
  };

  const isLeadResource = resource === 'leads';

  return (
    <div className="page-shell admin-resource-page">
      <div className="admin-resource-layout">
        <div className="card-panel admin-form-panel">
          <div className="panel-header">
            <div>
              <span className="mini-label">{isLeadResource ? 'Message management' : 'Editor'}</span>
              <h3>{isLeadResource ? (editId ? 'Update message' : 'Message details') : (editId ? `Edit ${title}` : `Add ${title}`)}</h3>
            </div>
          </div>

          {isLeadResource && !editId ? (
            <p className="muted-text">Select a message from the inbox to update its status or add an internal note.</p>
          ) : (
            <form onSubmit={handleSubmit} className="stack-form">
              {fieldGroups[resource]?.map((field) => (
                <label key={field.key}>
                  <span>{field.label}</span>
                  {field.type === 'textarea' ? (
                    <textarea
                      value={form[field.key] || ''}
                      onChange={(event) => setForm((current) => ({ ...current, [field.key]: event.target.value }))}
                      rows={4}
                    />
                  ) : field.type === 'checkbox' ? (
                    <div className="checkbox-wrap">
                      <input
                        type="checkbox"
                        checked={Boolean(form[field.key])}
                        onChange={(event) => setForm((current) => ({ ...current, [field.key]: event.target.checked }))}
                      />
                      <span>Enable this option</span>
                    </div>
                  ) : field.type === 'select' ? (
                    <select
                      value={form[field.key] || ''}
                      onChange={(event) => setForm((current) => ({ ...current, [field.key]: event.target.value }))}
                    >
                      {field.options.map((option) => <option key={option}>{option}</option>)}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      value={form[field.key] || ''}
                      onChange={(event) => setForm((current) => ({ ...current, [field.key]: event.target.value }))}
                    />
                  )}
                </label>
              ))}

              <div className="button-row action-row">
                <button className="button button-primary" type="submit" disabled={saving}>
                  {saving ? 'Saving...' : editId ? 'Update' : 'Create'}
                </button>
                {editId && (
                  <button type="button" className="button button-secondary" onClick={resetForm}>
                    Cancel
                  </button>
                )}
              </div>
            </form>
          )}
        </div>

        <div className="card-panel resource-table-panel">
          <div className="panel-header between">
            <div>
              <span className="mini-label">Records</span>
              <h3>{title}</h3>
            </div>
            <span className="resource-count">{items.length}</span>
          </div>

          {loading ? (
            <p className="muted-text">Loading...</p>
          ) : isLeadResource ? (
            <div className="message-list">
              {items.length === 0 ? <p className="muted-text">No messages received yet.</p> : items.map((item) => (
                <article className="message-card" key={item._id}>
                  <div className="message-card-header">
                    <div>
                      <h4>{item.name}</h4>
                      <a href={`mailto:${item.email}`}>{item.email}</a>
                    </div>
                    <span className="table-badge">{item.status || 'New'}</span>
                  </div>
                  <div className="message-info-grid">
                    <div><span>Business</span><strong>{item.businessName || 'Not provided'}</strong></div>
                    <div><span>Phone</span><strong>{item.phone || 'Not provided'}</strong></div>
                    <div><span>Service</span><strong>{item.serviceRequired || 'Not provided'}</strong></div>
                    <div><span>Budget</span><strong>{item.budget || 'Not provided'}</strong></div>
                    <div><span>Received</span><strong>{item.createdAt ? new Date(item.createdAt).toLocaleString() : 'Date unavailable'}</strong></div>
                  </div>
                  <div className="message-content">
                    <span>Message</span>
                    <p>{item.projectDescription || 'No message provided.'}</p>
                  </div>
                  {item.notes && <div className="message-notes"><span>Internal note</span><p>{item.notes}</p></div>}
                  <div className="message-actions">
                    <button type="button" className="button button-secondary small" onClick={() => handleEdit(item)}>
                      Edit status / note
                    </button>
                    <button type="button" className="button button-danger small" onClick={() => handleDelete(item._id)}>
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>{isLeadResource ? 'Name' : 'Title'}</th>
                    <th>{isLeadResource ? 'Status' : 'Category'}</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item._id}>
                      <td>{isLeadResource ? item.name : (item.title || item.question || item.name)}</td>
                      <td>
                        <span className="table-badge">
                          {isLeadResource ? (item.status || 'New') : (item.category || item.industry || item.status || 'General')}
                        </span>
                      </td>
                      <td className="action-cell">
                        <button type="button" className="button button-secondary small" onClick={() => handleEdit(item)}>
                          Edit
                        </button>
                        <button type="button" className="button button-danger small" onClick={() => handleDelete(item._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminContentPage;
