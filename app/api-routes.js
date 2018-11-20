/**
 * Created by Rajesh on 11/18/18.
 */

require('dotenv').config();
var express = require('express');

var userCtrl = require('./controllers/usersController');
var dbNodeCtrl = require('./controllers/dbnodeController');

var routes = express.Router();

routes.get('/users', userCtrl.findByName);
routes.get('/users/all', userCtrl.getAll);
routes.post('/users/new', userCtrl.create);
routes.post('/users/delete', userCtrl.deleteById);

routes.get('/dbnode/all', dbNodeCtrl.getAll);
routes.post('/dbnode/new', dbNodeCtrl.create);
routes.post('/dbnode/delete', dbNodeCtrl.deleteById);

module.exports = routes;