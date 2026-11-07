const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
const { Categorie, Specialite, Artisan } = require('./models');
const nodemailer = require('nodemailer');
const obtenirTransporteur = require('./mailer');
const app = express();
const port = Number(process.env.PORT || 3001);

app.use(cors({
  origin: process.env.FRONTEND_URL,
}));

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ message: 'API opérationnelle' });
});

app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Categorie.findAll({
      order: [['id', 'ASC']],
    });

    res.json(categories);
  } catch (erreur) {
    console.error(erreur.message);
    res.status(500).json({
      message: 'Impossible de récupérer les catégories.',
    });
  }
});

app.get('/api/artisans', async (req, res) => {
  try {
    const artisans = await Artisan.findAll({
      attributes: [
        'id', 'nom', 'note', 'ville',
        'a_propos', 'site_web', 'top',
      ],
      include: [
        {
          model: Specialite,
          as: 'specialite',
          attributes: ['id', 'nom'],
          include: [
            {
              model: Categorie,
              as: 'categorie',
              attributes: ['id', 'nom'],
            },
          ],
        },
      ],
      order: [['id', 'ASC']],
    });

    res.json(artisans);
  } catch (erreur) {
    console.error(erreur.message);
    res.status(500).json({
      message: 'Impossible de récupérer les artisans.',
    });
  }
});
app.get('/api/artisans/:id', async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isSafeInteger(id) || id <= 0) {
    return res.status(400).json({
      message: 'Identifiant invalide.',
    });
  }

  try {
    const artisan = await Artisan.findByPk(id, {
      attributes: [
        'id', 'nom', 'note', 'ville',
        'a_propos', 'site_web', 'top',
      ],
      include: [
        {
          model: Specialite,
          as: 'specialite',
          attributes: ['id', 'nom'],
          include: [
            {
              model: Categorie,
              as: 'categorie',
              attributes: ['id', 'nom'],
            },
          ],
        },
      ],
    });

    if (!artisan) {
      return res.status(404).json({
        message: 'Artisan introuvable.',
      });
    }

    res.json(artisan);
  } catch (erreur) {
    console.error(erreur.message);

    res.status(500).json({
      message: 'Impossible de récupérer cet artisan.',
    });
  }
});
app.post('/api/artisans/:id/contact', async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isSafeInteger(id) || id <= 0) {
    return res.status(400).json({
      message: 'Identifiant invalide.',
    });
  }

  const champs = ['nom', 'email', 'objet', 'message'];

  if (
    !req.body ||
    champs.some((champ) => typeof req.body[champ] !== 'string')
  ) {
    return res.status(400).json({
      message: 'Veuillez remplir tous les champs.',
    });
  }

  const nom = req.body.nom.trim();
  const email = req.body.email.trim();
  const objet = req.body.objet.trim();
  const message = req.body.message.trim();

  if (
    !nom || !email || !objet || !message ||
    nom.length > 150 ||
    email.length > 254 ||
    objet.length > 200 ||
    message.length > 5000 ||
    /[\r\n]/.test(nom + email + objet) ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return res.status(400).json({
      message: 'Veuillez vérifier les champs du formulaire.',
    });
  }

  try {
    const artisan = await Artisan.findByPk(id);

    if (!artisan) {
      return res.status(404).json({
        message: 'Artisan introuvable.',
      });
    }

    const transporteur = await obtenirTransporteur();

    const resultat = await transporteur.sendMail({
      from: '"Trouve ton artisan" <contact@example.com>',
      to: artisan.email,
      replyTo: email,
      subject: objet,
      text: `Nom : ${nom}\nE-mail : ${email}\n\n${message}`,
    });

    console.log(
      'Aperçu du message de test :',
      nodemailer.getTestMessageUrl(resultat)
    );

    res.json({
      message: 'Message de test créé. Aucun e-mail réel envoyé.',
    });
  } catch (erreur) {
    console.error('Envoi impossible :', erreur.message);

    res.status(500).json({
      message: 'Impossible de traiter votre message pour le moment.',
    });
  }
});
async function demarrer() {
  try {
    await sequelize.authenticate();

    app.listen(port, () => {
      console.log(`API démarrée sur http://localhost:${port}`);
    });
  } catch (erreur) {
    console.error('Démarrage impossible :', erreur.message);
    process.exitCode = 1;
  }
}

demarrer();