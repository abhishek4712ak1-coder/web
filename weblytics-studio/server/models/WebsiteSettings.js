import mongoose from 'mongoose';

const websiteSettingsSchema = new mongoose.Schema(
  {
    companyName: { type: String, default: 'Weblytics Studio' },
    tagline: { type: String, default: 'Build Digital. Automate Smarter. Grow Faster.' },
    email: { type: String, default: 'hello@weblyticsstudio.com' },
    phone: { type: String, default: '+91 00000 00000' },
    address: { type: String, default: 'India' },
    aboutText: {
      type: String,
      default:
        'Weblytics Studio helps businesses build modern digital systems, automate repetitive work, and turn raw data into growth.',
    },
    logo: { type: String, default: '' },
    favicon: { type: String, default: '' },
    seoTitle: { type: String, default: 'Weblytics Studio | Digital Transformation Company' },
    seoDescription: {
      type: String,
      default:
        'Web development, AI automation, data analytics and digital transformation services for modern businesses.',
    },
    footerText: { type: String, default: '© 2026 Weblytics Studio' },
    socialLinks: {
      type: Object,
      default: {
        linkedin: '',
        instagram: '',
        x: '',
        github: '',
      },
    },
  },
  { timestamps: true }
);

const WebsiteSettings = mongoose.model('WebsiteSettings', websiteSettingsSchema);
export default WebsiteSettings;
