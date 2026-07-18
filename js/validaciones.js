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

var LARGO_MINIMO_MENSAJE = 5;
var EXPRESION_NOMBRE = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ ]+$/;
var EXPRESION_MAIL = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function validarNombreContacto(nombre) {
    var nombreLimpio;
    nombreLimpio = nombre.trim();
    if (nombreLimpio.length === 0) {
        return 'Ingresá tu nombre.';
    }
    if (EXPRESION_NOMBRE.test(nombreLimpio) === false) {
        return 'El nombre solo puede tener letras, números y espacios.';
    }
    return '';
}

function validarMail(mail) {
    var mailLimpio;
    mailLimpio = mail.trim();
    if (mailLimpio.length === 0) {
        return 'Ingresá tu mail.';
    }
    if (EXPRESION_MAIL.test(mailLimpio) === false) {
        return 'Ingresá un mail válido, por ejemplo nombre@dominio.com';
    }
    return '';
}

function validarMensaje(mensaje) {
    var mensajeLimpio;
    mensajeLimpio = mensaje.trim();
    if (mensajeLimpio.length === 0) {
        return 'Ingresá un mensaje.';
    }
    if (mensajeLimpio.length <= LARGO_MINIMO_MENSAJE) {
        return 'El mensaje debe tener más de ' + LARGO_MINIMO_MENSAJE + ' caracteres.';
    }
    return '';
}
