
function publicarArticulo(){

	var nombre = document.getElementById('txtNombre').value;
	var email = document.getElementById('txtEmail').value;
	var titulo = document.getElementById('txtTitulo').value;
	var articulo = document.getElementById('txtArticulo').value;
	var fecha = new Date();

	//For getting image
	var imagen = inputImage.files[0];

	if(imagen!=null){ //se selecciono imagen
		
		//preparar imagen
		var reader = new FileReader();
		reader.readAsBinaryString(imagen);
		
		reader.onload = function() {
			
			var base64 = btoa(reader.result);
			imageBase64 = 'data:image/png;base64,'+base64;
			console.log(imageBase64);
			
			if(checkEmail(email) && nombre!="" && titulo!="" && articulo!=""){
				postArticulo(nombre,email,titulo,articulo,fecha,imageBase64);
			}else{
				console.log("Campos vacios o incorrectos");
			}

		};
		reader.onerror = function() {
			console.log('there are some problems with image');
		};

	}else{ //no se selecciono imagen

		if(checkEmail(email) && nombre!="" && titulo!="" && articulo!=""){
				postArticulo(nombre,email,titulo,articulo,fecha,"");
		}else{
			console.log("Campos vacios o incorrectos");
		}

	}

}

function postArticulo(nombre,email,titulo,articulo,fecha,imagen){

	$.ajax({
	    type: "GET",
	    url: 'https://examen3api.herokuapp.com/api/cars',
	    /*
	    data: {
	        nombre: nombre,
	        email: email,
	        telefono: telefono,
	        mensaje: mensaje
	    },*/
	    success: function(data){
	    	alert("OK");
	    	console.log(data);
	    },
	    error: function(data){
	    	alert("ERROR");
	    	console.log("ERROR "+data);
	    }
	});

}

function checkEmail(email)
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
  {
    return (true);
  }
    return (false);
}













/*
function getData(){
	
	$.ajax({
	  url: 'https://examen3api.herokuapp.com/api/cars',
	  dataType: 'json',
	  type: 'GET',
  
  success: function(data) {
		//called when successful
		console.log(data);
  },
  error: function(e) {
  	console.log(e.message);
  }
});
}


"https://examen3api.herokuapp.com/api/cars"
*/

/*

$.ajax({
    type: "POST",
    url: 'asset/php/sendMail.php',
    data: {
        nombre: nombre,
        email: email,
        telefono: telefono,
        mensaje: mensaje
    },
    success: function(data){

    },
    error: function(data){
        document.getElementById("textError").textContent="Error! ("+data.text+") ";
    }
});


*/
//document.getElementById("textError").textContent="Error! ("+data.text+") ";
//document.getElementById('imagen').src = imageBase64;