'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VentaSchema = Schema({
	folio: String,
	fecha: {type:Date, default: Date.now},
	cliente: String,
	total: Number,	
	detalle: Number,
});

module.exports = mongoose.model('Venta', VentaSchema);
