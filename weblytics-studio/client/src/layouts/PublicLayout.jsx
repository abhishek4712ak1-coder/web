import { Link, Outlet } from 'react-router-dom';
import { useState } from 'react';
import { ArrowUpRight, Github, Instagram, Linkedin, Mail, Menu, X, Youtube } from 'lucide-react';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Solutions', to: '/solutions' },
  { label: 'Projects', to: '/projects' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
];

const socialLinks = [
  { label: 'Youtube', href: 'https://www.youtube.com/@team.weblytics', icon: Youtube },
  { label: 'Instagram', href: 'https://www.instagram.com/team.weblytics/', icon: Instagram },
  { label: 'Email', href: 'mailto:team.weblytics@outlook.com ', icon: Mail },
];

const PublicLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="public-shell">
      <header className="site-header">
        <div className="container nav-wrap">
          <Link to="/" className="brand site-brand">
            <img src="/logo.jpeg" alt="" className="brand-logo" />
            <span>Weblytics Studio</span>
          </Link>
          <button
            type="button"
            className="menu-toggle"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="public-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <nav id="public-navigation" className={`main-nav${menuOpen ? ' is-open' : ''}`}>
            {navItems.map((item) => (
              <Link key={item.to} to={item.to} onClick={() => setMenuOpen(false)}>{item.label}</Link>
            ))}
          </nav>
          <Link to="/contact" className="button button-primary header-cta" onClick={() => setMenuOpen(false)}>Start Your Project</Link>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div className="footer-grid">
            <div className="footer-brand-column">
              <Link to="/" className="brand footer-brand">
                <img src="/logo.jpeg" alt="" className="brand-logo" />
                <span>Weblytics Studio</span>
              </Link>
              <p>Build digital. Automate smarter. Grow with clarity.</p>
              <Link to="/contact" className="footer-contact-link">Start a conversation <ArrowUpRight size={16} /></Link>
            </div>
            <div className="footer-column">
              <h4>Explore</h4>
              <ul>
                <li><Link to="/about">About us</Link></li>
                <li><Link to="/projects">Selected work</Link></li>
                <li><Link to="/faq">FAQs</Link></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>What we do</h4>
              <ul>
                <li><Link to="/services">Services</Link></li>
                <li><Link to="/solutions">Solutions</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>
            <div className="footer-social-column">
              <h4>Find us around</h4>
              <p>Follow the work and ideas shaping what comes next.</p>
              <div className="footer-socials" aria-label="Social media">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} title={label}>
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Weblytics Studio</span>
            <span>Thoughtful technology. Measurable progress.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
