'use strict';

var MILISEGUNDOS_OCULTAR_CARTAS = 1000;
var PUNTOS_POR_PAR = 100;
var PUNTOS_BONUS_PARTIDA = 300;
var PUNTOS_POR_SEGUNDO_PENALIZACION = 1;

var estadoJuego = {
    nombreJugador: '',
    nivel: '',
    cartas: [],
    primeraCarta: null,
    segundaCarta: null,
    tableroBloqueado: true,
    intentos: 0,
    aciertos: 0,
    errores: 0,
    puntaje: 0,
    segundos: 0,
    partidaIniciada: false,
    partidaTerminada: false
};

function mezclarCartas(cartas) {
    var indice;
    var aleatorio;
    var temporal;
    for (indice = cartas.length - 1; indice > 0; indice--) {
        aleatorio = Math.floor(Math.random() * (indice + 1));
        temporal = cartas[indice];
        cartas[indice] = cartas[aleatorio];
        cartas[aleatorio] = temporal;
    }
    return cartas;
}

function reiniciarEstadoJuego(nombreJugador, nivel, cartas) {
    estadoJuego.nombreJugador = nombreJugador;
    estadoJuego.nivel = nivel;
    estadoJuego.cartas = cartas;
    estadoJuego.primeraCarta = null;
    estadoJuego.segundaCarta = null;
    estadoJuego.tableroBloqueado = true;
    estadoJuego.intentos = 0;
    estadoJuego.aciertos = 0;
    estadoJuego.errores = 0;
    estadoJuego.puntaje = 0;
    estadoJuego.segundos = 0;
    estadoJuego.partidaIniciada = false;
    estadoJuego.partidaTerminada = false;
}

function iniciarPartida() {
    estadoJuego.partidaIniciada = true;
}

function desbloquearTablero() {
    estadoJuego.tableroBloqueado = false;
}

function bloquearTablero() {
    estadoJuego.tableroBloqueado = true;
}

function guardarCartaSeleccionada(idCarta, posicionCarta) {
    if (estadoJuego.primeraCarta === null) {
        estadoJuego.primeraCarta = { id: idCarta, posicion: posicionCarta };
        return;
    }
    estadoJuego.segundaCarta = { id: idCarta, posicion: posicionCarta };
    bloquearTablero();
}

function limpiarCartasDelTurno() {
    estadoJuego.primeraCarta = null;
    estadoJuego.segundaCarta = null;
}

function compararCartasSeleccionadas() {
    return estadoJuego.primeraCarta.id === estadoJuego.segundaCarta.id;
}

function registrarAcierto() {
    estadoJuego.intentos = estadoJuego.intentos + 1;
    estadoJuego.aciertos = estadoJuego.aciertos + 1;
    estadoJuego.puntaje = estadoJuego.puntaje + PUNTOS_POR_PAR;
}

function registrarError() {
    var penalizacion;
    penalizacion = NIVELES[estadoJuego.nivel].penalizacion;
    estadoJuego.intentos = estadoJuego.intentos + 1;
    estadoJuego.errores = estadoJuego.errores + 1;
    estadoJuego.puntaje = estadoJuego.puntaje - penalizacion;
    if (estadoJuego.puntaje < 0) {
        estadoJuego.puntaje = 0;
    }
}

function incrementarSegundo() {
    estadoJuego.segundos = estadoJuego.segundos + 1;
}

function partidaCompleta() {
    return estadoJuego.aciertos === NIVELES[estadoJuego.nivel].pares;
}

function calcularPuntajeFinal() {
    var puntajeFinal;
    puntajeFinal = estadoJuego.puntaje + PUNTOS_BONUS_PARTIDA - (estadoJuego.segundos * PUNTOS_POR_SEGUNDO_PENALIZACION);
    if (puntajeFinal < 0) {
        puntajeFinal = 0;
    }
    return puntajeFinal;
}

function aplicarPuntajeFinal() {
    estadoJuego.puntaje = calcularPuntajeFinal();
}

function finalizarPartida() {
    aplicarPuntajeFinal();
    estadoJuego.partidaTerminada = true;
    bloquearTablero();
}
