const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Car = sequelize.define('Car', {
  nombre: DataTypes.STRING,
  descripcion: DataTypes.TEXT,
  precio: DataTypes.DECIMAL,
  imagen_url: DataTypes.TEXT,
  es_deportivo: DataTypes.BOOLEAN,
});

module.exports = Car;
