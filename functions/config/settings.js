const express = require('express');
const bodyParser= require('body-parser');
const app = express();

app.set('view engine','ejs');
app.set('views','./view');

//Criando repositório público Serve-Static
app.use('/public',express.static('../public'));
//Iniciando body-parser como urlencoded
app.use(bodyParser.urlencoded({extended:true}));

module.exports = app;