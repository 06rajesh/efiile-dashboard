require('dotenv').config();

var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var session = require('express-session');
//var FileStore = require('session-file-store')(session);

var app = express();
var routes = require('./routes');


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
// var mongoose = require('mongoose');
// var apiRoutes = require('./apis/apiRoutes');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname,'..','/resources/views'));

//Serve all the Static Files
app.use(express.static(path.join(__dirname,'..' ,'/public')));


// Session Properties
app.use(cookieParser());
var sess = {
    secret: 'whatIsTheSecret'
};

app.use(session(sess));


// DB setup
var mongoHost = process.env.MONGO_HOST ? process.env.MONGO_HOST : 'mongo';
var mongoPort = process.env.MONGO_PORT ? process.env.MONGO_PORT : '27017';
var database = process.env.DATABASE_NAME ? process.env.DATABASE_NAME : 'efiledb';
mongoose.connect('mongodb://' + mongoHost + ':' + mongoPort + '/' + database);

app.use('/', routes);

module.exports = app;
