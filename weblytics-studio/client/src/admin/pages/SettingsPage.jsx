import { useEffect, useState } from 'react';
import api from '../../services/api';

const SettingsPage = () => {
  const [settings, setSettings] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      const response = await api.get('/settings');
      setSettings(response.data.settings);
    };

    fetchSettings();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSettings((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);

    try {
      await api.put('/settings', settings);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="page-shell">
      <div className="card-panel settings-panel">
        <h3>Website settings</h3>
        <form onSubmit={handleSubmit} className="stack-form two-column-form">
          <label><span>Company name</span><input name="companyName" value={settings.companyName || ''} onChange={handleChange} /></label>
          <label><span>Tagline</span><input name="tagline" value={settings.tagline || ''} onChange={handleChange} /></label>
          <label><span>Email</span><input name="email" value={settings.email || ''} onChange={handleChange} /></label>
          <label><span>Phone</span><input name="phone" value={settings.phone || ''} onChange={handleChange} /></label>
          <label><span>Address</span><input name="address" value={settings.address || ''} onChange={handleChange} /></label>
          <label><span>SEO title</span><input name="seoTitle" value={settings.seoTitle || ''} onChange={handleChange} /></label>
          <label className="full-width"><span>About text</span><textarea name="aboutText" value={settings.aboutText || ''} rows={4} onChange={handleChange} /></label>
          <label className="full-width"><span>SEO description</span><textarea name="seoDescription" value={settings.seoDescription || ''} rows={3} onChange={handleChange} /></label>
          <button className="button button-primary" type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save settings'}</button>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
