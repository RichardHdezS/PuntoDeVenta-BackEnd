'use strict'

var Client = require('../models/client');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');

function insertClient(req, res) {
	var params = JSON.parse(req.body.params);
	var client = new Client();
	//console.log('Mensaje desde saveUser:',params.name);
	if (params.clave && params.nombre && params.direccion && params.telefono){
		//console.log('Mensaje desde saveUser2',params);
		client.clave = params.clave;
		client.nombre = params.nombre;
		client.direccion = params.direccion;
        client.telefono = params.telefono;
		client.saldo = 0;

		//filtro para detectar y controlar la duplicidad de usuarios
		Client.find({clave: client.clave}).exec((err, clienti) => {
			if (err) return res.status(500).send({message: 'Error en la petición de clientes...'})

			if(clienti && clienti.length >= 1){
				return res.status(200).send({message: 'El cliente que intenta registrar ya existe...'})
			} else {
				//Cifrado de contraseña y guardado de datos
				client.save((err, clientStored) =>{
						if (err) return res.status(500).send({message : 'Error al guardar el cliente...'})

						if (clientStored){
							res.status(200).send({client : clientStored});
						}else{
							res.status(404).send({message : 'No se ha registrado el cliente...'});
						}
				});
            }
        });	

    } else {
		res.status(200).send({
			message : 'Envia todos los campos necesarios!!!'
		});
	}
}

function removeClient(req, res) {
	var params = JSON.parse(req.body.params);
	console.log('Mensaje desde removeClient:',params.client);
	if (params.client){

		Client.deleteOne({ clave: params.client }, (err, client) => {
			if (err) return res.status(500).send({message: 'Error en la petición de cliente...'})
            return res.status(200).send({client: client, message: 'El cliente fue eliminado...'})
		});

    } else {
		res.status(200).send({
			message : 'Envia todos los campos necesarios!!!'
		});
	}
}

function updateClient(req, res) {
	var params = JSON.parse(req.body.params);
	var client = new Client();
	console.log('Mensaje desde updateClient:',params);
	if (params){

        if (params.nombre){
            client.nombre = params.nombre;
        }
        if (params.direccion){
            client.direccion = params.direccion;
        }
        if (params.telefono){
            client.telefono = params.telefono;
        }
        if (params.saldo){
            client.saldo = params.saldo;
        }
		
		Client.updateOne({ clave: params.clave }, { $set: { nombre: client.nombre, direccion: client.direccion, telefono: client.telefono, saldo: client.saldo } }, (err, doc) => {
            if (err) return res.status(500).send({message : 'Error en la actualización...'});
            return res.status(200).send({client: doc, message : 'Actualización realizada con éxito ... '});
		});

    } else {
		res.status(200).send({
			message : 'Debe proporcionar la clave del cliente !!!'
		});
    }
}

function getClients(req, res) {
	//var params = JSON.parse(req.body.params);
	console.log(req.body.params);

	if (req.params.client){
        // Get only one
        Client.find({clave:req.params.client}, ( err, client) => {
            if (err) return res.status(500).send({message : 'Error en la búsqueda del cliente...'});
            return res.status(200).send({client : client});
        });
    } else {
        Client.find({}, ( err, clients) => {
            if (err) return res.status(500).send({message : 'Error en la búsqueda del cliente...'});
            return res.status(200).send({clients : clients});
        });
    }
}


module.exports = {
	insertClient,
	removeClient,
	updateClient,
	getClients,
}