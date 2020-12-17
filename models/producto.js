'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductoSchema = Schema({
	clave: String,
	descripcion: String,
	clasificacion: String,
	stock: Number,
	costo: Number,
	precio: Number,
});

module.exports = mongoose.model('Producto', ProductoSchema);
