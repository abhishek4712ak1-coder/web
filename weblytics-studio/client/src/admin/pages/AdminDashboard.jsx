import { useEffect, useState } from 'react';
import api from '../../services/api';

const StatCard = ({ label, value, tone }) => (
  <div className={`stat-card ${tone || ''}`}>
    <span>{label}</span>
    <strong>{value}</strong>
  </div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const [leadStats, summary] = await Promise.all([
        api.get('/leads/stats'),
        api.get('/analytics/summary'),
      ]);

      setStats(leadStats.data);
      setAnalytics(summary.data);
    };

    fetchData();
  }, []);

  const monthlyData = analytics?.monthlyLeads || [];
  const maxMonth = Math.max(...monthlyData.map((item) => item.count), 1);

  return (
    <div className="page-shell">
      <div className="stats-grid">
        <StatCard label="Total leads" value={stats.totalLeads || 0} tone="purple" />
        <StatCard label="New leads" value={stats.newLeads || 0} tone="blue" />
        <StatCard label="Total projects" value={stats.totalProjects || 0} tone="green" />
        <StatCard label="Published projects" value={stats.publishedProjects || 0} tone="orange" />
        <StatCard label="Total services" value={stats.totalServices || 0} tone="pink" />
        <StatCard label="Total solutions" value={stats.totalSolutions || 0} tone="indigo" />
      </div>

      <div className="panel-grid two-col">
        <div className="card-panel">
          <h3>Leads over time</h3>
          <div className="bars-chart">
            {monthlyData.map((item) => (
              <div key={item._id} className="bar-column">
                <span className="bar" style={{ height: `${(item.count / maxMonth) * 100}%` }} />
                <small>{item._id.slice(5)}</small>
              </div>
            ))}
          </div>
        </div>

        <div className="card-panel">
          <h3>Leads by service</h3>
          <div className="list-stack">
            {(analytics?.leadsByService || []).map((item) => (
              <div key={item._id} className="row-inline">
                <span>{item._id}</span>
                <strong>{item.count}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="panel-grid two-col">
        <div className="card-panel">
          <h3>Recent leads</h3>
          <div className="list-stack">
            {(stats.recentLeads || []).map((lead) => (
              <div key={lead._id} className="row-inline compact-row">
                <span>{lead.name}</span>
                <small>{lead.status}</small>
              </div>
            ))}
          </div>
        </div>

        <div className="card-panel">
          <h3>Recent projects</h3>
          <div className="list-stack">
            {(stats.recentProjects || []).map((project) => (
              <div key={project._id} className="row-inline compact-row">
                <span>{project.title}</span>
                <small>{project.status}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
