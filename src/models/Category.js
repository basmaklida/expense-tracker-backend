const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Adjust this path to your db config

const Category = sequelize.define('Category', {
  name: {
    type: DataTypes.STRING,
    allow_notNull: false
  },
  icon: {
    type: DataTypes.STRING, // To store emojis like 🍔 or 🚗
    allowNull: true
  }
}, {
  tableName: 'categories',
  timestamps: false
});

module.exports = Category;