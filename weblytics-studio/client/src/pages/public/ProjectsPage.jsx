import { useEffect, useState } from 'react';
import api from '../../services/api';
import SectionTitle from '../../components/SectionTitle';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('/projects').then((response) => setProjects(response.data.projects || []));
  }, []);

  return (
    <div className="page-shell">
      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="Projects" title="Concepts, demos, and delivery stories" description="Project examples represent the kinds of digital systems we build across websites, automation, dashboards, and custom software." />
          <div className="card-grid three-col">
            {projects.map((project) => (
              <div key={project._id} className="project-card">
                <span className="status-badge">{project.status}</span>
                <h3>{project.title}</h3>
                <p>{project.shortDescription}</p>
                <div className="meta-row">
                  <small>{project.category}</small>
                  <small>{project.industry}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;
