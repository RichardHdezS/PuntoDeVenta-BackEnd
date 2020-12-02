'use strict'

var express = require('express');
var ClientController = require('../controllers/client');

var api = express.Router();
var auth = require('../middlewares/authenticate');

api.post('/client/insert', auth.ensureAuth, ClientController.insertClient);
api.post('/client/remove', auth.ensureAuth, ClientController.removeClient);
api.post('/client/update', auth.ensureAuth, ClientController.updateClient);
api.get('/client/get/:client?', auth.ensureAuth, ClientController.getClients);

module.exports = api;