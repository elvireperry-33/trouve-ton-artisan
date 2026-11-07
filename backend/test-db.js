const sequelize = require('./db');

async function testerConnexion() {
  try {
    await sequelize.authenticate();
    console.log('Connexion à MySQL réussie !');
  } catch (erreur) {
    console.error('Connexion impossible :', erreur.message);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
}

testerConnexion();