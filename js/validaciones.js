'use strict';

var LARGO_MINIMO_NOMBRE = 3;

function validarNombreJugador(nombre) {
    var nombreLimpio;
    nombreLimpio = nombre.trim();
    if (nombreLimpio.length === 0) {
        return 'Ingresá tu nombre para comenzar.';
    }
    if (nombreLimpio.length < LARGO_MINIMO_NOMBRE) {
        return 'El nombre debe tener al menos 3 caracteres.';
    }
    return '';
}

function validarNivel(nivel) {
    if (nivel === '') {
        return 'Elegí un nivel de dificultad.';
    }
    return '';
}
