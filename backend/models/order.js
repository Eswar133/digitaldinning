// Sequelize models for orders and order_items (PostgreSQL)

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const MenuItemPG = require('./menu_item_pg');
const Order = sequelize.define('Order', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  phone_number: { type: DataTypes.STRING, allowNull: false },
  total_price: { type: DataTypes.FLOAT, allowNull: false },
  table_number: { type: DataTypes.INTEGER, allowNull: true },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
  tableName: 'orders',
  timestamps: false,
});

const OrderItem = sequelize.define('OrderItem', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  order_id: { type: DataTypes.INTEGER, allowNull: false },
  menu_item_id: { type: DataTypes.STRING, allowNull: false }, // MongoDB _id as string
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
}, {
  tableName: 'order_items',
  timestamps: false,
});

Order.hasMany(OrderItem, { foreignKey: 'order_id' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });
OrderItem.belongsTo(MenuItemPG, { foreignKey: 'menu_item_id', as: 'menu_item' });

module.exports = { Order, OrderItem };
