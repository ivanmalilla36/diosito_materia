'use strict'

const express = require('express')
const ArticuloController = require('../controllers/articulo')
const api = express.Router()

api.get('/articulos', ArticuloController.getArticulos)

api.post('/postArticulos', ArticuloController.postArticulos)

module.exports = api;