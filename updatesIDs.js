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


// produtos

router.get('/v1/updateUser', (req, res) => {

    var usuariosTemp =[];

    (async () => {
        const User = require('./models/user');

        try {
            const result = await User.findAll();

            result.forEach(User => {
                usuariosTemp.push(User.nome)
        
            });

            console.log(usuariosTemp);


            res.json(result);


        } catch (error) {
            console.error(error);
        }

    })();
    
})