'use strict'

const express = require('express')
const ArticuloController = require('../controllers/articulo')
const api = express.Router()

//Son puras rutas que hacen render a las vistas

api.get('/index', ArticuloController.index)

api.get('/articulos', ArticuloController.articulo)

api.get('/publicar', ArticuloController.publicar)

api.get('/blog', ArticuloController.blog)

//son funciones de los articulos

api.get('/getArticulos', ArticuloController.getArticulos)

api.post('/postArticulos', ArticuloController.postArticulos)

api.put('/putComentario/:idArticulo', ArticuloController.putComentario)

module.exports = api;