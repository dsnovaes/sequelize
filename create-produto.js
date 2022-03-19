const Sequelize = require('sequelize');
const database = require('./db');

(async () => {
    const Produto = require('./produto');

    try {
        const resultado = await database.sync();
        const resultadoCreate = await Produto.create({
            nome: 'Airpods 3rd Gen',
            preco: 189.00,
            categoria: 2,
            descricao: 'Última geração dos Airpods'
        })
        console.log(resultadoCreate);
    } catch (error) {
        console.log(error);
    }

})();

