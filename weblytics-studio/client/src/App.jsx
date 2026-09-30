import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import HomePage from './pages/public/HomePage';
import AboutPage from './pages/public/AboutPage';
import ServicesPage from './pages/public/ServicesPage';
import SolutionsPage from './pages/public/SolutionsPage';
import ProjectsPage from './pages/public/ProjectsPage';
import ContactPage from './pages/public/ContactPage';
import FAQPage from './pages/public/FAQPage';
import NotFoundPage from './pages/public/NotFoundPage';
import LoginPage from './admin/pages/LoginPage';
import AdminDashboard from './admin/pages/AdminDashboard';
import AdminContentPage from './admin/pages/AdminContentPage';
import SettingsPage from './admin/pages/SettingsPage';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div className="app-loading">Loading dashboard...</div>;
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;

  return children;
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="solutions" element={<SolutionsPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="faq" element={<FAQPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route path="/admin/login" element={<LoginPage />} />

      <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
        <Route index element={<AdminDashboard />} />
        <Route path="services" element={<AdminContentPage resource="services" title="Services" />} />
        <Route path="projects" element={<AdminContentPage resource="projects" title="Projects" />} />
        <Route path="solutions" element={<AdminContentPage resource="solutions" title="Solutions" />} />
        <Route path="faqs" element={<AdminContentPage resource="faqs" title="FAQs" />} />
        <Route path="leads" element={<AdminContentPage resource="leads" title="Messages" />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
};

export default App;
