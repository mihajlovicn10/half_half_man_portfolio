import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import PageShell from '../components/layout/PageShell';

const NotFound = () => {
  useSEO({
    title: '404 | Half Half Man',
    description: 'Page not found.',
    noindex: true,
    nofollow: true,
    type: 'website',
    image: 'https://half-half-man.com/images/og-image.jpg',
  });

  return (
    <PageShell>
      <div className="max-w-3xl mx-auto px-6 pt-40 pb-16 text-center">
        <p className="text-primary/80 font-medium">404</p>
        <h1 className="mt-3 text-4xl sm:text-5xl font-bold text-primary">
          Page not found
        </h1>
        <p className="mt-4 text-primary/80">
          The page you’re looking for doesn’t exist (or it was moved).
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary text-tertiary px-5 py-2.5 text-sm font-medium hover:bg-primary/90"
          >
            Go to Home
          </Link>
          <Link
            to="/projects"
            className="inline-flex items-center justify-center rounded-md border border-primary/20 bg-white/60 text-primary px-5 py-2.5 text-sm font-medium hover:bg-white"
          >
            View Projects
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-md border border-primary/20 bg-white/60 text-primary px-5 py-2.5 text-sm font-medium hover:bg-white"
          >
            Contact
          </Link>
        </div>
      </div>
    </PageShell>
  );
};

export default NotFound;

