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
                //console.log(temp);
                // Ejecutamos un innerHTML de todos las lineas de código HTML. //
                tabla += '<p class="mt-2">Código postal: <strong>' + cpostal + '</strong></p>';
                tabla += '<p>Ciudad: <strong>' + temp.name + '</strong></p>';
                tabla += '<input type="hidden" name="nombre" id="nombre" value="' + temp.name + '">';
                tabla += '<p class="weather_main">' + temp.weather[0].description + '</p>';
                tabla += "<img class='img_temp' src='http://openweathermap.org/img/w/" + temp.weather[0].icon + ".png'>";
                tabla += '<p class="weather_temp">' + temp.main.temp + '°</p>';
                tabla += '<input type="hidden" name="temperatura" id="temperatura" value="' + temp.main.temp + '">';
                tabla += '<hr>';
                tabla += '<div class="ml-3 row justify-content-center justify-content-md-start" id="dias">';
                tabla += '</div>';
            }
            section.innerHTML = tabla;
            // Llamamos a la función de InsertOrUpdate //
            InsertOrUpdate();
            readTiempo5dias();
        }
    }
}

function readTiempo5dias() {
    var peticion_http = new XMLHttpRequest();
    var section = document.getElementById('dias');
    var cpostal = document.getElementById('postal').value;
    peticion_http.onreadystatechange = dias;
    peticion_http.open('POST', 'http://api.openweathermap.org/data/2.5/forecast?zip=' + cpostal + ',es&units=metric&cnt=5&appid=fa47f13f85d5d9731ac73175e669c093&lang=es', true);
    peticion_http.send();

    function dias() {
        if (peticion_http.readyState == 4) {
            var tabla = '';
            if (peticion_http.status == 200) {
                var forecast = JSON.parse(peticion_http.responseText);
                // console.log(forecast);
                for (let i = 0; i <= 4; i++) {
                    tabla += "<img class='img_temp1 float-left' src='http://openweathermap.org/img/w/" + forecast.list[i].weather[0].icon + ".png'>";
                    tabla += '<div class="texto">';
                    tabla += '<p>' + forecast.list[i].main.temp + '°</p>';
                    tabla += '</div>';
                    tabla += '';
                }
            }
            section.innerHTML = tabla;
        }
    }
}

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
                console.log(respuesta.resultado);
            }
            readTop5();
        }
    }
    ajax.send(datasend);
}

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