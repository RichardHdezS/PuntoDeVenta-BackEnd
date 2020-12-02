'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductoSchema = Schema({
	public clave: String,
	public descripcion: String,
	public clasificacion: [
		{type: Schema.Types.ObjectId, ref: 'Clasificacion'}
	  ],
	public stock: Number,
	public costo: Number,
	public precio: Number,
});

module.exports = mongoose.model('Producto', ProductoSchema);
