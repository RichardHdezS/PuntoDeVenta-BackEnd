'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();
var auth = require('../middlewares/authenticate');

api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);
api.post('/upload-avatar', UserController.uploadAvatar);
api.get('/get-avatar/:fileName', auth.ensureAuth, UserController.getAvatar );

module.exports = api;