const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const port = 3000; //porta padrão
var request = require('request');
const { response } = require('express');

//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));

//definindo as rotas
const router = express.Router();

app.use('/', router);

//inicia o servidor
app.listen(port);
console.log('Testando renderização de páginas');


// produtos

router.get('/test', (req, res) => {
    res.send("Isso é um teste.")
    
})