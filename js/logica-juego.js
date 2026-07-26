'use strict';

var MILISEGUNDOS_OCULTAR_CARTAS = 1000;
var PUNTOS_POR_PAR = 100;
var PUNTOS_BONUS_PARTIDA = 300;
var PUNTOS_POR_SEGUNDO_PENALIZACION = 1;
var UMBRAL_RACHA = 3;
var BONUS_RACHA = 20;
var PENALIZACION_EXTRA_ERROR_SEGUIDO = 5;
var BONUS_POCOS_INTENTOS = 100;
var MARGEN_INTENTOS_POCOS = 2;
var BONUS_RAPIDEZ = 100;
var TIEMPOS_LIMITE_RAPIDEZ = { facil: 60, medio: 90, dificil: 150 };
var NIVELES_PROGRESIVO = ['facil', 'medio', 'dificil'];

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
    rachaActual: 0,
    erroresSeguidos: 0,
    partidaIniciada: false,
    partidaTerminada: false,
    modoProgresivo: false,
    indiceNivelProgresivo: 0,
    intentosAcumuladosProgresivo: 0,
    erroresAcumuladosProgresivo: 0,
    segundosAcumuladosProgresivo: 0,
    desglosePuntaje: {
        porPares: 0,
        bonusRacha: 0,
        penalizacionErrores: 0,
        bonusRapidez: 0,
        bonusPocosIntentos: 0,
        bonusFinalizar: 0,
        penalizacionTiempo: 0
    }
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

function crearDesglosePuntajeVacio() {
    return {
        porPares: 0,
        bonusRacha: 0,
        penalizacionErrores: 0,
        bonusRapidez: 0,
        bonusPocosIntentos: 0,
        bonusFinalizar: 0,
        penalizacionTiempo: 0
    };
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
    estadoJuego.rachaActual = 0;
    estadoJuego.erroresSeguidos = 0;
    estadoJuego.partidaIniciada = false;
    estadoJuego.partidaTerminada = false;
    estadoJuego.modoProgresivo = false;
    estadoJuego.indiceNivelProgresivo = 0;
    estadoJuego.intentosAcumuladosProgresivo = 0;
    estadoJuego.erroresAcumuladosProgresivo = 0;
    estadoJuego.segundosAcumuladosProgresivo = 0;
    estadoJuego.desglosePuntaje = crearDesglosePuntajeVacio();
}

function prepararSiguienteNivelProgresivo(nivel, cartas) {
    estadoJuego.nivel = nivel;
    estadoJuego.cartas = cartas;
    estadoJuego.primeraCarta = null;
    estadoJuego.segundaCarta = null;
    estadoJuego.tableroBloqueado = true;
    estadoJuego.intentos = 0;
    estadoJuego.aciertos = 0;
    estadoJuego.errores = 0;
    estadoJuego.segundos = 0;
    estadoJuego.rachaActual = 0;
    estadoJuego.erroresSeguidos = 0;
    estadoJuego.partidaIniciada = false;
    estadoJuego.partidaTerminada = false;
    estadoJuego.desglosePuntaje = crearDesglosePuntajeVacio();
}

function iniciarModoProgresivo() {
    estadoJuego.modoProgresivo = true;
    estadoJuego.indiceNivelProgresivo = 0;
}

function nivelActualProgresivo() {
    return NIVELES_PROGRESIVO[estadoJuego.indiceNivelProgresivo];
}

function quedanNivelesProgresivo() {
    return estadoJuego.indiceNivelProgresivo < NIVELES_PROGRESIVO.length - 1;
}

function avanzarNivelProgresivo() {
    estadoJuego.indiceNivelProgresivo = estadoJuego.indiceNivelProgresivo + 1;
}

