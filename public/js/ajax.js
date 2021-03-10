window.onload = function() {
        readTiempo();
    }
    // Función ajax que usaremos cuando enviemos datos al Controller. //
function objetoAjax() {
    var xmlhttp = false;
    try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (E) {
            xmlhttp = false;
        }
    }
    if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
        xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
}
// Función que leerá el tiempo actual desde la API de OpenWeatherMap y la mostrará por pantalla //
function readTiempo() {
    var peticion_http = new XMLHttpRequest();
    var section = document.getElementById('tiempo');
    // Recogemos el valor del input que contiene el codigo postal que hemos enviado previamente por GET //
    var cpostal = document.getElementById('postal').value;
    peticion_http.onreadystatechange = tiempo;
    peticion_http.open('POST', 'http://api.openweathermap.org/data/2.5/weather?zip=' + cpostal + ',es&units=metric&appid=fa47f13f85d5d9731ac73175e669c093&lang=es', true);
    peticion_http.send();

    function tiempo() {
        if (peticion_http.readyState == 4) {
            var tabla = '';
            if (peticion_http.status == 200) {
                var temp = JSON.parse(peticion_http.responseText);
                // Ejecutamos un innerHTML de todos las lineas de código HTML. //
                tabla += '<input type="hidden" name="lat" id="lat" value="' + temp.coord.lat + '"';
                tabla += '<p class="mt-2">Código postal: <strong>' + cpostal + '</strong></p>';
                tabla += '<input type="hidden" name="lon" id="lon" value="' + temp.coord.lon + '"';
                tabla += '<p>Ciudad: <strong>' + temp.name + '</strong></p>';
                tabla += '<input type="hidden" name="nombre" id="nombre" value="' + temp.name + '">';
                tabla += '<p class="weather_main">' + temp.weather[0].description + '</p>';
                tabla += "<img class='img-fluid img_temp' src='http://openweathermap.org/img/w/" + temp.weather[0].icon + ".png'>";
                tabla += '<p class="weather_temp">' + temp.main.temp + '°</p>';
                tabla += '<input type="hidden" name="temperatura" id="temperatura" value="' + temp.main.temp + '">';
                tabla += '<hr>';
                tabla += '<div class="row justify-content-center justify-content-sm-start" id="dias">';
                tabla += '</div>';
            }
            section.innerHTML = tabla;
            // Llamamos a la función de InsertOrUpdate //
            InsertOrUpdate();
            readTiempo5dias();
        }
    }
}
// Función que llama a la API para recorrer un for y mostrar el tiempo de los próximos 5 días.
function readTiempo5dias() {
    var peticion_http = new XMLHttpRequest();
    var section = document.getElementById('dias');
    //var cpostal = document.getElementById('postal').value;
    var lat = document.getElementById('lat').value;
    var lon = document.getElementById('lon').value;
    peticion_http.onreadystatechange = dias;
    peticion_http.open('POST', 'http://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=hourly,current,minutely,alerts&units=metric&appid=fa47f13f85d5d9731ac73175e669c093&lang=es', true);
    peticion_http.send();

    function dias() {
        if (peticion_http.readyState == 4) {
            var tabla = '';
            if (peticion_http.status == 200) {
                var onecall = JSON.parse(peticion_http.responseText);
                for (let i = 0; i <= 4; i++) {
                    console.log(onecall.daily[i]);
                    tabla += "<img class='img_temp1 float-left' src='http://openweathermap.org/img/w/" + onecall.daily[i].weather[0].icon + ".png'>";
                    tabla += '<div class="texto">';
                    tabla += '<p>' + onecall.daily[i].temp.day + '°</p>';
                    tabla += '</div>';
                    tabla += '';
                }
            }
            section.innerHTML = tabla;
        }
    }
}
// Función de ajax que inserta o actualiza los registros de la BBDD y llama a la función readTop5 //
function InsertOrUpdate() {
    var ajax = new objetoAjax();
    var token = document.getElementById('token').getAttribute('content');
    var cpostal = document.getElementById('postal').value;
    var nombre = document.getElementById('nombre').value;
    var temp = document.getElementById('temperatura').value;
    ajax.open('POST', 'InsertOrUpdate', true);
    var datasend = new FormData();
    datasend.append('_token', token);
    datasend.append('cpostal', cpostal);
    datasend.append('nombre', nombre);
    datasend.append('temperatura', temp);

    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(ajax.responseText);
            if (respuesta.resultado == 'OK') {
                console.log('Todo correcto');
            } else {
                console.log('Ha habido algun error');
            }
            readTop5();
        }
    }
    ajax.send(datasend);
}
// Función ajax que nos muestra el top 5 de las ciudades más frías //
function readTop5() {
    var ajax = new objetoAjax();
    var section1 = document.getElementById('top5');
    var token = document.getElementById('token').getAttribute('content');
    ajax.open('POST', 'readTop', true);
    var datasend = new FormData();
    datasend.append('_token', token);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(ajax.responseText);
            var tabla = '';
            console.log(respuesta);
            tabla += '<h5 class="text-center mt-2" style="margin-bottom: 20px;">Top 5 de las zonas más frías según tus busquedas</h5>';
            for (let i = 0; i < respuesta.length; i++) {
                tabla += '<p class="top5-temp">' + respuesta[i].temperatura + '°</p>';
                tabla += '<p>CP:' + respuesta[i].cp + '</p>';
                tabla += '<p style="margin-top: -12px;">Ciudad:' + respuesta[i].nombre + '</p>';
                tabla += '<hr>';

            }
            section1.innerHTML = tabla;
        }
    }
    ajax.send(datasend);
}