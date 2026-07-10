'use strict';

function alEnviarFormularioInicio(evento) {
    var errorNombre;
    var errorNivel;
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
    ocultarErrorInicio();
    nombreJugador = campoNombre.value.trim();
    nivelElegido = campoNivel.value;
    mostrarPantallaJuego();
}

function registrarEventos() {
    formularioInicio.addEventListener('submit', alEnviarFormularioInicio);
}
