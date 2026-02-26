const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Order = sequelize.define('Order', {
  productos: DataTypes.JSON,
  total: DataTypes.DECIMAL,
  estado_pago: {
    type: DataTypes.STRING,
    defaultValue: 'pendiente',
  },
  stripeSessionId: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
});

module.exports = Order;
