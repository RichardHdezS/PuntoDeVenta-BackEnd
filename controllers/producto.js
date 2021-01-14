'use strict'

var Producto = require('../models/producto');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');

function insertProducto(req, res) {
	var params = JSON.parse(req.body.params);
	var producto = new Producto();
	console.log('Mensaje desde saveUser:',params);
	if (true){
		console.log('Mensaje desde saveUser2',params);
		producto.clave = params.clave;
		producto.descripcion = params.descripcion;
		producto.clasificacion = params.clasificacion;
        producto.stock = params.stock;
        producto.costo = params.costo;
        producto.precio = params.precio;

		//filtro para detectar y controlar la duplicidad de usuarios
		Producto.find({clave: producto.clave}).exec((err, productoi) => {
			if (err) return res.status(500).send({message: 'Error en la petición de productos...'})

			if(productoi && productoi.length >= 1){
				return res.status(200).send({message: 'El producto que intenta registrar ya existe...'})
			} else {
				//Cifrado de contraseña y guardado de datos
				producto.save((err, productoStored) =>{
						if (err) return res.status(500).send({message : 'Error al guardar el producto...'})
						console.log(productoStored)
						if (productoStored){
							res.status(200).send({producto : productoStored});
						}else{
							res.status(404).send({message : 'No se ha registrado el producto...'});
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

function removeProducto(req, res) {
	var params = JSON.parse(req.body.params);
	console.log('Mensaje desde removeProducto:',params);
	if (params.Producto){
		console.log('Si te entra');
		Producto.deleteOne({ clave: params.Producto }, (err, producto) => {
			if (err) return res.status(500).send({message: 'Error en la petición de producto...'})
            return res.status(200).send({producto: producto, message: 'El producto fue eliminado...'})
		});

    } else {
		res.status(200).send({
			message : 'Envia todos los campos necesarios!!!'
		});
	}
}

function updateProducto(req, res) {
	var params = JSON.parse(req.body.params);
	var producto = new Producto();
	console.log('Mensaje desde updateProducto:',params);
	if (params){

        if (params.descripcion){
            producto.descripcion = params.descripcion;
        }
        if (params.clasificacion){
            producto.clasificacion = params.clasificacion;
        }
        if (params.stock){
            producto.stock = params.stock;
        }
        if (params.costo){
            producto.costo = params.costo;
        }
        if (params.precio){
            producto.precio = params.precio;
        }
		
		Producto.updateOne({ clave: params.clave }, { $set: { descripcion: producto.descripcion, clasificacion: producto.clasificacion, stock: producto.stock, costo: producto.costo, precio: producto.precio} }, (err, doc) => {
            if (err) return res.status(500).send({message : 'Error en la actualización...'});
            return res.status(200).send({producto: doc, message : 'Actualización realizada con éxito ... '});
		});

    } else {
		res.status(200).send({
			message : 'Debe proporcionar la clave del producto !!!'
		});
    }
}

function getProductos(req, res) {
	//var params = JSON.parse(req.body.params);
	console.log(req.body.params);

	if (req.params.producto){
        // Get only one
        Producto.find({clave:req.params.producto}, ( err, producto) => {
            if (err) return res.status(500).send({message : 'Error en la búsqueda del producto...'});
            return res.status(200).send({producto : producto});
        });
    } else {
        Producto.find({}, ( err, productos) => {
			if (err) return res.status(500).send({message : 'Error en la búsqueda del producto...'});
			console.log(productos,'BCSPN');
            return res.status(200).send({productos : productos});
        });
    }
}


module.exports = {
	insertProducto,
	removeProducto,
	updateProducto,
	getProductos,
}