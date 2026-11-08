const express = require('express');
const cors = require('cors');
const { rateLimit } = require('express-rate-limit');
const sequelize = require('./db');
const { Categorie, Specialite, Artisan } = require('./models');
const obtenirTransporteur = require('./mailer');

const app = express();
const port = Number(process.env.PORT || 3001);

// Render transmet les requêtes au serveur via un proxy.
if (process.env.RENDER === 'true') {
  app.set('trust proxy', 1);
}

app.use(cors({
  origin: process.env.FRONTEND_URL,
}));

app.use(express.json({ limit: '20kb' }));

// Cette limite est commune à toutes les fiches artisans.
const limiteContact = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: {
    message:
      'Trop de tentatives. Veuillez réessayer dans 15 minutes.',
  },
});

const attributsArtisan = [
  'id', 'nom', 'note', 'ville',
  'a_propos', 'site_web', 'top',
];

const relationsArtisan = [
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
];

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
      attributes: attributsArtisan,
      include: relationsArtisan,
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
      attributes: attributsArtisan,
      include: relationsArtisan,
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

app.post('/api/artisans/:id/contact', limiteContact, async (req, res) => {
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
    !nom ||
    !email ||
    !objet ||
    !message ||
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

    await transporteur.sendMail({
      replyTo: email,
      subject: `[Test Trouve ton artisan] ${objet}`,
      text: [
        `Artisan concerné : ${artisan.nom}`,
        `Nom : ${nom}`,
        `E-mail : ${email}`,
        '',
        message,
      ].join('\n'),
    });

    res.json({
      message:
        'Message de test transmis. Vérifiez votre boîte mail et vos spams.',
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

    const serveur = app.listen(port, '0.0.0.0', () => {
      console.log(`API démarrée sur le port ${port}`);
    });

    serveur.on('error', (erreur) => {
      console.error('Démarrage impossible :', erreur.message);
      process.exitCode = 1;
    });
  } catch (erreur) {
    console.error('Démarrage impossible :', erreur.message);
    process.exitCode = 1;
  }
}

demarrer();