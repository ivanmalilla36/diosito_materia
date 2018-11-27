'use strict'

const express = require('express')
const ArticuloController = require('../controllers/articulo')
const api = express.Router()

api.get('/index', ArticuloController.index)

api.get('/articulos', ArticuloController.getArticulos)

api.post('/postArticulos', ArticuloController.postArticulos)

api.put('/putComentario/:idArticulo', ArticuloController.putComentario)

module.exports = api;