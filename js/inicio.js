'use strict';

var formularioInicio;
var campoNombre;
var campoNivel;
var mensajeErrorInicio;
var pantallaInicio;
var pantallaJuego;
var nombreJugador;
var nivelElegido;

function iniciarAplicacion() {
    formularioInicio = document.getElementById('formulario-inicio');
    campoNombre = document.getElementById('nombre-jugador');
    campoNivel = document.getElementById('nivel');
    mensajeErrorInicio = document.getElementById('error-inicio');
    pantallaInicio = document.getElementById('pantalla-inicio');
    pantallaJuego = document.getElementById('pantalla-juego');
    registrarEventos();
}

iniciarAplicacion();
