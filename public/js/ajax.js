window.onload = function() {
    readTiempo();
}

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

function readTiempo() {
    var peticion_http = new XMLHttpRequest();
    var section = document.getElementById('tiempo');
    var cpostal = document.getElementById('postal').value;
    peticion_http.onreadystatechange = tiempo;
    peticion_http.open('POST', 'http://api.openweathermap.org/data/2.5/weather?zip=' + cpostal + ',es&units=metric&appid=fa47f13f85d5d9731ac73175e669c093&lang=es', true);
    peticion_http.send();

    function tiempo() {
        if (peticion_http.readyState == 4) {
            var tabla = '';
            if (peticion_http.status == 200) {
                var temp = JSON.parse(peticion_http.responseText);
                console.log(temp);
                tabla += '<p>Código postal: <strong>' + cpostal + '</strong></p>';
                tabla += '<p>Ciudad: <strong>' + temp.name + '</strong></p>';
                tabla += '<input type="hidden" name="nombre" id="nombre" value="' + temp.name + '">';
                tabla += '<p class="weather_main">' + temp.weather[0].description + '</p>';
                tabla += "<img class='img_temp' src='http://openweathermap.org/img/w/" + temp.weather[0].icon + ".png'>";
                tabla += '<p class="weather_temp">' + temp.main.temp + '°</p>';
                tabla += '<input type="hidden" name="temperatura" id="temperatura" value="' + temp.main.temp + '">';
            }
            section.innerHTML = tabla;
            InsertOrUpdate();
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
            tabla += '<h4 class="text-center" style="margin-bottom: 20px;">Top 5 de las zonas más frías según tus busquedas</h4>';
            for (let i = 0; i < respuesta.length; i++) {
                tabla += '<p class="top5-temp">' + respuesta[i].temperatura + '°</p>';
                tabla += '<p>CP: <strong>' + respuesta[i].cp + '</strong></p>';
                tabla += '<p style="margin-top: -12px;">Ciudad: <strong>' + respuesta[i].nombre + '</strong></p>';
                tabla += '<hr>';
            }
            section1.innerHTML = tabla;
        }
    }
    ajax.send(datasend);
}