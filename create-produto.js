const Sequelize = require('sequelize');
const database = require('./db');

(async () => {
    const database = require('./db');
    const Produto = require('./produto');

    try {
        const resultado = await database.sync();
        const resultadoCreate = await Produto.create({
            nome: 'JBL Everest Elite 700',
            preco: 199.00,
            categoria: 2,
            descricao: 'Não é fone de ouvido, é headphone'
        })
        console.log(resultadoCreate);
    } catch (error) {
        console.log(error);
    }

})();

