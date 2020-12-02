'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VentaDetSchema = Schema({
	public venta: {type: Schema.Types.ObjectId, ref: 'Venta'},
	public producto: {type: Schema.Types.ObjectId, ref: 'Producto'},
	public cantidad: String,
	public precio: String,
	public importe: String,
});

module.exports = mongoose.model('Venta_det', VentaDetSchema);
