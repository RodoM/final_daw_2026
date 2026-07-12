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

function dibujarTablero(cartas, nivel) {
    var indice;
    var boton;
    var imagen;
    var dorso;
    tableroElemento.innerHTML = '';
    tableroElemento.className = 'tablero';
    tableroElemento.classList.add('tablero--' + nivel);
    for (indice = 0; indice < cartas.length; indice++) {
        boton = document.createElement('button');
        boton.setAttribute('type', 'button');
        boton.classList.add('carta');
        boton.setAttribute('data-id', cartas[indice].id);
        boton.setAttribute('data-posicion', indice);

        imagen = document.createElement('img');
        imagen.classList.add('carta-imagen');
        imagen.src = cartas[indice].imagen;
        imagen.alt = cartas[indice].nombre;

        dorso = document.createElement('div');
        dorso.classList.add('carta-dorso');
        dorso.textContent = '?';

        boton.appendChild(imagen);
        boton.appendChild(dorso);
        tableroElemento.appendChild(boton);
    }
}
