'use strict'

var Venta = require('../models/venta_det');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');

function insertVenta(req, res) {
	var params = JSON.parse(req.body.params);
	var venta = new Venta();
	console.log('Mensaje desde saveUser:',params.folio);
	if (true){
		console.log('Mensaje desde saveUser2',params);
		venta.folio = params.folio;
		venta.fecha = params.fecha;
		venta.cliente = params.cliente;
        venta.total = params.total;

		//filtro para detectar y controlar la duplicidad de usuarios
		Venta.find({folio: venta.folio}).exec((err, venti) => {
			console.log(venti);
			if(venti && venti.length >= 1){
				return res.status(200).send({message: 'El folio de la venta que intenta registrar ya existe...'})
			} else {
				//Cifrado de contraseña y guardado de datos
				venta.save((err, ventaStored) =>{
						console.log(ventaStored);
						if (err) return res.status(500).send({message : 'Error al guardar la venta...'})

						if (ventatStored){
							res.status(200).send({venta : ventaStored});
						}else{
							res.status(404).send({message : 'No se ha registrado la venta...'});
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

function removeVenta(req, res) {
	var params = JSON.parse(req.body.params);
	console.log('Mensaje desde removeVenta:',params.folio);
	if (params.venta){
		console.log('Hola:3');
		Venta.deleteOne({ folio: params.venta }, (err, venta ) => {
			if (err) return res.status(500).send({message: 'Error en la petición de venta...'})
            return res.status(200).send({venta: venta, message: 'Venta eliminada...'})
		});

    } else {
		res.status(200).send({
			message : 'Envia todos los campos necesarios!!!'
		});
	}
}
 
function updateVenta(req, res) {
	var params = JSON.parse(req.body.params);
	var venta = new Venta();
	console.log('Mensaje desde updateVenta:',params);
	if (params){

        if (params.fecha){
            venta.fecha = params.fecha;
        }
        if (params.cliente){
            venta.cliente = params.cliente;
        }
        if (params.total){
            venta.total = params.total;
        }
		
		Venta.updateOne({ folio: params.folio }, { $set: { fecha: venta.fecha, cliente: venta.cliente, total: venta.total } }, (err, doc) => {
            if (err) return res.status(500).send({message : 'Error en la actualización...'});
            return res.status(200).send({venta: doc, message : 'Actualización realizada con éxito ... '});
		});

    } else {
		res.status(200).send({
			message : 'Debe proporcionar el folio de la venta !!!'
		});
    }
}

function getVentas(req, res) {
	//var params = JSON.parse(req.body.params);
	console.log(req.body.params,'texto');

	if (req.params.venta){
		// Get only one
		console.log('mensaje');
        Venta.find({clave:req.params.venta}, ( err, venta) => {
            if (err) return res.status(500).send({message : 'Error en la búsqueda de la venta...'});
            return res.status(200).send({venta : venta});
        });
    } else {
		console.log('mensaje');
        Venta.find({}, ( err, ventas) => {
            if (err) return res.status(500).send({message : 'Error en la búsqueda de la venta...'});
            return res.status(200).send({ventas : ventas});
        });
    }
}


module.exports = {
	insertVenta,
	removeVenta,
	updateVenta,
	getVentas,
}