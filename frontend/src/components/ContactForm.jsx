import { useState } from 'react';

function ContactForm({ artisanId }) {
  const [envoi, setEnvoi] = useState(false);
  const [confirmation, setConfirmation] = useState('');
  const [erreur, setErreur] = useState('');

  async function envoyerMessage(event) {
    event.preventDefault();

    const formulaire = event.currentTarget;
    const donnees = new FormData(formulaire);

    setEnvoi(true);
    setConfirmation('');
    setErreur('');

    try {
      const reponse = await fetch(
        `${import.meta.env.VITE_API_URL}/api/artisans/${artisanId}/contact`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nom: donnees.get('nom'),
            email: donnees.get('email'),
            objet: donnees.get('objet'),
            message: donnees.get('message'),
          }),
        }
      );

      const resultat = await reponse.json();

      if (!reponse.ok) {
        throw new Error(resultat.message);
      }

      setConfirmation(resultat.message);
      formulaire.reset();
    } catch (erreur) {
      setErreur(
        erreur.message || 'Impossible de transmettre le message.'
      );
    } finally {
      setEnvoi(false);
    }
  }

  return (
    <section className="my-4" aria-labelledby="titre-contact">
      <h2 id="titre-contact">Contacter l’artisan</h2>
      <p>Les champs marqués d’un * sont obligatoires.</p>

      <form
        className="card card-body rounded-4"
        onSubmit={envoyerMessage}
      >
        <div className="row g-3">
          <div className="col-12 col-md-6">
            <label htmlFor="contact-nom" className="form-label">
              Votre nom *
            </label>
            <input
              id="contact-nom"
              name="nom"
              type="text"
              autoComplete="name"
              className="form-control"
              maxLength={150}
              required
            />
          </div>

          <div className="col-12 col-md-6">
            <label htmlFor="contact-email" className="form-label">
              Votre e-mail *
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              className="form-control"
              maxLength={254}
              required
            />
          </div>

          <div className="col-12">
            <label htmlFor="contact-objet" className="form-label">
              Objet *
            </label>
            <input
              id="contact-objet"
              name="objet"
              type="text"
              className="form-control"
              maxLength={200}
              required
            />
          </div>

          <div className="col-12">
            <label htmlFor="contact-message" className="form-label">
              Votre message *
            </label>
            <textarea
              id="contact-message"
              name="message"
              className="form-control"
              rows={5}
              maxLength={5000}
              required
            />
          </div>
        </div>

        <p className="small mt-3">
  Site de démonstration : votre message sera envoyé à la boîte
  de test du projet, et non à l’artisan. Ne saisissez pas
  d’informations sensibles.
</p>

        {confirmation && (
          <p role="status" className="text-success">
            {confirmation}
          </p>
        )}

        {erreur && <p role="alert">{erreur}</p>}

        <div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={envoi}
          >
            {envoi ? 'Envoi en cours…' : 'Envoyer le message'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default ContactForm;