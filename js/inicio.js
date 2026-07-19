'use strict';

var formularioInicio;
var campoNombre;
var campoNivel;
var mensajeErrorInicio;
var pantallaInicio;
var pantallaJuego;
var tableroElemento;
var botonReiniciar;
var botonVolverInicio;
var marcadorIntentos;
var marcadorPares;
var marcadorErrores;
var marcadorPuntaje;
var marcadorTiempo;
var modalVictoria;
var modalContenidoVictoria;
var resultadoNombre;
var resultadoNivel;
var resultadoIntentos;
var resultadoErrores;
var resultadoTiempo;
var resultadoPuntaje;
var botonJugarDeNuevo;
var botonCerrarModal;

function iniciarAplicacion() {
    formularioInicio = document.getElementById('formulario-inicio');
    campoNombre = document.getElementById('nombre-jugador');
    campoNivel = document.getElementById('nivel');
    mensajeErrorInicio = document.getElementById('error-inicio');
    pantallaInicio = document.getElementById('pantalla-inicio');
    pantallaJuego = document.getElementById('pantalla-juego');
    tableroElemento = document.getElementById('tablero');
    botonReiniciar = document.getElementById('boton-reiniciar');
    botonVolverInicio = document.getElementById('boton-volver-inicio');
    marcadorIntentos = document.getElementById('marcador-intentos');
    marcadorPares = document.getElementById('marcador-pares');
    marcadorErrores = document.getElementById('marcador-errores');
    marcadorPuntaje = document.getElementById('marcador-puntaje');
    marcadorTiempo = document.getElementById('marcador-tiempo');
    modalVictoria = document.getElementById('modal-victoria');
    modalContenidoVictoria = document.getElementById('modal-contenido-victoria');
    resultadoNombre = document.getElementById('resultado-nombre');
    resultadoNivel = document.getElementById('resultado-nivel');
    resultadoIntentos = document.getElementById('resultado-intentos');
    resultadoErrores = document.getElementById('resultado-errores');
    resultadoTiempo = document.getElementById('resultado-tiempo');
    resultadoPuntaje = document.getElementById('resultado-puntaje');
    botonJugarDeNuevo = document.getElementById('boton-jugar-de-nuevo');
    botonCerrarModal = document.getElementById('boton-cerrar-modal');
    registrarEventos();
    iniciarRanking();
}

iniciarAplicacion();
