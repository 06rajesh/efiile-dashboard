/**
 * Created by Rajesh on 11/18/18.
 */

require('dotenv').config();
var express = require('express');

var userCtrl = require('./controllers/usersController');
var dbNodeCtrl = require('./controllers/dbnodeController');
var apiKeyCtrl = require('./controllers/apiKeyController');

var routes = express.Router();

// route middleware to Session
routes.use(function(req, res, next) {
    if(req.session.isLoggedIn && req.session.user !== null){
        next();
    }else{
        res.json({
            message: 'User Not Logged in',
            success: false,
            status: 401
        });
    }
});

routes.get('/users', userCtrl.findByName);
routes.get('/users/all', userCtrl.getAll);
routes.post('/users/new', userCtrl.create);
routes.post('/users/delete', userCtrl.deleteById);

routes.get('/dbnode/all', dbNodeCtrl.getAll);
routes.post('/dbnode/new', dbNodeCtrl.create);
routes.post('/dbnode/update', dbNodeCtrl.updateDocument);
routes.post('/dbnode/delete', dbNodeCtrl.deleteById);

routes.get('/apikey/all', apiKeyCtrl.getAll);
routes.post('/apikey/new', apiKeyCtrl.create);
routes.post('/apikey/update', apiKeyCtrl.update);
routes.post('/apikey/delete', apiKeyCtrl.deleteById);

module.exports = routes;