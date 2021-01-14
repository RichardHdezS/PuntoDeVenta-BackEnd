'use strict'

var express = require('express');
var ProductController = require('../controllers/producto');

var api = express.Router();
var auth = require('../middlewares/authenticate');

api.post('/producto/insert',auth.ensureAuth, ProductController.insertProducto);
api.post('/producto/remove', auth.ensureAuth, ProductController.removeProducto);
api.post('/producto/update', auth.ensureAuth, ProductController.updateProducto);
api.get('/producto/get/:producto?', auth.ensureAuth, ProductController.getProductos);

module.exports = api;