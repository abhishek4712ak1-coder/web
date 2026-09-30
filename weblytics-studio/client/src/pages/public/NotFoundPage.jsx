import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="page-shell">
    <section className="section">
      <div className="container narrow-container text-center">
        <h1>404</h1>
        <p>The page you are looking for could not be found.</p>
        <Link to="/" className="button button-primary">Return home</Link>
      </div>
    </section>
  </div>
);

export default NotFoundPage;
