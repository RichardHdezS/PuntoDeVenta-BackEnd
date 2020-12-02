'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VentaSchema = Schema({
	public folio: String,
	public fecha: {type:Date, default: Date.now},
	public cliente: {type: Schema.Types.ObjectId, ref: 'Cliente'},
	public total: Number,
	public detalle: [{type: Schema.Types.ObjectId, ref: 'VentaDet'}],	
});

module.exports = mongoose.model('Venta', VentaSchema);
