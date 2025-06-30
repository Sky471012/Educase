const { Sequelize } = require('sequelize');
require('dotenv').config();

const mysqlDB = new Sequelize(
  process.env.MYSQL_URL
);

mysqlDB.authenticate()
  .then(() => console.log('MySQL Connected!'))
  .catch(err => console.error('Connection error:', err));

module.exports = mysqlDB;