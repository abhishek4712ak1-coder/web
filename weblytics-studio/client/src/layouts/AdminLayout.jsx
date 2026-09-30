import { Outlet, Link, NavLink, useNavigate } from 'react-router-dom';
import { BarChart3, BriefcaseBusiness, FileText, LayoutDashboard, LogOut, MessageSquareText, Package, Settings, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { label: 'Dashboard', to: '/admin', icon: LayoutDashboard },
  { label: 'Services', to: '/admin/services', icon: BriefcaseBusiness },
  { label: 'Projects', to: '/admin/projects', icon: Package },
  { label: 'Solutions', to: '/admin/solutions', icon: FileText },
  { label: 'FAQs', to: '/admin/faqs', icon: MessageSquareText },
  { label: 'Messages', to: '/admin/leads', icon: BarChart3 },
  { label: 'Settings', to: '/admin/settings', icon: Settings },
];

const AdminLayout = () => {
  const { logout, admin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="brand-box">
          <img src="/logo.jpeg" alt="" className="brand-logo admin-brand-logo" />
          <span>Weblytics Admin</span>
        </div>

        <nav className="sidebar-nav">
          {navItems.map(({ label, to, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/admin'}
              className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
            >
              <Icon size={16} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <button className="logout-button" onClick={handleLogout}>
          <LogOut size={16} />
          Logout
        </button>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <div>
            <p className="eyebrow">Studio Dashboard</p>
            <h2>Admin control center</h2>
          </div>
          <div className="topbar-user">
            <span>{admin?.name || 'Admin'}</span>
          </div>
        </header>

        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
