const Sequelize = require('sequelize');
const sequelize = new Sequelize('chamanoteste', 'root', 'root', { dialect: 'mysql', host: 'localhost' });

module.exports = sequelize;