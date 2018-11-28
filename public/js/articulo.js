articulo = [];
comentarios = [];

function getArticulo(){
	var id = localStorage.getItem("idArticulo");
	
	$.ajax({
	      type: "GET",
	      url: 'https://tiralaodefiendela.herokuapp.com/getArticulo/'+id,
	      /*
	      data: {
	          nombre: nombre,
	          email: email,
	          telefono: telefono,
	          mensaje: mensaje
	      },*/
	      success: function(data){
	        //alert("OK");
	        //console.log(data);
	        articulo = data;
	        comentarios = data.Comentarios;
	        fillData();
	        fillComentarios();
	      },
	      error: function(data){
	        alert("ERROR");
	        console.log("ERROR "+data);
	      }
	  });

}

function fillData(){

	fecha = new Date(articulo.Fecha);
  mes = formatMonth(fecha);
	
	document.getElementById('txtDia').innerHTML = fecha.getUTCDate();
  document.getElementById('txtMesAno').innerHTML = mes + ', '+fecha.getUTCFullYear();
  document.getElementById('txtTitulo').innerHTML = articulo.Titulo;
  document.getElementById('txtNombre').innerHTML = articulo.Nombre;
  document.getElementById('txtTitulo2').innerHTML = articulo.Titulo;
  document.getElementById('txtNombre2').innerHTML = 'Por: '+articulo.Nombre;
  document.getElementById('txtFecha').innerHTML = 'Fecha: '+fecha.getUTCDate()+'/'+mes+'/'+fecha.getUTCFullYear();
  document.getElementById('txtDescripcion').innerHTML = articulo.Descripcion;
}

function fillComentarios(){
	var html = '';
  for (var key=0, size=comentarios.length; key<size;key++) {

    fecha = new Date(comentarios[key].Fecha);
    mes = formatMonth(fecha);

    html +=
        '<div class="media">'+
	        '<div class="d-flex">'+
	        	'<h4>'+comentarios[key].Nombre+'</h4>'+
	          '<h5>'+mes+' '+fecha.getUTCDate()+', '+fecha.getUTCFullYear()+'</h5>'+
	        '</div>'+
	        '<div class="media-body">'+
	        	'<p>'+comentarios[key].Comentario+'</p>'+
	        '</div>'+
	    	'</div>'
  }
  $('#comentariosDIV').append(html);
}

function publicarComentario(){
	var nombre = document.getElementById('inputNombre').value;
	var fecha = new Date();
	var correo = document.getElementById('inputCorreo').value;
	var comentario = document.getElementById('inputMensaje').value;

	if(checkEmail(correo) && nombre!="" && comentario!=""){

		putComentario(nombre,fecha,correo,comentario);

	}else{
		alert("Campos vacios o incorrectos");
	}

}

function putComentario(nombre,fecha,correo,comentario){
	var id = localStorage.getItem("idArticulo");
	console.log(id);
	$.ajax({
      type: "PUT",
      url: 'https://tiralaodefiendela.herokuapp.com/putComentario/'+id,
     
      data: {
	      Nombre: nombre,
	      Fecha: fecha,
	      Correo: correo,
	      Comentario: comentario
      },
      crossDomain:true,
      success: function(data){
      	alert("Comentario publicado");
      	//location.reload(); 
      },
      error: function(data){
        alert("ERROR");
        console.log(data);
      }
  });
}


function formatMonth(date){
  var monthNames = [
    "Enero", "Febrero", "Marzo",
    "Abril", "Mayo", "Junio", "Julio",
    "Agosto", "Septiembre", "Octubre",
    "Noviembre", "Diciembre"
  ];
  var monthIndex = date.getUTCMonth();

  return monthNames[monthIndex];
}

function checkEmail(email)
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
  {
    return (true);
  }
    return (false);
}