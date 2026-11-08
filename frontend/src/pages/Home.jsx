import { useEffect, useState } from 'react';
import ArtisanCard from '../components/ArtisanCard';
import PageMeta from '../components/PageMeta';

function Home() {
  const [artisans, setArtisans] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function chargerArtisans() {
      try {
        const reponse = await fetch(
          `${import.meta.env.VITE_API_URL}/api/artisans`,
          { signal: controller.signal }
        );

        if (!reponse.ok) {
          throw new Error('Chargement impossible.');
        }

        const donnees = await reponse.json();
        setArtisans(donnees.filter((artisan) => artisan.top));
      } catch (erreur) {
        if (erreur.name !== 'AbortError') {
          setErreur('Impossible de charger les artisans du mois.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setChargement(false);
        }
      }
    }

    chargerArtisans();

    return () => controller.abort();
  }, []);

  return (
    <main className="container">
      <PageMeta
        titre="Trouvez un artisan en Auvergne-Rhône-Alpes"
        description="Découvrez les artisans d’Auvergne-Rhône-Alpes, consultez leurs spécialités et contactez un professionnel grâce au formulaire."
      />

      <section className="py-4">
        <p>Les savoir-faire près de chez vous</p>
        <h1>Le bon artisan, juste à côté.</h1>
        <p>
          Trouvez un professionnel de confiance en
          Auvergne-Rhône-Alpes et contactez-le simplement.
        </p>
      </section>

      <section className="py-4" aria-labelledby="fonctionnement">
        <h2 id="fonctionnement">Comment trouver mon artisan ?</h2>

        <ol className="row g-4 list-unstyled mt-2">
          <li className="col-12 col-md-6 col-lg-3">
            <h3 className="h5">1. Choisissez une catégorie</h3>
            <p>Choisissez la catégorie d’artisanat dans le menu.</p>
          </li>

          <li className="col-12 col-md-6 col-lg-3">
            <h3 className="h5">2. Choisissez un artisan</h3>
            <p>Découvrez les professionnels et consultez leur fiche.</p>
          </li>

          <li className="col-12 col-md-6 col-lg-3">
            <h3 className="h5">3. Contactez-le</h3>
            <p>Envoyez votre demande via le formulaire de contact.</p>
          </li>

          <li className="col-12 col-md-6 col-lg-3">
            <h3 className="h5">4. Recevez une réponse</h3>
            <p>Une réponse vous sera apportée sous 48 h.</p>
          </li>
        </ol>
      </section>

      <section className="py-4" aria-labelledby="artisans-du-mois">
        <h2 id="artisans-du-mois">Les artisans du mois</h2>

        {chargement ? (
          <p role="status">Chargement des artisans…</p>
        ) : erreur ? (
          <p role="alert">{erreur}</p>
        ) : (
          <div className="row g-4 mt-2">
            {artisans.map((artisan) => (
              <div className="col-12 col-md-4" key={artisan.id}>
                <ArtisanCard
                  id={artisan.id}
                  nom={artisan.nom}
                  note={artisan.note}
                  specialite={artisan.specialite.nom}
                  ville={artisan.ville}
                />
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Home;