function acumularEstadisticasNivelProgresivo() {
    estadoJuego.intentosAcumuladosProgresivo = estadoJuego.intentosAcumuladosProgresivo + estadoJuego.intentos;
    estadoJuego.erroresAcumuladosProgresivo = estadoJuego.erroresAcumuladosProgresivo + estadoJuego.errores;
    estadoJuego.segundosAcumuladosProgresivo = estadoJuego.segundosAcumuladosProgresivo + estadoJuego.segundos;
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
    estadoJuego.rachaActual = estadoJuego.rachaActual + 1;
    estadoJuego.erroresSeguidos = 0;
    estadoJuego.puntaje = estadoJuego.puntaje + PUNTOS_POR_PAR;
    estadoJuego.desglosePuntaje.porPares = estadoJuego.desglosePuntaje.porPares + PUNTOS_POR_PAR;
    if (estadoJuego.rachaActual >= UMBRAL_RACHA) {
        estadoJuego.puntaje = estadoJuego.puntaje + BONUS_RACHA;
        estadoJuego.desglosePuntaje.bonusRacha = estadoJuego.desglosePuntaje.bonusRacha + BONUS_RACHA;
    }
}

function registrarError() {
    var penalizacion;
    var puntajeAntesDelError;
    estadoJuego.intentos = estadoJuego.intentos + 1;
    estadoJuego.errores = estadoJuego.errores + 1;
    estadoJuego.rachaActual = 0;
    estadoJuego.erroresSeguidos = estadoJuego.erroresSeguidos + 1;
    penalizacion = NIVELES[estadoJuego.nivel].penalizacion;
    penalizacion = penalizacion + (estadoJuego.erroresSeguidos - 1) * PENALIZACION_EXTRA_ERROR_SEGUIDO;
    puntajeAntesDelError = estadoJuego.puntaje;
    estadoJuego.puntaje = estadoJuego.puntaje - penalizacion;
    if (estadoJuego.puntaje < 0) {
        estadoJuego.puntaje = 0;
    }
    estadoJuego.desglosePuntaje.penalizacionErrores = estadoJuego.desglosePuntaje.penalizacionErrores + (puntajeAntesDelError - estadoJuego.puntaje);
}

function incrementarSegundo() {
    estadoJuego.segundos = estadoJuego.segundos + 1;
}

function partidaCompleta() {
    return estadoJuego.aciertos === NIVELES[estadoJuego.nivel].pares;
}

function calcularBonusRapidez() {
    var tiempoLimite;
    tiempoLimite = TIEMPOS_LIMITE_RAPIDEZ[estadoJuego.nivel];
    if (estadoJuego.segundos <= tiempoLimite) {
        return BONUS_RAPIDEZ;
    }
    return 0;
}

function calcularBonusPocosIntentos() {
    var intentosMinimos;
    intentosMinimos = NIVELES[estadoJuego.nivel].pares + MARGEN_INTENTOS_POCOS;
    if (estadoJuego.intentos <= intentosMinimos) {
        return BONUS_POCOS_INTENTOS;
    }
    return 0;
}

function calcularPuntajeFinal() {
    var puntajeFinal;
    var penalizacionTiempo;
    var bonusRapidez;
    var bonusPocosIntentos;
    penalizacionTiempo = estadoJuego.segundos * PUNTOS_POR_SEGUNDO_PENALIZACION;
    bonusRapidez = calcularBonusRapidez();
    bonusPocosIntentos = calcularBonusPocosIntentos();
    puntajeFinal = estadoJuego.puntaje + PUNTOS_BONUS_PARTIDA - penalizacionTiempo + bonusRapidez + bonusPocosIntentos;
    if (puntajeFinal < 0) {
        puntajeFinal = 0;
    }
    estadoJuego.desglosePuntaje.bonusFinalizar = PUNTOS_BONUS_PARTIDA;
    estadoJuego.desglosePuntaje.penalizacionTiempo = penalizacionTiempo;
    estadoJuego.desglosePuntaje.bonusRapidez = bonusRapidez;
    estadoJuego.desglosePuntaje.bonusPocosIntentos = bonusPocosIntentos;
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
