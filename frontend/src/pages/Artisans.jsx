import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ArtisanCard from '../components/ArtisanCard';
import PageMeta from '../components/PageMeta';

function normaliser(texte) {
  return texte
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function Artisans() {
  const [parametres] = useSearchParams();
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
        setArtisans(donnees);
      } catch (erreur) {
        if (erreur.name !== 'AbortError') {
          setErreur(
            'Impossible de charger les artisans. Réessayez plus tard.'
          );
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

  const categorie = parametres.get('categorie') || '';
  const recherche = parametres.get('recherche') || '';

  const resultats = artisans.filter((artisan) => {
    const bonneCategorie =
      !categorie ||
      normaliser(artisan.specialite.categorie.nom) ===
        normaliser(categorie);

    const bonNom = normaliser(artisan.nom).includes(
      normaliser(recherche)
    );

    return bonneCategorie && bonNom;
  });

  return (
    <main className="container py-4">
      <PageMeta
        titre="Liste des artisans"
        description="Recherchez un artisan en Auvergne-Rhône-Alpes par son nom ou sa catégorie et consultez sa fiche pour le contacter."
      />

      <h1>Les artisans</h1>

      <p>
        Trouvez le professionnel qu’il vous faut près de chez vous.
      </p>

      {chargement ? (
        <p role="status">Chargement des artisans…</p>
      ) : erreur ? (
        <p role="alert">{erreur}</p>
      ) : (
        <>
          <p>{resultats.length} artisan(s) trouvé(s)</p>

          <div className="row g-4">
            {resultats.map((artisan) => (
              <div
                className="col-12 col-md-6 col-lg-4"
                key={artisan.id}
              >
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

          {resultats.length === 0 && (
            <p>Aucun artisan ne correspond à votre recherche.</p>
          )}
        </>
      )}
    </main>
  );
}

export default Artisans;