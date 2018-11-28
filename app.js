'use strict'

const express = require('express');
const bodyParser = require('body-parser')
const app = express()

app.use(express.static(__dirname + '/node_modules/bootstrap/dist'))

const path = require("path")

const api = require('./routes/articulo');

app.use(express.static(__dirname + '/public/'))
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');


//Agregado para poder tener permiso a la hora de hacer las peticiones GET, POST
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
	next();
});

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

app.use('/', api)

module.exports = app;