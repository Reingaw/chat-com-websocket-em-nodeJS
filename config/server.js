//Importando o framework Express
var express = require('express');

//Importando o autoloader Consign
var consign = require('consign');

//Importando o módulo do Body-Parser
var bodyParser = require('body-parser');

//Importando o módulo do Express-Validator
var expressValidator = require('express-validator');

//Iniciando o objeto do Express
var app = express();

//Incluindo a engine de views Ejs no objeto App
app.set('view engine', 'ejs');
app.set('views', './app/views');

//Configurando o middleware express.static
app.use(express.static('./app/public'));

//Configurando o middleware body-parser
app.use(bodyParser.urlencoded({extended : true}));

//Configurando o middleware express-validator
app.use(expressValidator());

//Configurando o autoloader consign
consign()
		.include('app/routes')//inclui o diretório routes no objeto app
		.then('app/models')//inclui o diretório models no objeto app
		.then('app/controllers')//inclui o diretório controllers no objeto app
		.into(app);//objeto carregado com os diretórios que serão autocarregados ao iniciar a aplicação

//Exportando o objeto App
module.exports = app;