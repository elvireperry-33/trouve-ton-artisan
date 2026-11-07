import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
function NotFound() {
  return (
    <main className="container text-center py-5">
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        role="img"
        aria-label="Loupe avec un point d’interrogation"
        className="text-primary mb-4"
      >
        <circle
          cx="48"
          cy="48"
          r="34"
          fill="none"
          stroke="currentColor"
          strokeWidth="7"
        />
        <path
          d="M73 73 L108 108"
          stroke="currentColor"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <text
          x="48"
          y="62"
          textAnchor="middle"
          fontSize="42"
          fill="currentColor"
        >
          ?
        </text>
      </svg>

      <h1>404 — Page non trouvée</h1>

      <p className="my-4">
        La page que vous cherchez n’existe pas ou a été déplacée.
      </p>

      <Link to="/" className="btn btn-primary">
        Retour à l’accueil
      </Link>
      <PageMeta
  titre="404 — Page non trouvée"
  description="Cette page est introuvable. Revenez à l’accueil de Trouve ton artisan pour rechercher un professionnel."
/>
    </main>
  );
}

export default NotFound;