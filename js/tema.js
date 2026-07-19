'use strict';

var CLASE_TEMA_OSCURO = 'tema-oscuro';
var botonTema;

function aplicarTemaGuardado() {
    var temaGuardado;
    temaGuardado = obtenerTema();
    if (temaGuardado === 'oscuro') {
        document.documentElement.classList.add(CLASE_TEMA_OSCURO);
    }
}

function actualizarTextoBotonTema() {
    if (document.documentElement.classList.contains(CLASE_TEMA_OSCURO)) {
        botonTema.textContent = 'Modo claro';
        return;
    }
    botonTema.textContent = 'Modo oscuro';
}

function alHacerClickEnBotonTema(evento) {
    if (document.documentElement.classList.contains(CLASE_TEMA_OSCURO)) {
        document.documentElement.classList.remove(CLASE_TEMA_OSCURO);
        guardarTema('claro');
    } else {
        document.documentElement.classList.add(CLASE_TEMA_OSCURO);
        guardarTema('oscuro');
    }
    actualizarTextoBotonTema();
}

function iniciarTema() {
    botonTema = document.getElementById('boton-tema');
    actualizarTextoBotonTema();
    botonTema.addEventListener('click', alHacerClickEnBotonTema);
}

aplicarTemaGuardado();
