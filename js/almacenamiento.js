'use strict';

var CLAVE_PARTIDAS = 'memotest-partidas';
var LIMITE_PARTIDAS_GUARDADAS = 50;

function obtenerPartidas() {
    var textoGuardado;
    textoGuardado = localStorage.getItem(CLAVE_PARTIDAS);
    if (textoGuardado === null) {
        return [];
    }
    try {
        return JSON.parse(textoGuardado);
    } catch (error) {
        return [];
    }
}

function guardarPartida(partida) {
    var partidas;
    partidas = obtenerPartidas();
    partidas.push(partida);
    if (partidas.length > LIMITE_PARTIDAS_GUARDADAS) {
        partidas = partidas.slice(partidas.length - LIMITE_PARTIDAS_GUARDADAS);
    }
    localStorage.setItem(CLAVE_PARTIDAS, JSON.stringify(partidas));
}

function borrarPartidas() {
    localStorage.removeItem(CLAVE_PARTIDAS);
}

var CLAVE_TEMA = 'memotest-tema';

function obtenerTema() {
    var temaGuardado;
    temaGuardado = localStorage.getItem(CLAVE_TEMA);
    if (temaGuardado === null) {
        return 'claro';
    }
    return temaGuardado;
}

function guardarTema(tema) {
    localStorage.setItem(CLAVE_TEMA, tema);
}

var CLAVE_SONIDOS = 'memotest-sonidos';

function obtenerSonidosActivados() {
    var valorGuardado;
    valorGuardado = localStorage.getItem(CLAVE_SONIDOS);
    if (valorGuardado === null) {
        return true;
    }
    return valorGuardado === 'activado';
}

function guardarSonidosActivados(sonidosActivados) {
    if (sonidosActivados === true) {
        localStorage.setItem(CLAVE_SONIDOS, 'activado');
        return;
    }
    localStorage.setItem(CLAVE_SONIDOS, 'desactivado');
}
