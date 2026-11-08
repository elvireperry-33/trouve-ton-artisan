import { Link } from 'react-router-dom';

function ArtisanCard({ id, nom, note, specialite, ville }) {
  return (
    <article className="card h-100 rounded-4">
      <div className="card-body">
        <h3 className="h5">{nom}</h3>

      <p>
          <span
            className="text-primary"
            aria-hidden="true"
          >
            {'★'.repeat(Math.round(Number(note)))}
            {'☆'.repeat(5 - Math.round(Number(note)))}
          </span>
          {' '}{note} / 5
        </p>

        <p className="mb-1">{specialite}</p>
        <p className="mb-0">{ville}</p>

        <Link
          to={`/artisans/${id}`}
          className="btn btn-primary mt-3"
        >
          Voir la fiche
        </Link>
      </div>
    </article>
  );
}

export default ArtisanCard;