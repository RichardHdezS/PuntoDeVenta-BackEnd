'use strict'

var express = require('express');
var bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const cors = require('cors');

var app = express();

app.use(fileUpload({
    createParentPath: true,
    limits: { 
        fileSize: 2 * 1024 * 1024 * 1024 //2MB max file(s) size
    },    
}));

app.use(cors());
app.use(morgan('dev'));

// cargar rutas
var user_routes = require('./routes/user');
var client_routes = require('./routes/client');
var venta_routes = require('./routes/venta');

// middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// rutas
app.use('/api', user_routes);
app.use('/api', client_routes);
app.use('/api', venta_routes);

// exportar
module.exports = app;

