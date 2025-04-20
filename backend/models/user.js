// Sequelize model for users (PostgreSQL)

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  fullname: { type: DataTypes.STRING, allowNull: false },
  password_hash: { type: DataTypes.STRING, allowNull: false },
}, {
  tableName: 'users',
  timestamps: false,
});

module.exports = User;
