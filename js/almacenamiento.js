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
