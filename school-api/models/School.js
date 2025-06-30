const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const School = sequelize.define('school', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  address: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  latitude: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  longitude: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  indexes: [
    {
      unique: true,
      fields: ['latitude', 'longitude'] // composite unique key
    }
  ]
});

module.exports = School;
