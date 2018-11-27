'use strict'

const express = require('express')
const ArticuloController = require('../controllers/articulo')
const api = express.Router()

api.get('/articulos', ArticuloController.getArticulos)


module.exports = api;