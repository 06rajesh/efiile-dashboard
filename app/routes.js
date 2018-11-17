/**
 * Created by Rajesh on 11/14/18.
 */

require('dotenv').config();
var express = require('express');

var loginCtrl = require('./controllers/loginController');

var routes = express.Router();


routes.get('/login', loginCtrl.view);
routes.post('/login', loginCtrl.submit);

routes.get('/*', function(req, res){
    console.log(req.session);
    res.render('index');
});

module.exports = routes;
