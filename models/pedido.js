const Sequelize = require('sequelize');
const database = require('../db');

const Pedido = database.define('pedido', {
    numero_pedido: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    produtos: {
        type: Sequelize.STRING,
        allowNull: false
    },
    data_pedido: {
        type: Sequelize.DATE
    },
    usuario: {
        type: Sequelize.INTEGER
    }
}, {
    tableName: 'pedidos',
    // If don't want createdAt
    createdAt: false,
    // If don't want updatedAt
    updatedAt: false,
});

module.exports = Pedido;