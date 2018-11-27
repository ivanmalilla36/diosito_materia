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

module.exports = {
	getArticulos
}