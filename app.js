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
	next();
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/', api)

module.exports = app;