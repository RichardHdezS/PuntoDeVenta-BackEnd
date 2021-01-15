'use strict'

var express = require('express');
var DlleVentaController = require('../controllers/dlleVenta');

var api = express.Router();
var auth = require('../middlewares/authenticate');

api.post('/ventaDetalle/insert', auth.ensureAuth, DlleVentaController.insertDlleVenta);
api.post('/ventaDetalle/remove', auth.ensureAuth, DlleVentaController.removeDlleVenta);
//api.post('/ventaDetalle/update', auth.ensureAuth, DlleVentaController.updateDlleVenta);
api.get('/ventaDetalle/get/:venta-detalle?', auth.ensureAuth, DlleVentaController.getDlleVentas);

module.exports = api;