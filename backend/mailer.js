async function obtenirTransporteur() {
  return {
    async sendMail(options) {
      const cle = process.env.BREVO_API_KEY;
      const expediteur = process.env.MAIL_FROM;
      const destinataire = process.env.MAIL_TEST_TO;

      if (!cle || !expediteur || !destinataire) {
        throw new Error('Configuration Brevo incomplète.');
      }

      // Pour les essais, les messages arrivent uniquement chez toi.
      const reponse = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'api-key': cle,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          sender: {
            name: 'Trouve ton artisan',
            email: expediteur,
          },
          to: [{ email: destinataire }],
          replyTo: { email: options.replyTo },
          subject: options.subject,
          textContent: options.text,
        }),
        signal: AbortSignal.timeout(15000),
      });

      if (!reponse.ok) {
        throw new Error(`Envoi Brevo refusé (${reponse.status}).`);
      }

      return await reponse.json();
    },
  };
}

module.exports = obtenirTransporteur;