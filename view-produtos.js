const Sequelize = require('sequelize');
const database = require('./db');

(async () => {
    const database = require('./db');
    const Produto = require('./produto');

    try {
        const resultado = await database.sync();
        const produtos = await Produto.findByPk(3);
        console.log(produtos);
    } catch (error) {
        console.log(error);
    }

})();