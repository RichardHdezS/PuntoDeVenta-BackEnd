'use strict'

var express = require('express');
var VentaController = require('../controllers/venta');

var api = express.Router();
var auth = require('../middlewares/authenticate');

api.post('/venta/insert', auth.ensureAuth, VentaController.insertVenta);
api.post('/venta/remove', auth.ensureAuth, VentaController.removeVenta);
api.post('/venta/update', auth.ensureAuth, VentaController.updateVenta);
api.get('/venta/get/:venta?', auth.ensureAuth, VentaController.getVentas);

module.exports = api;