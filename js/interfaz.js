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

function mostrarPantallaInicio() {
    pantallaJuego.classList.add('oculto');
    pantallaInicio.classList.remove('oculto');
}

function precargarFormularioInicio() {
    campoNombre.value = estadoJuego.nombreJugador;
    campoNivel.value = estadoJuego.nivel;
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
        boton.addEventListener('click', alHacerClickEnCarta);
        tableroElemento.appendChild(boton);
    }
}

function mostrarCartaDescubierta(carta) {
    carta.classList.add('carta--descubierta');
}

function marcarCartasAcertadas(primeraCarta, segundaCarta) {
    primeraCarta.classList.add('carta--acertada');
    segundaCarta.classList.add('carta--acertada');
}

function marcarCartasConError(primeraCarta, segundaCarta) {
    primeraCarta.classList.add('carta--error');
    segundaCarta.classList.add('carta--error');
}

function ocultarCartas(primeraCarta, segundaCarta) {
    primeraCarta.classList.remove('carta--descubierta');
    primeraCarta.classList.remove('carta--error');
    segundaCarta.classList.remove('carta--descubierta');
    segundaCarta.classList.remove('carta--error');
}

function formatearTiempo(segundosTotales) {
    var minutos;
    var segundos;
    var minutosTexto;
    var segundosTexto;
    minutos = Math.floor(segundosTotales / 60);
    segundos = segundosTotales % 60;
    if (minutos < 10) {
        minutosTexto = '0' + minutos;
    } else {
        minutosTexto = '' + minutos;
    }
    if (segundos < 10) {
        segundosTexto = '0' + segundos;
    } else {
        segundosTexto = '' + segundos;
    }
    return minutosTexto + ':' + segundosTexto;
}

function actualizarMarcadores() {
    marcadorNivel.textContent = NIVELES[estadoJuego.nivel].nombre;
    marcadorIntentos.textContent = estadoJuego.intentos;
    marcadorPares.textContent = estadoJuego.aciertos;
    marcadorErrores.textContent = estadoJuego.errores;
    marcadorPuntaje.textContent = estadoJuego.puntaje;
    marcadorTiempo.textContent = formatearTiempo(estadoJuego.segundos);
}

function mostrarModalVictoria() {
    resultadoNombre.textContent = estadoJuego.nombreJugador;
    resultadoNivel.textContent = NIVELES[estadoJuego.nivel].nombre;
    resultadoIntentos.textContent = estadoJuego.intentos;
    resultadoErrores.textContent = estadoJuego.errores;
    resultadoTiempo.textContent = formatearTiempo(estadoJuego.segundos);
    resultadoPuntaje.textContent = estadoJuego.puntaje;
    desglosePares.textContent = '+' + estadoJuego.desglosePuntaje.porPares;
    desgloseBonusRacha.textContent = '+' + estadoJuego.desglosePuntaje.bonusRacha;
    desglosePenalizacionErrores.textContent = '-' + estadoJuego.desglosePuntaje.penalizacionErrores;
    desgloseBonusRapidez.textContent = '+' + estadoJuego.desglosePuntaje.bonusRapidez;
    desgloseBonusIntentos.textContent = '+' + estadoJuego.desglosePuntaje.bonusPocosIntentos;
    desgloseBonusFinalizar.textContent = '+' + estadoJuego.desglosePuntaje.bonusFinalizar;
    desglosePenalizacionTiempo.textContent = '-' + estadoJuego.desglosePuntaje.penalizacionTiempo;
    modalVictoria.classList.remove('oculto');
    modalContenidoVictoria.focus();
}

function ocultarModalVictoria() {
    modalVictoria.classList.add('oculto');
}

function mostrarModalNivelCompletado() {
    nivelCompletadoNombre.textContent = NIVELES[estadoJuego.nivel].nombre;
    nivelCompletadoPuntaje.textContent = estadoJuego.puntaje;
    modalNivelCompletado.classList.remove('oculto');
    modalContenidoNivelCompletado.focus();
}

function ocultarModalNivelCompletado() {
    modalNivelCompletado.classList.add('oculto');
}

function mostrarModalResultadoProgresivo() {
    resultadoProgresivoNombre.textContent = estadoJuego.nombreJugador;
    resultadoProgresivoIntentos.textContent = estadoJuego.intentosAcumuladosProgresivo;
    resultadoProgresivoErrores.textContent = estadoJuego.erroresAcumuladosProgresivo;
    resultadoProgresivoTiempo.textContent = formatearTiempo(estadoJuego.segundosAcumuladosProgresivo);
    resultadoProgresivoPuntaje.textContent = estadoJuego.puntaje;
    modalResultadoProgresivo.classList.remove('oculto');
    modalContenidoResultadoProgresivo.focus();
}

function ocultarModalResultadoProgresivo() {
    modalResultadoProgresivo.classList.add('oculto');
}
