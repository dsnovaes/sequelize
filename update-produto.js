const Sequelize = require('sequelize');
const database = require('./db');

(async () => {
    const Produto = require('./produto');

    try {
        const resultado = await database.sync();
        const produto = await Produto.findByPk(5);
        //console.log(produto);
        produto.nome = "Carregador USB-C";

        const resultadoSave = await produto.save();
        console.log(resultadoSave);
    } catch (error) {
        console.log(error);
    }

})();