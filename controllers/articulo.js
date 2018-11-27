'use strict'

const Articulo = require('../models/articulo')

function getArticulos(req,res){
	Articulo.find({}).collation({locale:"en"}).exec((err,articulo)=>{
    if(err){
      return res.status(500).send();
    }
    if(!articulo){
      return res.status(404).send();
    }

    return res.status(200).send(articulo);

  });
}

function postArticulos(req,res){
  var articulo = new Articulo();
  var params = req.body;
  
  articulo.Nombre = params.Nombre;
  articulo.Correo = params.Correo;
  articulo.Titulo = params.Titulo;
  articulo.Descripcion = params.Descripcion;
  articulo.Fecha = params.Fecha;
  articulo.strAmat = params.strAmat;
  articulo.Imagen = params.Imagen;
  articulo.Comentarios = [];

  articulo.save((err,articuloSaved)=>{
    if(err){
      return res.status(500).send();  
    }else{
      return res.status(200).send();
    }
  });
}

module.exports = {
	getArticulos,
  postArticulos
}