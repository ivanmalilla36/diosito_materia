'use strict'

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArticuloSchema = Schema({
	Nombre: String,
	Correo: String,
	Titulo: String,
	Descripcion: String,
	Fecha: String,
	Imagen: String,
	Comentarios: Array
})

module.exports = mongoose.model('Articulo', ArticuloSchema)