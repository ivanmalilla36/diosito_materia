'use strict'

const mongoose = require('mongoose');
const port = process.env.PORT || 3678;

mongoose.connect('mongodb://diosito:admin123@ds145951.mlab.com:45951/materia_diosito',(err,res)=>{
	console.log("base de datos iniciada")

	if (err) {
		// throw err;
		console.log("Este es un error")
	}
	else{
		app.listen(port, () => {
		console.log(`API RES Tirala O defiendela funcionando en en http://localhost:${port}`);
	});
	}

})

const app = require('./app');