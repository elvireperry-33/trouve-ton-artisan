# Trouve ton artisan !

Projet étudiant permettant de rechercher des artisans en
Auvergne-Rhône-Alpes et de consulter leur fiche.

## Liens

- Site : https://trouve-ton-artisan-1-29nl.onrender.com/
- API : https://trouve-ton-artisan-wd7d.onrender.com/api/health
- Maquettes : https://www.figma.com/design/bfu8Ppafvuyq613zpCTuWt/Trouve-ton-artisan

## Technologies

- Frontend : React, Vite, Bootstrap et Sass.
- Backend : Node.js, Express et Sequelize.
- Base de données : MySQL.
- Envoi des messages : API Brevo.
- Hébergement : Render et Clever Cloud.

## Organisation

- `frontend/` : interface du site.
- `backend/` : API et accès à MySQL.
- `creation-base.sql` : création des tables.
- `donnees-base.sql` : données de démonstration.

## Installation locale

Prérequis : Node.js 24, npm et MySQL 8.

### 1. Récupérer le projet

```powershell
git clone https://github.com/elvireperry-33/trouve-ton-artisan.git
cd trouve-ton-artisan
```

### 2. Préparer MySQL

Dans un client MySQL, créer et sélectionner la base :

```sql
CREATE DATABASE IF NOT EXISTS trouve_ton_artisan
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE trouve_ton_artisan;
```

Importer ensuite, dans cet ordre :

1. `creation-base.sql`
2. `donnees-base.sql`

Attention : le script de création peut supprimer et recréer
les tables existantes. Utiliser une base dédiée au projet.

La base contient 4 catégories, 15 spécialités et 17 artisans.

### 3. Configurer le backend

Créer un fichier `backend/.env` :

```dotenv
DB_HOST=localhost
DB_PORT=3306
DB_NAME=trouve_ton_artisan
DB_USER=UTILISATEUR_MYSQL
DB_PASSWORD=MOT_DE_PASSE_MYSQL
PORT=3001
FRONTEND_URL=http://localhost:5173
BREVO_API_KEY=CLE_API_BREVO
MAIL_FROM=ADRESSE_EXPEDITEUR_VERIFIEE
MAIL_TEST_TO=ADRESSE_DE_TEST
```

Remplacer les valeurs d’exemple par ses propres informations.
L’expéditeur doit être vérifié dans Brevo.

Les fichiers `.env` et les clés privées ne doivent jamais
être publiés sur GitHub.

Installer les dépendances et démarrer l’API :

```powershell
cd backend
npm.cmd ci
node server.js
```

Garder ce terminal ouvert.

Vérifier l’API :
http://localhost:3001/api/health

### 4. Configurer le frontend

Créer un fichier `frontend/.env.development` :

```dotenv
VITE_API_URL=http://localhost:3001
```

Dans un deuxième terminal, depuis la racine du projet :

```powershell
cd frontend
npm.cmd ci
npm.cmd run dev
```

Ouvrir l’adresse affichée par Vite, normalement :
http://localhost:5173/

## Formulaire de démonstration

Les messages sont envoyés à l’adresse définie dans
`MAIL_TEST_TO`, et non aux artisans du jeu de données.

Ne pas saisir d’informations sensibles.

Le formulaire est limité à 5 tentatives toutes les 15 minutes
par adresse IP. Le compteur est conservé en mémoire et
réinitialisé au redémarrage du backend.

Sans configuration Brevo valide, la consultation du site reste
possible, mais l’envoi des messages échoue.

## Vérifications

Dans `frontend/` :

```powershell
npm.cmd run build
npm.cmd audit
```

Dans `backend/` :

```powershell
node --check server.js
node test-db.js
npm.cmd audit
```

Les audits décrivent les vulnérabilités connues au moment
de leur exécution et ne garantissent pas l’absence de faille.

## Hébergement

- Frontend : site statique Render.
- Backend : service web Render.
- MySQL : Clever Cloud.

Le frontend utilise `VITE_API_URL` pour joindre l’API.
Le backend utilise `FRONTEND_URL` pour la configuration CORS.

La réécriture `/*` vers `/index.html` permet l’accès direct
aux pages gérées par React Router.

## Limites connues

- Le filtre Bâtiment a renvoyé une liste vide et reste à corriger.
- Le formulaire utilise exclusivement un destinataire de test.
- Les contrôles réalisés ne constituent pas un audit complet
  d’accessibilité ou de sécurité.

## Police

Le projet utilise les fichiers Graphik Trial provenant de
l’archive fournie pour le travail étudiant. La licence jointe
indique un usage personnel uniquement. Toute réutilisation
doit respecter les conditions du titulaire des droits.