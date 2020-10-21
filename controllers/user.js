'use strict'

var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');

function loginUser(req, res) {

	var params = JSON.parse(req.body.params);
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
							user: user,
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
	var params = JSON.parse(req.body.params);
	var user = new User();
	//console.log('Mensaje desde saveUser:',params.name);
	if (params.name && params.nick && params.email && params.password){
		//console.log('Mensaje desde saveUser2',params);
		user.name = params.name;
		user.email = params.email;
		user.nick = params.nick;
		user.image = params.image;
		user.created_at = Date.now();

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

async function uploadAvatar(req, res) {
    try {
		//console.log(req.file,req.files,req.image);
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let avatar = req.files.avatar;
            
            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            avatar.mv('./uploads/' + avatar.name);

            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: avatar.name,
                    mimetype: avatar.mimetype,
                    size: avatar.size
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
}

function getAvatar( req, res ) {
	
    var	fileSystem = require('fs'),
		path = require('path');
	
    if(!req.params.fileName)
		return res.status(400).json('File name expected');

	var filePath = path.join('uploads',req.params.fileName );
	console.log(filePath);
	var stat = fileSystem.statSync(filePath);
	console.log(path.extname(req.params.fileName));
	if (path.extname(req.params.fileName) == '.jpg' || path.extname(req.params.fileName) == '.jpeg') {
		res.writeHead(200, {
			'Content-Type': 'image/jpeg',
			'Content-Length': stat.size
		});
	} else if (path.extname(req.params.fileName) == '.png') {
		res.writeHead(200, {
			'Content-Type': 'image/png',
			'Content-Length': stat.size
		});
	} else {
		return res.status(400).json('Only file extensions jpg, jpeg o png are accepted ');
	}

	var readStream = fileSystem.createReadStream(filePath);
	// We replaced all the event handlers with a simple call to readStream.pipe()
	readStream.pipe(res);
	
}

module.exports = {
	saveUser,
	loginUser,
	publicSite,
	uploadAvatar,
	getAvatar
}