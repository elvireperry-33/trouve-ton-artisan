import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ContactForm from '../components/ContactForm';
import PageMeta from '../components/PageMeta';

function Artisan() {
  const { id } = useParams();

  const [artisan, setArtisan] = useState(null);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    setChargement(true);
    setErreur('');
    setArtisan(null);

    async function chargerArtisan() {
      try {
        const reponse = await fetch(
         `${import.meta.env.VITE_API_URL}/api/artisans/${id}`,
          { signal: controller.signal }
        );

        if (reponse.status === 404) {
          throw new Error('Artisan introuvable.');
        }

        if (!reponse.ok) {
          throw new Error('Impossible de charger cet artisan.');
        }

        const donnees = await reponse.json();
        setArtisan(donnees);
      } catch (erreur) {
        if (erreur.name !== 'AbortError') {
          setErreur(erreur.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setChargement(false);
        }
      }
    }

    chargerArtisan();

    return () => controller.abort();
  }, [id]);

  return (
    <main className="container py-4">
      <PageMeta
        titre={artisan ? artisan.nom : 'Fiche artisan'}
        description={
          artisan
            ? `Découvrez ${artisan.nom}, spécialiste en ${artisan.specialite.nom} à ${artisan.ville}, et contactez cet artisan.`
            : 'Consultez la fiche d’un artisan en Auvergne-Rhône-Alpes.'
        }
      />

      <Link to="/artisans">← Retour aux artisans</Link>

      {chargement ? (
        <p role="status" className="mt-4">
          Chargement de la fiche…
        </p>
      ) : erreur ? (
        <p role="alert" className="mt-4">
          {erreur}
        </p>
      ) : artisan ? (
        <>
          <img
            src="/images/artisan.png"
            alt=""
            width="80"
            height="80"
            className="d-block mt-4"
          />

          <h1 className="mt-4">{artisan.nom}</h1>

         <p>
            <span className="text-primary" aria-hidden="true">
              {'★'.repeat(Math.round(Number(artisan.note)))}
              {'☆'.repeat(5 - Math.round(Number(artisan.note)))}
            </span>
            {' '}{artisan.note} / 5
          </p>

          <p>{artisan.specialite.nom} · {artisan.ville}</p>

          <section className="my-4">
            <h2>À propos</h2>
            <p>{artisan.a_propos}</p>
          </section>

          {artisan.site_web && (
            <a
              href={artisan.site_web}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Visiter le site web
            </a>
          )}

          <ContactForm
            key={artisan.id}
            artisanId={artisan.id}
          />
        </>
      ) : null}
    </main>
  );
}

export default Artisan;