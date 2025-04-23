var url= "https://pgbackend-jugadores.onrender.com/api/jugador";

function postJugador() {
    const myJugador = {
        nombre: $('#nombre').val(),
        posicion: $('#posicion').val(),
        edad: $('#edad').val(),
        team: $('#team').val(),
        goles: $('#goles').val(),
        asistencias: $('#asistencias').val()
    };

    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(myJugador),
        success: function (data) {
            $('#resultado').html('Jugador creado: ' + JSON.stringify(data.jugador));
        },
        error: function (xhr) {
            $('#resultado').html('Error al crear jugador: ' + xhr.responseText);
        }
    });
}

// Obtener todos los jugadores (GET)
function getJugadores() {
    $.getJSON(url, function (json) {
        const arrJugadores = json.jugadores;
        let htmlTable = '<table border="1"><tr><th>ID</th><th>Nombre</th><th>Posición</th><th>Edad</th><th>Equipo</th><th>Goles</th><th>Asistencias</th></tr>';

        arrJugadores.forEach(item => {
            htmlTable += `<tr>
                <td>${item.id}</td>
                <td>${item.nombre}</td>
                <td>${item.posicion}</td>
                <td>${item.edad}</td>
                <td>${item.team}</td>
                <td>${item.goles}</td>
                <td>${item.asistencias}</td>
            </tr>`;
        });

        htmlTable += '</table>';
        $('#resultado').html(htmlTable);
    }).fail(function () {
        $('#resultado').html('Error al obtener jugadores.');
    });
}

// Obtener jugador por ID (GET)
function getJugadoresById() {
    const id = $('#jugadorId').val();
    if (!id) return alert('Ingresa un ID válido.');

    $.ajax({
        url: `${url}/${id}`,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            const jugador = data.jugador;
            const htmlTable = `<table border="1">
                <tr><th>ID</th><th>Nombre</th><th>Posición</th><th>Edad</th><th>Equipo</th><th>Goles</th><th>Asistencias</th></tr>
                <tr>
                    <td>${jugador.id}</td>
                    <td>${jugador.nombre}</td>
                    <td>${jugador.posicion}</td>
                    <td>${jugador.edad}</td>
                    <td>${jugador.team}</td>
                    <td>${jugador.goles}</td>
                    <td>${jugador.asistencias}</td>
                </tr>
            </table>`;
            $('#resultado').html(htmlTable);
        },
        error: function () {
            $('#resultado').html('Jugador no encontrado.');
        }
    });
}

// Actualizar jugador (PUT)
function updateJugador() {
    const id = $('#jugadorId').val();
    if (!id) return alert('Ingresa el ID del jugador a actualizar.');

    const updatedJugador = {
        nombre: $('#nombre').val(),
        posicion: $('#posicion').val(),
        edad: $('#edad').val(),
        team: $('#team').val(),
        goles: $('#goles').val(),
        asistencias: $('#asistencias').val()
    };

    $.ajax({
        url: `${url}/${id}`,
        method: 'PUT',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(updatedJugador),
        success: function (data) {
            $('#resultado').html('Jugador actualizado: ' + JSON.stringify(data.updated));
        },
        error: function (xhr) {
            $('#resultado').html('Error al actualizar: ' + xhr.responseText);
        }
    });
}

// Eliminar jugador (DELETE)
function deleteJugador() {
    const id = $('#jugadorId').val();
    if (!id) return alert('Ingresa el ID del jugador a eliminar.');

    $.ajax({
        url: `${url}/${id}`,
        method: 'DELETE',
        dataType: 'json',
        success: function (data) {
            $('#resultado').html('Jugador eliminado: ' + JSON.stringify(data));
        },
        error: function (xhr) {
            $('#resultado').html('Error al eliminar: ' + xhr.responseText);
        }
    });
}
