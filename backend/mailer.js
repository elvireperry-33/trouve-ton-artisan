const nodemailer = require('nodemailer');

let transporteur;

async function obtenirTransporteur() {
  if (!transporteur) {
    const compte = await nodemailer.createTestAccount();

    transporteur = nodemailer.createTransport({
      host: compte.smtp.host,
      port: compte.smtp.port,
      secure: compte.smtp.secure,
      auth: {
        user: compte.user,
        pass: compte.pass,
      },
    });
  }

  return transporteur;
}

module.exports = obtenirTransporteur;