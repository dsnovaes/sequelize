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
console.log('API funcionando! 🚀');

router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));

// usuarios

router.get('/v1/usuarios', (req, res) => {
    (async () => {
        const User = require('./models/user');

        try {
            const resultado = await database.sync();
            const result = await User.findAll();
            res.json(result);
        } catch (error) {
            console.log(error);
        }

    })();
})

router.get('/v1/usuarios/:id?', (req, res) => {

    const { id } = req.params;
    (async () => {
        const User = require('./models/user');

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

router.get('/v1/produtos/:id', (req, res) => {

    const { id } = req.params;
    (async () => {
        const Produto = require('./models/produto');

        try {
            const result = await Produto.findByPk(id);
            if (result === null) {
                return res.status(400).json({ error: 'Product not found.' })
            }
            else {
                return res.json(result);
            }

        } catch (error) {
            console.error(error);
        }

    })();
})



function getRandom6Digits() {
    var code1 = "123456789";
    var code2 = "0123456789"; var result = "";
    result = code1[Math.floor(Math.random() * 9)];
    for (var i = 0; i < 5; i++) {
        result += code2[Math.floor(Math.random() * 10)];

    }
    return result;
}

var id_produto = getRandom6Digits();

function idExists(req, res, next) {

    (async () => {
        const Produto = require('./models/produto');
        try {
            const result = await Produto.findByPk(id_produto);
            if (result === null) {
                console.log(`ID ${id_produto} não existe na base`);
            }
            else {
                console.log(`ID ${id_produto} já existe na base`);
                console.log("Gerando novo ID");
                id_produto = getRandom6Digits();
                console.log(`Novo ID ${id_produto} gerado`);
            }

        } catch (error) {
            console.error(error);
        }

    })();

    return next();
}

router.post('/v1/produtos', idExists, (req, res,) => {
    const { name, price, category, desc } = req.body;

    (async () => {
        const Produto = require('./models/produto');

        try {
            const resultado = await database.sync();
            const resultadoCreate = await Produto.create({
                produto_id: id_produto,
                nome: name,
                preco: price,
                categoria: category,
                descricao: desc
            })
            return res.json(resultadoCreate)
        } catch (error) {
            if (error.parent.code === "ER_DUP_ENTRY") {
                console.error("❌ ⛔️ Entrada duplicada ⛔️ ❌");
            } else {
                console.error(error);
            }
        }

    })();
})

router.put('/v1/produtos/:id', (req, res) => {
    const { name, price, category, desc } = req.body;
    const { id } = req.params;

    (async () => {
        const Produto = require('./models/produto');

        try {
            const produto = await Produto.findByPk(id);
            if (produto === null) {
                return res.status(400).json({ error: 'Product not found.' })
            }
            else {
                produto.nome = name;
                produto.preco = price;
                produto.categoria = category;
                produto.descricao = desc;

                const resultadoSave = await produto.save();
                return res.json(resultadoSave)
            }
        } catch (error) {
            console.error(error);
        }

    })();
})


// pedidos

router.get('/v1/pedidos', (req, res) => {
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
        const Pedido = require('./models/pedido');

        try {
            const resultado = await database.sync();
            const result = await Pedido.findAll({ //findAndCountAll, se quiser a contagem total de resultados
                limit: resultsPerPage,
                offset: lastPageViewed
            });
            res.json(result);
        } catch (error) {
            console.log(error);
        }

    })();
})

router.get('/v1/pedidos/:id', (req, res) => {

    const { id } = req.params;
    (async () => {
        const Pedido = require('./models/pedido');

        try {
            const result = await Pedido.findByPk(id);
            if (result === null) {
                return res.status(400).json({ error: 'Order not found.' })
            }
            else {
                return res.json(result);
            }

        } catch (error) {
            console.error(error);
        }

    })();
})

router.post('/v1/pedidos', (req, res) => {
    const { products, user } = req.body;

    (async () => {
        const Pedido = require('./models/pedido');

        try {
            const resultado = await database.sync();
            const resultadoCreate = await Pedido.create({
                produtos: products,
                usuario: user,
                data_pedido: Date.now()
            })
            return res.json(resultadoCreate)
        } catch (error) {
            console.error(error);
        }

    })();
})