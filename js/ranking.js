'use strict';

var ORDEN_NIVEL_RANKING = { facil: 1, medio: 2, dificil: 3, progresivo: 4 };

var modalRanking;
var modalContenidoRanking;
var selectOrdenRanking;
var mensajeSinPartidas;
var tablaRanking;
var cuerpoTablaRanking;
var botonRanking;
var botonCerrarRanking;
var botonBorrarRanking;
var modalConfirmarBorrado;
var modalContenidoConfirmarBorrado;
var botonConfirmarBorrado;
var botonCancelarBorrado;

function obtenerNombreNivelRanking(nivel) {
    if (nivel === 'progresivo') {
        return 'Progresivo';
    }
    return NIVELES[nivel].nombre;
}

function formatearFechaRanking(fechaTexto) {
    var fecha;
    fecha = new Date(fechaTexto);
    return fecha.toLocaleDateString() + ' ' + fecha.toLocaleTimeString();
}

function compararPorPuntaje(partidaA, partidaB) {
    return partidaB.puntaje - partidaA.puntaje;
}

function compararPorFecha(partidaA, partidaB) {
    if (partidaA.fecha > partidaB.fecha) {
        return -1;
    }
    if (partidaA.fecha < partidaB.fecha) {
        return 1;
    }
    return 0;
}

function compararPorDuracion(partidaA, partidaB) {
    return partidaA.duracion - partidaB.duracion;
}

function compararPorNivel(partidaA, partidaB) {
    return ORDEN_NIVEL_RANKING[partidaA.nivel] - ORDEN_NIVEL_RANKING[partidaB.nivel];
}

function ordenarPartidas(partidas, criterioOrden) {
    var partidasOrdenadas;
    partidasOrdenadas = partidas.slice();
    if (criterioOrden === 'fecha') {
        partidasOrdenadas.sort(compararPorFecha);
        return partidasOrdenadas;
    }
    if (criterioOrden === 'duracion') {
        partidasOrdenadas.sort(compararPorDuracion);
        return partidasOrdenadas;
    }
    if (criterioOrden === 'nivel') {
        partidasOrdenadas.sort(compararPorNivel);
        return partidasOrdenadas;
    }
    partidasOrdenadas.sort(compararPorPuntaje);
    return partidasOrdenadas;
}

function crearCeldaRanking(texto) {
    var celda;
    celda = document.createElement('td');
    celda.textContent = texto;
    return celda;
}

function crearFilaRanking(partida) {
    var fila;
    fila = document.createElement('tr');
    fila.appendChild(crearCeldaRanking(partida.nombre));
    fila.appendChild(crearCeldaRanking(obtenerNombreNivelRanking(partida.nivel)));
    fila.appendChild(crearCeldaRanking(partida.puntaje));
    fila.appendChild(crearCeldaRanking(partida.intentos));
    fila.appendChild(crearCeldaRanking(partida.errores));
    fila.appendChild(crearCeldaRanking(formatearTiempo(partida.duracion)));
    fila.appendChild(crearCeldaRanking(formatearFechaRanking(partida.fecha)));
    return fila;
}

function dibujarTablaRanking() {
    var partidas;
    var partidasOrdenadas;
    var indice;
    var fila;
    partidas = obtenerPartidas();
    cuerpoTablaRanking.innerHTML = '';
    if (partidas.length === 0) {
        tablaRanking.classList.add('oculto');
        mensajeSinPartidas.classList.remove('oculto');
        return;
    }
    tablaRanking.classList.remove('oculto');
    mensajeSinPartidas.classList.add('oculto');
    partidasOrdenadas = ordenarPartidas(partidas, selectOrdenRanking.value);
    for (indice = 0; indice < partidasOrdenadas.length; indice++) {
        fila = crearFilaRanking(partidasOrdenadas[indice]);
        cuerpoTablaRanking.appendChild(fila);
    }
}

function mostrarModalRanking() {
    dibujarTablaRanking();
    modalRanking.classList.remove('oculto');
    modalContenidoRanking.focus();
}

function ocultarModalRanking() {
    modalRanking.classList.add('oculto');
}

function mostrarModalConfirmarBorrado() {
    modalConfirmarBorrado.classList.remove('oculto');
    modalContenidoConfirmarBorrado.focus();
}

function ocultarModalConfirmarBorrado() {
    modalConfirmarBorrado.classList.add('oculto');
}

function alHacerClickEnBotonRanking(evento) {
    mostrarModalRanking();
}

function alHacerClickEnCerrarRanking(evento) {
    ocultarModalRanking();
}

function alCambiarOrdenRanking(evento) {
    dibujarTablaRanking();
}

function alHacerClickEnBorrarRanking(evento) {
    mostrarModalConfirmarBorrado();
}

function alHacerClickEnConfirmarBorrado(evento) {
    borrarPartidas();
    dibujarTablaRanking();
    ocultarModalConfirmarBorrado();
}

function alHacerClickEnCancelarBorrado(evento) {
    ocultarModalConfirmarBorrado();
}

function alHacerClickFueraDelModalRanking(evento) {
    if (evento.target === modalRanking) {
        ocultarModalRanking();
    }
}

function alHacerClickFueraDelModalConfirmarBorrado(evento) {
    if (evento.target === modalConfirmarBorrado) {
        ocultarModalConfirmarBorrado();
    }
}

function alPresionarTeclaEnRanking(evento) {
    if (evento.key !== 'Escape') {
        return;
    }
    if (modalConfirmarBorrado.classList.contains('oculto') === false) {
        ocultarModalConfirmarBorrado();
        return;
    }
    if (modalRanking.classList.contains('oculto') === false) {
        ocultarModalRanking();
    }
}

function registrarEventosRanking() {
    botonRanking.addEventListener('click', alHacerClickEnBotonRanking);
    botonCerrarRanking.addEventListener('click', alHacerClickEnCerrarRanking);
    selectOrdenRanking.addEventListener('change', alCambiarOrdenRanking);
    botonBorrarRanking.addEventListener('click', alHacerClickEnBorrarRanking);
    botonConfirmarBorrado.addEventListener('click', alHacerClickEnConfirmarBorrado);
    botonCancelarBorrado.addEventListener('click', alHacerClickEnCancelarBorrado);
    modalRanking.addEventListener('click', alHacerClickFueraDelModalRanking);
    modalConfirmarBorrado.addEventListener('click', alHacerClickFueraDelModalConfirmarBorrado);
    document.addEventListener('keydown', alPresionarTeclaEnRanking);
}

function iniciarRanking() {
    modalRanking = document.getElementById('modal-ranking');
    modalContenidoRanking = document.getElementById('modal-contenido-ranking');
    selectOrdenRanking = document.getElementById('orden-ranking');
    mensajeSinPartidas = document.getElementById('mensaje-sin-partidas');
    tablaRanking = document.getElementById('tabla-ranking');
    cuerpoTablaRanking = document.getElementById('cuerpo-tabla-ranking');
    botonRanking = document.getElementById('boton-ranking');
    botonCerrarRanking = document.getElementById('boton-cerrar-ranking');
    botonBorrarRanking = document.getElementById('boton-borrar-ranking');
    modalConfirmarBorrado = document.getElementById('modal-confirmar-borrado');
    modalContenidoConfirmarBorrado = document.getElementById('modal-contenido-confirmar-borrado');
    botonConfirmarBorrado = document.getElementById('boton-confirmar-borrado');
    botonCancelarBorrado = document.getElementById('boton-cancelar-borrado');
    registrarEventosRanking();
}
