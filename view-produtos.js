const Sequelize = require('sequelize');
const database = require('./db');

(async () => {
    const Produto = require('./produto');

    try {
        const resultado = await database.sync();
        const result = await Produto.findAll({
            limit: 3,
            offset: 3
        });
        console.log(result);
    } catch (error) {
        console.log(error);
    }

})();