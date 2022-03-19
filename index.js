const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000; //porta padrão
const database = require('./db');
var request = require('request');

//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//definindo as rotas
const router = express.Router();

app.use('/', router);

//inicia o servidor
app.listen(port);
console.log('API funcionando!');

router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));

// usuarios

router.get('/usuarios', (req, res) => {
    (async () => {
        const User = require('./user');

        try {
            const resultado = await database.sync();
            const result = await User.findAll();
            res.json(result);
        } catch (error) {
            console.log(error);
        }

    })();
})

router.get('/usuarios/:id', (req, res) => {

    const { id } = req.params;
    (async () => {
        const User = require('./user');

        try {
            const result = await User.findByPk(id);
            if (result === null) {
                return res.status(400).json({ error: 'User not found.' })
            }
            else {
                return res.json(result);
            }

        } catch (error) {
            console.log(error);
        }

    })();
})


// produtos

router.get('/produtos', (req, res) => {
    const { resultsPerPage, lastPageViewed } = req.query;
    (async () => {
        const Produto = require('./produto');

        try {
            const resultado = await database.sync();
            const result = await Produto.findAndCountAll({
                limit: resultsPerPage,
                offset: lastPageViewed
            });
            res.json(result);
        } catch (error) {
            console.log(error);
        }

    })();
})

router.get('/produtos/:id', (req, res) => {

    const { id } = req.params;
    (async () => {
        const Produto = require('./produto');

        try {
            const result = await Produto.findByPk(id);
            if (result === null) {
                return res.status(400).json({ error: 'Product not found.' })
            }
            else {
                return res.json(result);
            }

        } catch (error) {
            console.log(error);
        }

    })();
})