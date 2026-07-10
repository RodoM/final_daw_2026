'use strict';

function mostrarErrorInicio(mensaje) {
    mensajeErrorInicio.textContent = mensaje;
    mensajeErrorInicio.classList.remove('oculto');
}

function ocultarErrorInicio() {
    mensajeErrorInicio.textContent = '';
    mensajeErrorInicio.classList.add('oculto');
}

function mostrarPantallaJuego() {
    pantallaInicio.classList.add('oculto');
    pantallaJuego.classList.remove('oculto');
}
