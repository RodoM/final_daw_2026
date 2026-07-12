'use strict';

function alEnviarFormularioInicio(evento) {
    var errorNombre;
    var errorNivel;
    var cartas;
    evento.preventDefault();
    errorNombre = validarNombreJugador(campoNombre.value);
    if (errorNombre !== '') {
        mostrarErrorInicio(errorNombre);
        return;
    }
    errorNivel = validarNivel(campoNivel.value);
    if (errorNivel !== '') {
        mostrarErrorInicio(errorNivel);
        return;
    }
    nombreJugador = campoNombre.value.trim();
    nivelElegido = campoNivel.value;
    cartas = obtenerCartasDelNivel(nivelElegido);
    if (errorCartas !== '') {
        mostrarErrorInicio(errorCartas);
        return;
    }
    ocultarErrorInicio();
    cartas = mezclarCartas(cartas);
    dibujarTablero(cartas, nivelElegido);
    mostrarPantallaJuego();
}

function registrarEventos() {
    formularioInicio.addEventListener('submit', alEnviarFormularioInicio);
}
