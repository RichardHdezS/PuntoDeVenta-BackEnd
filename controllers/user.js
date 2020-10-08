'use strict'

var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');
var moment = require('moment');
var jwt = require('../services/jwt');

function loginUser(req, res) {

	var params = req.body;
	var email = params.email;
	var password = params.password;

	User.findOne({email: email}, (err, user) => {
		if (err) return res.status(500).send({message : 'Error en la petición...'});

		if (user){
			bcrypt.compare(password, user.password, (err, check) => {
				if (check){	
					//devolver datos del usuario
					if (params.gettoken){
						// generar y devolver el token
						return res.status(200).send({
							token: jwt.createToken(user)
						});
					}else{
						user.password = undefined; //se utiliza undefined para devolver los datos del usuario sin el password
						return res.status(200).send({user});
					}
				}else {
					return res.status(404).send({message : 'El usuario no se ha podido identificar...'});
				}
			});
		}else{
			return res.status(404).send({message : 'El usuario no existe...'});
		}
	});

}

function saveUser(req, res) {
	var params = req.body;
	var user = new User();

	if (params.name && params.middleName && params.lastName &&
		params.nick && params.email && params.password){

		user.name = params.name;
		user.middleName = params.middleName;
		user.lastName = params.lastName
		user.email = params.email;
		user.nick = params.nick;
		user.image = null;
		user.created_at = moment().unix();

		//filtro para detectar y controlar la duplicidad de usuarios
		User.find({email: user.email.toLowerCase()}).exec((err, users) => {
			if (err) return res.status(500).send({message: 'Error en la petición de usuarios...'})

			if(users  && users.length >= 1){
				return res.status(200).send({message: 'El usuario que intenta registrar ya existe...'})
			}else{
				//Cifrado de contraseña y guardado de datos
				bcrypt.hash(params.password, null, null, (err, hash) => {
					user.password = hash;
					user.save((err, userStored) =>{
						if (err) return res.status(500).send({message : 'Error al guardar el usuario...'})

						if (userStored){
							res.status(200).send({user : userStored});
						}else{
							res.status(404).send({message : 'No se ha registrado el usuario...'});
						}
					});
				});
			}	
		});

	}else{
		res.status(200).send({
			message : 'Envia todos los campos necesarios!!!'
		});
	}
}

function publicSite(req, res) {
	res.status(200).send({
		message: 'Saludos desde el sitio público del Servidor de NodeJS'
	});
}


module.exports = {
	home,
	saveUser,
	loginUser,
	publicSite,
}