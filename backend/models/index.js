const Categorie = require('./categorie');
const Specialite = require('./specialites');
const Artisan = require('./artisan');

Categorie.hasMany(Specialite, {
  foreignKey: 'categorie_id',
  as: 'specialites',
});

Specialite.belongsTo(Categorie, {
  foreignKey: 'categorie_id',
  as: 'categorie',
});

Specialite.hasMany(Artisan, {
  foreignKey: 'specialite_id',
  as: 'artisans',
});

Artisan.belongsTo(Specialite, {
  foreignKey: 'specialite_id',
  as: 'specialite',
});

module.exports = {
  Categorie,
  Specialite,
  Artisan,
};