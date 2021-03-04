window.onload = function() {
    readTiempo();
}

/*function objetoAjax() {
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
}*/

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
                tabla += '<p class="weather_main">' + temp.weather[0].main + '</p>';
                tabla += "<img class='img_temp' src='http://openweathermap.org/img/w/" + temp.weather[0].icon + ".png'>";
                tabla += '<p class="weather_temp">' + temp.main.temp_min + '°</p>';

            }
            section.innerHTML = tabla;
        }
    }

}

/*function read() {
    console.log('read');
    var ajax = new objetoAjax();
    //var token = document.getElementById('token').getAttribute('content');
    var section = document.getElementById('tiempo');
    var cpostal = document.getElementById('postal').value;
    // Busca la ruta read y que sea asyncrono
    ajax.open('GET', 'http://api.openweathermap.org/data/2.5/weather?zip=' + cpostal + ',es&units=metric&appid=fa47f13f85d5d9731ac73175e669c093&lang=es', true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(ajax.responseText);
            var tabla = '';
            console.log(respuesta);
            if (respuesta.length > 0) {
                //tabla += '<p class="card-title ml-3">' + respuesta[i].nombre_loc + '</p>';

            }
            section.innerHTML = tabla;
        }
    }
}*/

/*function insertarRestaurante() {
    var listatipo = document.getElementsByClassName("tipo");
    var tipo = [];
    for (let i = 0; i < listatipo.length; i++) {
        if (listatipo[i].checked) {
            tipo.push(listatipo[i].value);
        }
    }
    var ajax = new objetoAjax();
    var token = document.getElementById('token').getAttribute('content');
    var mensaje = document.getElementById('msg');
    var nombre = document.getElementById('nombre_res').value;
    var direccion = document.getElementById('direccion_res').value;
    var telefono = document.getElementById('telf_res').value;
    var email = document.getElementById('email_res').value;
    var web = document.getElementById('web_res').value;
    var precio = document.getElementById('precio_res').value;
    var horario = document.getElementById('horario_res').value;
    var image = document.getElementById('image_res');
    var img = image.files[0];
    var image1 = document.getElementById('image_menu');
    var img1 = image1.files[0];
    ajax.open('POST', 'insertarRestaurante', true);
    var datasend = new FormData();
    if (tipo.length != 0) {
        console.log(tipo);
        datasend.append('tipo', JSON.stringify(tipo));
    }
    datasend.append('nombre_res', nombre);
    datasend.append('direccion_res', direccion);
    datasend.append('telf_res', telefono);
    datasend.append('email_res', email);
    datasend.append('web_res', web);
    datasend.append('precio_res', precio);
    datasend.append('horario_res', horario);
    datasend.append('imagen', img);
    datasend.append('menu', img1);
    datasend.append('_token', token);

    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(ajax.responseText);
            if (respuesta.resultado == 'OK') {
                mensaje.innerHTML = 'Restaurante registrado correctamente';
                document.getElementById('forminsert').reset();
                closeModal();
            } else {
                mensaje.innerHTML = respuesta.resultado;
            }
            read();
        }
    }
    ajax.send(datasend);
}

function borrarRestaurante(id) {
    var ajax = new objetoAjax();
    var mensaje1 = document.getElementById('mensaje1');
    var token = document.getElementById('token').getAttribute('content');
    ajax.open('POST', 'borrarRestaurante', true);
    var datasend = new FormData();
    datasend.append('id', id);
    datasend.append('_token', token);

    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(ajax.responseText);
            if (respuesta.resultado == 'OK') {
                mensaje1.innerHTML = 'Restaurante eliminado correctamente';
            } else {
                mensaje1.innerHTML = respuesta.resultado;
            }
            read();
        }
    }
    ajax.send(datasend);
}

function updateRestaurante() {
    var ajax = new objetoAjax();
    var mensaje1 = document.getElementById('msg1');
    var token = document.getElementById('token').getAttribute('content');
    var id = document.getElementById('id_restaurante').value;
    var nombre = document.getElementById('nom_restaurante').value;
    var direccion = document.getElementById('direccion_restaurante').value;
    var telf = document.getElementById('telf_restaurante').value;
    var email = document.getElementById('email_restaurante').value;
    var web = document.getElementById('web_restaurante').value;
    var precio = document.getElementById('preciomedio_restaurante').value;
    var horario = document.getElementById('horario_restaurante').value;

    var image = document.getElementById('file_foto');
    var images = document.getElementById('file_foto').value;
    if (images != "") {
        var img = image.files[0];
    }

    var imagemenu = document.getElementById('file_menu');
    var imagesmenu = document.getElementById('file_menu').value;
    if (imagesmenu != "") {
        var imgmenu = imagemenu.files[0];
    }
    ajax.open('POST', 'updateRestaurante', true);
    var datasend = new FormData();
    datasend.append('id_restaurante', id);
    datasend.append('nom_restaurante', nombre);
    datasend.append('direccion_restaurante', direccion);
    datasend.append('telf_restaurante', telf);
    datasend.append('email_restaurante', email);
    datasend.append('web_restaurante', web);
    datasend.append('precio_restaurante', precio);
    datasend.append('horario_restaurante', horario);
    if (images != "") {
        datasend.append('file_foto', img);
        datasend.append('file', true);
    }
    if (imagesmenu != "") {
        datasend.append('file_menu', imgmenu);
        datasend.append('filemenu', true);
    }
    datasend.append('_token', token);

    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(ajax.responseText);
            if (respuesta.resultado == 'OK') {
                mensaje1.innerHTML = 'Restaurante actualizado correctamente';
                closeModal1();
            } else {
                mensaje1.innerHTML = respuesta.resultado;
            }
            read();
        }
    }
    ajax.send(datasend);
}



function openModal1(id, nombre, direccion, telf, email, web, precio, horario) {
    form = document.getElementById("formm");
    form.setAttribute("method", "post");
    form.setAttribute("onsubmit", "updateRestaurante(); return false;");
    form.setAttribute("class", "border p-3 form-group");

    div = document.createElement('DIV');
    div.setAttribute("class", "form-group")
    label = document.createElement('LABEL');
    label.innerHTML = "Nombre";
    input = document.createElement('INPUT');
    input.setAttribute("value", nombre)
    input.setAttribute("type", "text")
    input.setAttribute("name", "nom_restaurante")
    input.setAttribute("id", "nom_restaurante")
    input.setAttribute("class", "form-control")

    input0 = document.createElement('INPUT');
    input0.setAttribute("value", id)
    input0.setAttribute("type", "hidden")
    input0.setAttribute("name", "id_restaurante")
    input0.setAttribute("id", "id_restaurante")
    input0.setAttribute("class", "form-control")

    label1 = document.createElement('LABEL');
    label1.innerHTML = "Direccion";
    input1 = document.createElement('INPUT');
    input1.setAttribute("value", direccion)
    input1.setAttribute("type", "text")
    input1.setAttribute("name", "direccion_restaurante")
    input1.setAttribute("id", "direccion_restaurante")
    input1.setAttribute("class", "form-control")

    label2 = document.createElement('LABEL');
    label2.innerHTML = "Telefono";
    input2 = document.createElement('INPUT');
    input2.setAttribute("value", telf)
    input2.setAttribute("type", "text")
    input2.setAttribute("name", "telf_restaurante")
    input2.setAttribute("id", "telf_restaurante")
    input2.setAttribute("class", "form-control")

    label3 = document.createElement('LABEL');
    label3.innerHTML = "Email";
    input3 = document.createElement('INPUT');
    input3.setAttribute("value", email)
    input3.setAttribute("type", "text")
    input3.setAttribute("name", "email_restaurante")
    input3.setAttribute("id", "email_restaurante")
    input3.setAttribute("class", "form-control")

    label4 = document.createElement('LABEL');
    label4.innerHTML = "Web";
    input4 = document.createElement('INPUT');
    input4.setAttribute("value", web)
    input4.setAttribute("type", "text")
    input4.setAttribute("name", "web_restaurante")
    input4.setAttribute("id", "web_restaurante")
    input4.setAttribute("class", "form-control")

    label5 = document.createElement('LABEL');
    label5.innerHTML = "Precio";
    input5 = document.createElement('INPUT');
    input5.setAttribute("value", precio)
    input5.setAttribute("type", "text")
    input5.setAttribute("name", "preciomedio_restaurante")
    input5.setAttribute("id", "preciomedio_restaurante")
    input5.setAttribute("class", "form-control")

    label6 = document.createElement('LABEL');
    label6.innerHTML = "Horario";
    input6 = document.createElement('INPUT');
    input6.setAttribute("value", horario)
    input6.setAttribute("type", "text")
    input6.setAttribute("name", "horario_restaurante")
    input6.setAttribute("id", "horario_restaurante")
    input6.setAttribute("class", "form-control")

    label7 = document.createElement('LABEL');
    label7.innerHTML = "Portada";
    input7 = document.createElement('INPUT');
    input7.setAttribute("type", "file")
    input7.setAttribute("accept", "image/png")
    input7.setAttribute("name", "file_foto")
    input7.setAttribute("id", "file_foto")
    input7.setAttribute("class", "form-control")

    label8 = document.createElement('LABEL');
    label8.innerHTML = "Menu";
    input8 = document.createElement('INPUT');
    input8.setAttribute("type", "file")
    input8.setAttribute("accept", "image/png")
    input8.setAttribute("name", "file_menu")
    input8.setAttribute("id", "file_menu")
    input8.setAttribute("class", "form-control")

    btn = document.createElement('input');
    btn.setAttribute("type", "submit")
    btn.setAttribute("value", "Actualizar Restaurante")


    form.appendChild(div);
    div.appendChild(label);
    div.appendChild(input);
    div.appendChild(input0);
    div.appendChild(label1);
    div.appendChild(input1);
    div.appendChild(label2);
    div.appendChild(input2);
    div.appendChild(label3);
    div.appendChild(input3);
    div.appendChild(label4);
    div.appendChild(input4);
    div.appendChild(label5);
    div.appendChild(input5);
    div.appendChild(label6);
    div.appendChild(input6);
    div.appendChild(label7);
    div.appendChild(input7);
    div.appendChild(label8);
    div.appendChild(input8);
    form.appendChild(btn);

    modal1.style.display = "block";
}


function openModal() {
    modal.style.display = "block";
    document.getElementById('forminsert').reset();
}

function closeModal() {
    document.getElementById('forminsert').reset();
    modal.style.display = "none";
}

function closeModal1() {
    modal1.style.display = "none";
    document.getElementById("formm").removeChild(div)
    document.getElementById("formm").removeChild(btn)
}

window.onclick = function(event) {
    if (event.target == modal1) {
        modal1.style.display = "none";
        document.getElementById("formm").removeChild(div)
        document.getElementById("formm").removeChild(btn)
    }
    if (event.target == modal) {
        document.getElementById('forminsert').reset();
        modal.style.display = "none";
    }
}

function validarForInsert() {
    var inputs = document.getElementsByClassName('validar2');
    var val = true;
    for (let i = 0; i < inputs.length; i++) {
        if ((inputs[i].type == 'email' || inputs[i].type == 'text') && inputs[i].value == '') {
            inputs[i].style.borderColor = 'red';
            val = false;

        } else if ((inputs[i].type == 'email' || inputs[i].type == 'text') && inputs[i].value !== '') {
            inputs[i].style.borderColor = 'white';
            val = true;
        }
    }
    insertarRestaurante();
    return false;
}*/