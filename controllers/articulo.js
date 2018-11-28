'use strict'

const Articulo = require('../models/articulo')

function index(req,res){
  res.render('index.html')
}

function articulo(req,res){
  res.render('articulo.html')
}

function blog(req,res){
  res.render('blog.html')
}

function publicar(req,res){
  res.render('publicar.html')
}

function getArticulo(req,res){
  const articuloID = req.params.articuloID
  Articulo.findById(articuloID, function(err,articulo){
    if (err) {
      res.status(500).send("Error al devolver marcador")
      // console.log(err)
    }else {
     return res.status(200).send(articulo);
    }
  })
}

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

function putComentario(req,res){
  var idArticulo = req.params.idArticulo;
  var data = req.body;

  Articulo.findByIdAndUpdate(idArticulo,{$push:{"Comentarios": data}},function(err,comentarioSaved){
    if(err){
      res.status(500).send();
    }else{
      res.status(200).send();
    }
  })
}

module.exports = {
	getArticulos,
  postArticulos,
  putComentario,
  getArticulo,
  index,
  blog,
  publicar,
  articulo
}