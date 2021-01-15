'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VentaDetSchema = Schema({
	venta: {type: Schema.Types.ObjectId, ref: 'Venta'},
	producto: {type: Schema.Types.ObjectId, ref: 'Producto'},
	cantidad: String,
	precio: String,
	importe: String,
});

module.exports = mongoose.model('Venta_det', VentaDetSchema);
