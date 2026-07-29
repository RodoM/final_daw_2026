'use strict';

var SONIDOS = {
    seleccionar: new Audio('assets/sounds/seleccionar.wav'),
    acierto: new Audio('assets/sounds/acierto.mp3'),
    error: new Audio('assets/sounds/error.wav'),
    victoria: new Audio('assets/sounds/victoria.mp3')
};

var sonidosActivados;
var botonSonido;

function ignorarErrorDeReproduccion(error) {
    return;
}

function reproducirSonido(nombreSonido) {
    var audio;
    if (sonidosActivados === false) {
        return;
    }
    audio = SONIDOS[nombreSonido];
    audio.currentTime = 0;
    audio.play().catch(ignorarErrorDeReproduccion);
}

function actualizarTextoBotonSonido() {
    if (sonidosActivados === true) {
        botonSonido.textContent = 'Sonido activado';
        return;
    }
    botonSonido.textContent = 'Sonido desactivado';
}

function alHacerClickEnBotonSonido(evento) {
    sonidosActivados = !sonidosActivados;
    guardarSonidosActivados(sonidosActivados);
    actualizarTextoBotonSonido();
}

function iniciarSonidos() {
    botonSonido = document.getElementById('boton-sonido');
    sonidosActivados = obtenerSonidosActivados();
    actualizarTextoBotonSonido();
    botonSonido.addEventListener('click', alHacerClickEnBotonSonido);
}
