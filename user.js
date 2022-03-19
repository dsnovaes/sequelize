const Sequelize = require('sequelize');
const database = require('./db');

const User = database.define('user', {
    user_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: Sequelize.STRING,
    cep: Sequelize.STRING,
    aniversario: Sequelize.DATE
}, {
    tableName: 'usuarios',
    // If don't want createdAt
    createdAt: false,
    // If don't want updatedAt
    updatedAt: false,
});

module.exports = User;