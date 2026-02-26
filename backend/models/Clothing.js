const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Clothing = sequelize.define('Clothing', {
  nombre: DataTypes.STRING,
  tipo: DataTypes.STRING,
  precio: DataTypes.DECIMAL,
  imagen_url: DataTypes.TEXT,
});

module.exports = Clothing;
