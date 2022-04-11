const Sequelize = require('sequelize');
const database = require('../db');

const Produto = database.define('produto', {
    produto_id: {
        type: Sequelize.INTEGER,
        autoIncrement: false,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    categoria: {
        type: Sequelize.INTEGER
    },
    preco: {
        type: Sequelize.DECIMAL
    },
    descricao: Sequelize.STRING
}, {
    tableName: 'produtos',
    // If don't want createdAt
    createdAt: false,
    // If don't want updatedAt
    updatedAt: false,
});

module.exports = Produto;