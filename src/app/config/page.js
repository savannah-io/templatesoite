"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

const SITE_ID = 'templatesoite'; 

const defaultConfig = {
  siteTitle: '',
  description: '',
  logo: '',
  address: '',
  phone: '',
  email: '',
  navLinks: [{ label: '', path: '' }],
  footerLinks: [{ label: '', path: '' }],
  socialLinks: { instagram: '', facebook: '', linkedin: '', twitter: '' },
  theme: { primary600: '', primary700: '' },
  schedulingButtonText: '',
  pages: {
    Home: { title: '', heroImage: '', content: '' },
    Services: { title: '', heroImage: '', content: '', services: [{ title: '', description: '' }] },
    Reviews: { title: '', heroImage: '', content: '' },
    Contact: { title: '', heroImage: '', content: '' },
  },
  policies: { privacy: '', terms: '' },
};

export default function ConfigPage() {
  const [config, setConfig] = useState(defaultConfig);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function fetchConfig() {
      setLoading(true);
      setError('');
      const { data, error } = await supabase
        .from('site_configs')
        .select('config') // Changed from 'config_json' to 'config'
        .eq('site_key', SITE_ID)
        .single();

      if (error) {
        if (error.message.includes('no rows in result set')) {
          // Insert default config if no row exists
          const { error: insertError } = await supabase
            .from('site_configs')
            .insert([{ site_key: SITE_ID, config: defaultConfig }]); // Changed 'config_json' to 'config'
          if (insertError) {
            setError('Failed to initialize config: ' + insertError.message);
            setLoading(false);
            return;
          }
          // Re-fetch after inserting
          const { data: retryData, error: retryError } = await supabase
            .from('site_configs')
            .select('config') // Changed from 'config_json' to 'config'
            .eq('site_key', SITE_ID)
            .single();
          if (retryError) {
            setError('Failed to load config after initialization: ' + retryError.message);
            setLoading(false);
            return;
          }
          setConfig({ ...defaultConfig, ...retryData.config }); // Changed 'config_json' to 'config'
        } else {
          setError('Failed to load config: ' + error.message);
        }
        setLoading(false);
        return;
      }
      setConfig({ ...defaultConfig, ...data.config }); // Changed 'config_json' to 'config'
      setLoading(false);
    }
    fetchConfig();
  }, []);

  const handleChange = (field, value) => {
    setConfig((prev) => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (section, field, value) => {
    setConfig((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const handleArrayChange = (section, idx, field, value) => {
    setConfig((prev) => ({
      ...prev,
      [section]: prev[section].map((item, i) =>
        i === idx ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleArrayAdd = (section, template) => {
    setConfig((prev) => ({ ...prev, [section]: [...prev[section], template] }));
  };

  const handleArrayRemove = (section, idx) => {
    setConfig((prev) => ({ ...prev, [section]: prev[section].filter((_, i) => i !== idx) }));
  };

  const handlePageChange = (page, field, value) => {
    setConfig((prev) => ({
      ...prev,
      pages: {
        ...prev.pages,
        [page]: { ...prev.pages[page], [field]: value },
      },
    }));
  };

  const handleServiceChange = (idx, field, value) => {
    setConfig((prev) => ({
      ...prev,
      pages: {
        ...prev.pages,
        Services: {
          ...prev.pages.Services,
          services: prev.pages.Services.services.map((s, i) =>
            i === idx ? { ...s, [field]: value } : s
          ),
        },
      },
    }));
  };

  const handleServiceAdd = () => {
    setConfig((prev) => ({
      ...prev,
      pages: {
        ...prev.pages,
        Services: {
          ...prev.pages.Services,
          services: [...prev.pages.Services.services, { title: '', description: '' }],
        },
      },
    }));
  };

  const handleServiceRemove = (idx) => {
    setConfig((prev) => ({
      ...prev,
      pages: {
        ...prev.pages,
        Services: {
          ...prev.pages.Services,
          services: prev.pages.Services.services.filter((_, i) => i !== idx),
        },
      },
    }));
  };

  const handleSocialLinkChange = (platform, value) => {
    setConfig((prev) => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [platform]: value },
    }));
  };

  const handlePolicyChange = (field, value) => {
    setConfig((prev) => ({
      ...prev,
      policies: { ...prev.policies, [field]: value },
    }));
  };

  const handleThemeChange = (shade, value) => {
    setConfig((prev) => ({
      ...prev,
      theme: { ...prev.theme, [shade]: value },
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess(false);
    const { error } = await supabase
      .from('site_configs')
      .update({ config: config }) // Changed 'config_json' to 'config'
      .eq('site_key', SITE_ID);
    if (error) {
      setError('Failed to save: ' + error.message);
      setSaving(false);
      return;
    }
    setSaving(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Site Configuration</h1>
      <form onSubmit={handleSave} className="space-y-8">
        {/* Site Metadata */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Site Metadata</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="input"
              placeholder="Site Title"
              value={config.siteTitle}
              onChange={e => handleChange('siteTitle', e.target.value)}
            />
            <input
              className="input"
              placeholder="Logo URL"
              value={config.logo}
              onChange={e => handleChange('logo', e.target.value)}
            />
            <textarea
              className="input col-span-2"
              placeholder="Description"
              value={config.description}
              onChange={e => handleChange('description', e.target.value)}
            />
          </div>
        </section>
        {/* Contact Info */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Contact Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              className="input"
              placeholder="Address"
              value={config.address}
              onChange={e => handleChange('address', e.target.value)}
            />
            <input
              className="input"
              placeholder="Phone"
              value={config.phone}
              onChange={e => handleChange('phone', e.target.value)}
            />
            <input
              className="input"
              placeholder="Email"
              value={config.email}
              onChange={e => handleChange('email', e.target.value)}
            />
          </div>
        </section>
        {/* Navigation */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Navigation Links</h2>
          {config.navLinks.map((link, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input
                className="input flex-1"
                placeholder="Label"
                value={link.label}
                onChange={e => handleArrayChange('navLinks', idx, 'label', e.target.value)}
              />
              <input
                className="input flex-1"
                placeholder="Path"
                value={link.path}
                onChange={e => handleArrayChange('navLinks', idx, 'path', e.target.value)}
              />
              <button
                type="button"
                className="btn"
                onClick={() => handleArrayRemove('navLinks', idx)}
              >
                -
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn"
            onClick={() => handleArrayAdd('navLinks', { label: '', path: '' })}
          >
            Add Link
          </button>
        </section>
        {/* Footer Links */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Footer Links</h2>
          {config.footerLinks.map((link, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input
                className="input flex-1"
                placeholder="Label"
                value={link.label}
                onChange={e => handleArrayChange('footerLinks', idx, 'label', e.target.value)}
              />
              <input
                className="input flex-1"
                placeholder="Path"
                value={link.path}
                onChange={e => handleArrayChange('footerLinks', idx, 'path', e.target.value)}
              />
              <button
                type="button"
                className="btn"
                onClick={() => handleArrayRemove('footerLinks', idx)}
              >
                -
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn"
            onClick={() => handleArrayAdd('footerLinks', { label: '', path: '' })}
          >
            Add Link
          </button>
        </section>
        {/* Social Links */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Social Links</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.keys(config.socialLinks).map((platform) => (
              <input
                key={platform}
                className="input"
                placeholder={platform.charAt(0).toUpperCase() + platform.slice(1)}
                value={config.socialLinks[platform]}
                onChange={e => handleSocialLinkChange(platform, e.target.value)}
              />
            ))}
          </div>
        </section>
        {/* Theme */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Theme Colors</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              className="input"
              placeholder="Primary 600"
              value={config.theme.primary600}
              onChange={e => handleThemeChange('primary600', e.target.value)}
            />
            <input
              className="input"
              placeholder="Primary 700"
              value={config.theme.primary700}
              onChange={e => handleThemeChange('primary700', e.target.value)}
            />
          </div>
        </section>
        {/* Scheduling Button */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Scheduling Button</h2>
          <input
            className="input"
            placeholder="Button Text"
            value={config.schedulingButtonText}
            onChange={e => handleChange('schedulingButtonText', e.target.value)}
          />
        </section>
        {/* Static Page Content */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Static Page Content</h2>
          {Object.keys(config.pages).map((page) => (
            <div key={page} className="border rounded p-4 mb-4">
              <h3 className="font-semibold mb-2">{page} Page</h3>
              <input
                className="input mb-2"
                placeholder="Title"
                value={config.pages[page].title}
                onChange={e => handlePageChange(page, 'title', e.target.value)}
              />
              <input
                className="input mb-2"
                placeholder="Hero Image URL"
                value={config.pages[page].heroImage}
                onChange={e => handlePageChange(page, 'heroImage', e.target.value)}
              />
              <textarea
                className="input mb-2"
                placeholder="Content (HTML allowed)"
                value={config.pages[page].content}
                onChange={e => handlePageChange(page, 'content', e.target.value)}
              />
              {page === 'Services' && (
                <div>
                  <h4 className="font-semibold mb-2">Services</h4>
                  {config.pages.Services.services.map((service, idx) => (
                    <div key={idx} className="flex gap-2 mb-2">
                      <input
                        className="input flex-1"
                        placeholder="Service Title"
                        value={service.title}
                        onChange={e => handleServiceChange(idx, 'title', e.target.value)}
                      />
                      <input
                        className="input flex-1"
                        placeholder="Description"
                        value={service.description}
                        onChange={e => handleServiceChange(idx, 'description', e.target.value)}
                      />
                      <button
                        type="button"
                        className="btn"
                        onClick={() => handleServiceRemove(idx)}
                      >
                        -
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn"
                    onClick={handleServiceAdd}
                  >
                    Add Service
                  </button>
                </div>
              )}
            </div>
          ))}
        </section>
        {/* Policies */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Policies</h2>
          <textarea
            className="input mb-2"
            placeholder="Privacy Policy (HTML allowed)"
            value={config.policies.privacy}
            onChange={e => handlePolicyChange('privacy', e.target.value)}
          />
          <textarea
            className="input mb-2"
            placeholder="Terms of Service (HTML allowed)"
            value={config.policies.terms}
            onChange={e => handlePolicyChange('terms', e.target.value)}
          />
        </section>
        <div className="flex gap-4 items-center">
          <button
            type="submit"
            className="btn bg-primary-600 text-white px-6 py-2 rounded hover:bg-primary-700 transition"
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
          {success && <span className="text-green-600">Saved!</span>}
          {error && <span className="text-red-600">{error}</span>}
        </div>
      </form>
    </div>
  );
}
// Tailwind utility classes for inputs/buttons
// Add to your global CSS if not present:
// .input { @apply border rounded px-3 py-2 w-full; }
// .btn { @apply border px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 transition; } 