'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClientSchema = Schema({
	clave: String,
	nombre: String,
	direccion: String,
	telefono: String,
	saldo: Number,
});

module.exports = mongoose.model('Client', ClientSchema);
