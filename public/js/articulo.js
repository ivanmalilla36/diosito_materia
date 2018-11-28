articulo = [];
comentarios = [];

function getArticulo(){
	$(".loader").fadeIn();
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
	        $(".loader").fadeOut();
	      },
	      error: function(data){
	        alert("ERROR");
	        console.log("ERROR "+data);
	        $(".loader").fadeOut();
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

  if(articulo.Imagen == ""){
		document.getElementById('imagen').src = "/img/blog/blog-1.jpg";
  }else{
  	document.getElementById('imagen').src = articulo.Imagen;
  }
}

function fillComentarios(){
	var html = '';

	comentarios.sort(function(a,b){
    return b.Fecha.localeCompare(a.Fecha);
  });

	document.getElementById('numComentarios').innerHTML = "Comentarios ("+comentarios.length+")";

	if(comentarios.length == 0){
		document.getElementById('Nocomentarios').style.display = 'block';
	}else{
		document.getElementById('Nocomentarios').style.display = 'none';
	}

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
	$(".loader").fadeIn();
	var id = localStorage.getItem("idArticulo");

	$.ajax({
      type: "PUT",
      url: 'https://tiralaodefiendela.herokuapp.com/putComentario/'+id,
     
      data: {
	      Nombre: nombre,
	      Fecha: fecha,
	      Correo: correo,
	      Comentario: comentario
      },
      success: function(data){
      	alert("Comentario publicado");
      	$(".loader").fadeOut();
      	location.reload(); 
      },
      error: function(data){
        alert("ERROR");
        console.log(data.status);
        $(".loader").fadeOut();
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