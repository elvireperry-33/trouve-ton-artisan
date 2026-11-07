const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Specialite = sequelize.define(
  'Specialite',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    nom: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    categorie_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id',
      },
    },
  },
  {
    tableName: 'specialites',
    timestamps: false,
  }
);

module.exports = Specialite;