const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Artisan = sequelize.define(
  'Artisan',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    nom: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    note: {
      type: DataTypes.DECIMAL(2, 1),
      allowNull: false,
    },
    ville: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    a_propos: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(254),
      allowNull: false,
    },
    site_web: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    top: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    specialite_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'specialites',
        key: 'id',
      },
    },
  },
  {
    tableName: 'artisans',
    timestamps: false,
  }
);

module.exports = Artisan;