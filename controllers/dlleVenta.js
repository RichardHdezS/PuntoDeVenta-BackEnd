'use strict'

var DVenta = require('../models/venta_det');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');

function insertDlleVenta(req, res) {
	var params = JSON.parse(req.body.params);
	var Dventa = new DVenta();
	console.log('Mensaje desde saveUser:',params.venta);
	if (true){
		console.log('Mensaje desde saveUser2',params);
		Dventa.venta = params.venta;
		Dventa.producto = params.producto;
		Dventa.cantidad = params.cantidad;
		Dventa.precio = params.precio;
		Dventa.importe = params.importe;

		//filtro para detectar y controlar la duplicidad de usuarios
		DVenta.find({Dventa: Dventa.venta}).exec((err, dventi) => {
			console.log('hola',dventi);
			if(dventi && dventi.length >= 1){
				return res.status(200).send({message: 'El folio de la venta que intenta registrar ya existe...'})
			} else {
				//Cifrado de contraseña y guardado de datos
				Dventa.save((err, DventaStored) =>{
						console.log(DventaStored);
						if (err) return res.status(500).send({message : 'Error al guardar el detalle de la venta...'})

						if (DventatStored){
							res.status(200).send({Dventa : DventaStored});
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

function removeDlleVenta(req, res) {
	var params = JSON.parse(req.body.params);
	console.log('Mensaje desde removeDlleVenta:',params.venta);
	if (params.Dventa){
		console.log('Hola:3');
		DVenta.deleteOne({ folio: params.Dventa }, (err, venta ) => {
			if (err) return res.status(500).send({message: 'Error en la petición de venta...'})
            return res.status(200).send({venta: Dventa, message: 'Venta eliminada...'})
		});

    } else {
		res.status(200).send({
			message : 'Envia todos los campos necesarios!!!'
		});
	}
}
/* 
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
*/
function getDlleVentas(req, res) {
	//var params = JSON.parse(req.body.params);
	console.log(req.body.params,'texto');

	if (req.params.Dventa){
		// Get only one
		console.log('mensaje');
        DVenta.find({folio:req.params.Dventa}, ( err, Dventa) => {
            if (err) return res.status(500).send({message : 'Error en la búsqueda de la venta...'});
            return res.status(200).send({Dventa : Dventa});
        });
    } else {
		console.log('mensaje');
        DVenta.find({}, ( err, Dventas) => {
            if (err) return res.status(500).send({message : 'Error en la búsqueda de la venta...'});
            return res.status(200).send({Dventas : Dventas});
        });
    }
}


module.exports = {
	insertDlleVenta,
	removeDlleVenta,
	//updateDlleVenta,
	getDlleVentas,
}