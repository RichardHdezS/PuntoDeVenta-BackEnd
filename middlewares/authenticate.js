'use strict'

var jwt = require('jsonwebtoken');
var moment = require('moment');
var secret = 'clave_secreta_taller_programacion_web_1';


//la logica de este middleware es comprobar si el token enviado por la petición es correcto o no, para así poder determinar que el usuario puede recibir la información que esta solicitando
// ensureAuth es el nombre del metodo o funcion para autenticar
exports.ensureAuth = function(req, res, next){
	//se define el header con nombre authorization para verificar que la petición tiene cabecera
	if(!req.headers.token){
		return res.status(403).send({message : "La peticion no tiene la cabecera de autenticación"});
	}

	var token = req.headers.token.replace(/['"]+/g, '');
	//se define un manejo de excepciones como try para manejar cualquier evento en el token, como si el mismo esta expirado o no es válido
	try{

		var payload = jwt.verify(token, secret);
		if(payload.exp <= Math.floor(Date.now() / 1000)){
			return res.status(401).send({
				message : 'El token ha expirado'
			});
		}
	}catch(ex){
		return res.status(401).send({
				message : 'El token no es válido', 
				token
			});
	}
	// adjuntar el payload a la request para tener siempre en los controladores los datos del usuario identificado, que se encuentran en el objeto del controlador user
	req.user = payload;
	// funcion que te permite continuar con la siguiente instrucción que se encuentre encolada, en este caso al siguiente metodo en la llamada
	next();
}