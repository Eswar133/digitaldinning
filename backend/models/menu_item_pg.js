// Sequelize model for menu items (PostgreSQL)
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const MenuItemPG = sequelize.define('MenuItem', {
  id: { type: DataTypes.STRING, primaryKey: true }, // use string to match MongoDB _id if needed
  name: { type: DataTypes.STRING, allowNull: false },
  category: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING },
  price: { type: DataTypes.FLOAT, allowNull: false },
  image: { type: DataTypes.STRING },
}, {
  tableName: 'menu_items',
  timestamps: false,
});

module.exports = MenuItemPG;
