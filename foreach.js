const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const port = 3000; //porta padrão
const database = require('./db');
var request = require('request');
const { response } = require('express');

//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//definindo as rotas
const router = express.Router();

app.use('/', router);

//inicia o servidor
app.listen(port);
console.log('Testando foreach');

router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));


// produtos

router.get('/v1/produtos', (req, res) => {
    var { resultsPerPage, lastPageViewed } = req.query;
    if (resultsPerPage == null) {
        resultsPerPage = 10
    }
    if (lastPageViewed == null) {
        lastPageViewed = 0
    }
    resultsPerPage = parseInt(resultsPerPage);
    lastPageViewed = parseInt(lastPageViewed);

    (async () => {
        const Produto = require('./models/produto');

        try {
            const resultado = await database.sync();
            const result = await Produto.findAll({ //findAndCountAll, se quiser a contagem total de resultados
                limit: resultsPerPage,
                offset: lastPageViewed
            });
            res.json(result);
        } catch (error) {
            console.error(error);
        }

    })();
})
