'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClasificacionSchema = Schema({
	public clave: string,
	public descripcion: string,
});

module.exports = mongoose.model('Clasificacion', ClasificacionSchema);
