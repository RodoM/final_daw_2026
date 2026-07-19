'use strict';

var CORREO_DESTINO_CONTACTO = 'rodomeroi@gmail.com';

var formularioContacto;
var campoNombreContacto;
var campoMailContacto;
var campoMensajeContacto;
var errorNombreContacto;
var errorMailContacto;
var errorMensajeContacto;

function mostrarErrorCampoContacto(elementoError, mensaje) {
    elementoError.textContent = mensaje;
    elementoError.classList.remove('oculto');
}

function ocultarErrorCampoContacto(elementoError) {
    elementoError.textContent = '';
    elementoError.classList.add('oculto');
}

function armarCuerpoCorreoContacto(nombre, mail, mensaje) {
    var cuerpo;
    cuerpo = 'Nombre: ' + nombre + '\n' + 'Mail: ' + mail + '\n' + 'Mensaje: ' + mensaje;
    return cuerpo;
}

function abrirClienteCorreoContacto(nombre, mail, mensaje) {
    var asunto;
    var cuerpo;
    var enlace;
    asunto = 'Contacto desde Memotest Mundial 2026';
    cuerpo = armarCuerpoCorreoContacto(nombre, mail, mensaje);
    enlace = 'mailto:' + CORREO_DESTINO_CONTACTO + '?subject=' + encodeURIComponent(asunto) + '&body=' + encodeURIComponent(cuerpo);
    window.location.href = enlace;
}

function alEnviarFormularioContacto(evento) {
    var errorNombre;
    var errorMail;
    var errorMensaje;
    var hayErrores;
    evento.preventDefault();
    hayErrores = false;
    errorNombre = validarNombreContacto(campoNombreContacto.value);
    if (errorNombre !== '') {
        mostrarErrorCampoContacto(errorNombreContacto, errorNombre);
        hayErrores = true;
    } else {
        ocultarErrorCampoContacto(errorNombreContacto);
    }
    errorMail = validarMail(campoMailContacto.value);
    if (errorMail !== '') {
        mostrarErrorCampoContacto(errorMailContacto, errorMail);
        hayErrores = true;
    } else {
        ocultarErrorCampoContacto(errorMailContacto);
    }
    errorMensaje = validarMensaje(campoMensajeContacto.value);
    if (errorMensaje !== '') {
        mostrarErrorCampoContacto(errorMensajeContacto, errorMensaje);
        hayErrores = true;
    } else {
        ocultarErrorCampoContacto(errorMensajeContacto);
    }
    if (hayErrores === true) {
        return;
    }
    abrirClienteCorreoContacto(campoNombreContacto.value.trim(), campoMailContacto.value.trim(), campoMensajeContacto.value.trim());
}

function registrarEventosContacto() {
    formularioContacto.addEventListener('submit', alEnviarFormularioContacto);
}

function iniciarPaginaContacto() {
    formularioContacto = document.getElementById('formulario-contacto');
    campoNombreContacto = document.getElementById('nombre-contacto');
    campoMailContacto = document.getElementById('mail-contacto');
    campoMensajeContacto = document.getElementById('mensaje-contacto');
    errorNombreContacto = document.getElementById('error-nombre-contacto');
    errorMailContacto = document.getElementById('error-mail-contacto');
    errorMensajeContacto = document.getElementById('error-mensaje-contacto');
    registrarEventosContacto();
    iniciarTema();
}

iniciarPaginaContacto();
