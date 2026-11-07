import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [categories, setCategories] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function chargerCategories() {
      try {
        const reponse = await fetch(
          'http://localhost:3001/api/categories',
          { signal: controller.signal }
        );

        if (!reponse.ok) {
          throw new Error('Chargement impossible.');
        }

        const donnees = await reponse.json();
        setCategories(donnees);
      } catch (erreur) {
        if (erreur.name !== 'AbortError') {
          setErreur('Impossible de charger les catégories.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setChargement(false);
        }
      }
    }

    chargerCategories();

    return () => controller.abort();
  }, []);

  return (
    <header className="border-bottom py-3">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
       <Link to="/" className="text-decoration-none">
  <img
    src="/images/Logo.png"
    alt="Trouve ton artisan ! Avec la région Auvergne-Rhône-Alpes — Accueil"
    style={{
      width: '260px',
      maxWidth: '100%',
      height: 'auto',
    }}
  />
</Link>

          <nav aria-label="Navigation principale">
            {chargement ? (
              <p role="status" className="mb-0">
                Chargement du menu…
              </p>
            ) : erreur ? (
              <p role="alert" className="mb-0">
                {erreur}
              </p>
            ) : (
              <ul className="list-unstyled d-flex flex-wrap gap-3 mb-0">
                {categories.map((categorie) => (
                  <li key={categorie.id}>
                    <Link
                      to={`/artisans?categorie=${encodeURIComponent(categorie.nom)}`}
                    >
                      {categorie.nom}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </nav>
        </div>

        <form
          action="/artisans"
          role="search"
          className="d-flex gap-2 mt-3"
        >
          <label
            htmlFor="recherche-artisan"
            className="visually-hidden"
          >
            Rechercher un artisan par son nom
          </label>

          <input
            id="recherche-artisan"
            name="recherche"
            type="search"
            className="form-control"
            placeholder="Rechercher un artisan…"
          />

          <button type="submit" className="btn btn-primary">
            Rechercher
          </button>
        </form>
      </div>
    </header>
  );
}

export default Header;