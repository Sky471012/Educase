const { Sequelize } = require('sequelize');
require('dotenv').config();

const mysqlDB = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql'
  }
);

mysqlDB.authenticate()
  .then(() => console.log('MySQL Connected!'))
  .catch(err => console.error('Connection error:', err));

module.exports = mysqlDB;