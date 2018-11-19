/**
 * Created by Rajesh on 11/14/18.
 */

require('dotenv').config();
var express = require('express');

var apiRoutes = require('./api-routes');
var loginCtrl = require('./controllers/loginController');

var routes = express.Router();


routes.get('/login', loginCtrl.view);
routes.post('/login', loginCtrl.submit);
routes.get('/logout', loginCtrl.logout);

routes.use('/api', apiRoutes);

routes.use('/*', function (req, res, next) {
    if(req.session.isLoggedIn){
        next();
    }else{
        res.redirect('/login');
    }
});

routes.get('/*', function(req, res){
    res.render('index');
});

module.exports = routes;
