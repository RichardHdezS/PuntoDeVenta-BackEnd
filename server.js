'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3800;

// conexion Database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/bdtest', {useUnifiedTopology: true, useNewUrlParser: true })
		.then (() => {
			console.log("La conexión a la base de datos bdtest se ha realizado correctamente!!!")
			// crear servidor
			app.listen(port, () => {
				console.log("Servidor corriendo correctamente en http://localhost:3800");
			});
		})
		.catch(err => console.log(err));