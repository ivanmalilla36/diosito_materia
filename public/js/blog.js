articulos = [];

function getArticulos(){
  $.ajax({
      type: "GET",
      url: 'https://tiralaodefiendela.herokuapp.com/getArticulos',
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
        articulos = data;
        fillData();
      },
      error: function(data){
        alert("ERROR");
        console.log("ERROR "+data);
      }
  });
}

function fillData(){
  var html = '';
  for (var key=0, size=articulos.length; key<size;key++) {

    fecha = new Date(articulos[key].Fecha);
    mes = formatMonth(fecha);

    html += //'<tr><td>'
            '<div class="blog_main_item">'+
              '<div class="blog_img">'+
                  '<img class="img-fluid" src="/img/blog/blog-1.jpg" alt="">'+
                  '<div class="blog_date">'+
                    '<h4>'+fecha.getUTCDate()+'</h4>'+
                    '<h5>'+mes+', '+fecha.getUTCFullYear()+'</h5>'+
                '</div>'+
              '</div>'+
              '<div class="blog_text">'+
                '<a><h4>'+articulos[key].Titulo+'</h4></a>'+
                '<div class="blog_author">'+
                  '<a>'+articulos[key].Nombre+'</a>'+
                '</div>'+
                '<p>'+articulos[key].Descripcion+'</p>'+
                '<a href="javascript:leerArticulo(\''+articulos[key]._id+'\');" class="more_btn">Leer Articulo Completo</a>'+
              '</div>'+
            '</div>'
  }
  $('#articuloDIV').append(html);
}

function leerArticulo(id){
  console.log(id)
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

//href="/articulos"