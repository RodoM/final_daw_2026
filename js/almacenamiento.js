'use strict';

var CLAVE_PARTIDAS = 'memotest-partidas';
var LIMITE_PARTIDAS_GUARDADAS = 50;

function obtenerPartidas() {
    var textoGuardado;
    var partidas;
    try {
        textoGuardado = localStorage.getItem(CLAVE_PARTIDAS);
    } catch (error) {
        return [];
    }
    if (textoGuardado === null) {
        return [];
    }
    try {
        partidas = JSON.parse(textoGuardado);
    } catch (error) {
        return [];
    }
    if (Array.isArray(partidas) === false) {
        return [];
    }
    return partidas;
}

function guardarPartida(partida) {
    var partidas;
    partidas = obtenerPartidas();
    partidas.push(partida);
    if (partidas.length > LIMITE_PARTIDAS_GUARDADAS) {
        partidas = partidas.slice(partidas.length - LIMITE_PARTIDAS_GUARDADAS);
    }
    try {
        localStorage.setItem(CLAVE_PARTIDAS, JSON.stringify(partidas));
    } catch (error) {
        return;
    }
}

function borrarPartidas() {
    try {
        localStorage.removeItem(CLAVE_PARTIDAS);
    } catch (error) {
        return;
    }
}

var CLAVE_TEMA = 'memotest-tema';

function obtenerTema() {
    var temaGuardado;
    try {
        temaGuardado = localStorage.getItem(CLAVE_TEMA);
    } catch (error) {
        return 'claro';
    }
    if (temaGuardado === null) {
        return 'claro';
    }
    return temaGuardado;
}

function guardarTema(tema) {
    try {
        localStorage.setItem(CLAVE_TEMA, tema);
    } catch (error) {
        return;
    }
}

var CLAVE_SONIDOS = 'memotest-sonidos';

function obtenerSonidosActivados() {
    var valorGuardado;
    try {
        valorGuardado = localStorage.getItem(CLAVE_SONIDOS);
    } catch (error) {
        return true;
    }
    if (valorGuardado === null) {
        return true;
    }
    return valorGuardado === 'activado';
}

function guardarSonidosActivados(sonidosActivados) {
    try {
        if (sonidosActivados === true) {
            localStorage.setItem(CLAVE_SONIDOS, 'activado');
            return;
        }
        localStorage.setItem(CLAVE_SONIDOS, 'desactivado');
    } catch (error) {
        return;
    }
}
