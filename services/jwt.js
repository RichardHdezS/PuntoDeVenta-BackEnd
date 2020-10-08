'use strict'

var jwt = require('jsonwebtoken');
//var Math = require('math-floor');
var moment = require('moment');
var secret = 'clave_secreta_taller_programacion_web_1';

//metodo para crear un token con contraseña por el dessarrollador para la autorización de ejecución de la petición.
exports.createToken = function(user){
	var payload = {
		sub : user._id,
		name : user.name,
		email : user.email,
		created_at : moment().unix(),
		iat : Date.now(),
		exp : Math.floor(Date.now() / 1000) + (60 * 60 * 24) 
	};

	return jwt.sign(payload, secret);

};