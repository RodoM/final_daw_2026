'use strict';

var elementoPrimeraCarta;
var elementoSegundaCarta;
var identificadorIntervaloTiempo;
var identificadorTimeoutOcultarCartas;

function pararTemporizadoresPendientes() {
    clearInterval(identificadorIntervaloTiempo);
    clearTimeout(identificadorTimeoutOcultarCartas);
}

function limpiarElementosDelTurno() {
    elementoPrimeraCarta = null;
    elementoSegundaCarta = null;
}

function iniciarTemporizador() {
    identificadorIntervaloTiempo = setInterval(alCumplirseUnSegundo, 1000);
}

function detenerTemporizador() {
    clearInterval(identificadorIntervaloTiempo);
}

function alCumplirseUnSegundo() {
    incrementarSegundo();
    actualizarMarcadores();
}

function terminarPartida() {
    detenerTemporizador();
    finalizarPartida();
    actualizarMarcadores();
    mostrarModalVictoria();
}

function resolverTurno() {
    var coincide;
    coincide = compararCartasSeleccionadas();
    if (coincide === true) {
        registrarAcierto();
        marcarCartasAcertadas(elementoPrimeraCarta, elementoSegundaCarta);
        limpiarCartasDelTurno();
        limpiarElementosDelTurno();
        desbloquearTablero();
        actualizarMarcadores();
        if (partidaCompleta() === true) {
            terminarPartida();
        }
        return;
    }
    registrarError();
    marcarCartasConError(elementoPrimeraCarta, elementoSegundaCarta);
    actualizarMarcadores();
    identificadorTimeoutOcultarCartas = setTimeout(alCumplirseTiempoDeOcultarCartas, MILISEGUNDOS_OCULTAR_CARTAS);
}

function alCumplirseTiempoDeOcultarCartas() {
    ocultarCartas(elementoPrimeraCarta, elementoSegundaCarta);
    limpiarCartasDelTurno();
    limpiarElementosDelTurno();
    desbloquearTablero();
}

function alHacerClickEnCarta(evento) {
    var carta;
    var idCarta;
    var posicionCarta;
    var esPrimeraCartaDelTurno;
    carta = evento.currentTarget;
    if (estadoJuego.tableroBloqueado === true) {
        return;
    }
    if (carta.classList.contains('carta--acertada')) {
        return;
    }
    posicionCarta = carta.getAttribute('data-posicion');
    if (estadoJuego.primeraCarta !== null && estadoJuego.primeraCarta.posicion === posicionCarta) {
        return;
    }
    idCarta = carta.getAttribute('data-id');
    if (estadoJuego.partidaIniciada === false) {
        iniciarPartida();
        iniciarTemporizador();
    }
    esPrimeraCartaDelTurno = estadoJuego.primeraCarta === null;
    mostrarCartaDescubierta(carta);
    guardarCartaSeleccionada(idCarta, posicionCarta);
    if (esPrimeraCartaDelTurno === true) {
        elementoPrimeraCarta = carta;
        return;
    }
    elementoSegundaCarta = carta;
    resolverTurno();
}

function reiniciarPartida() {
    var cartas;
    pararTemporizadoresPendientes();
    limpiarElementosDelTurno();
    cartas = obtenerCartasDelNivel(estadoJuego.nivel);
    cartas = mezclarCartas(cartas);
    reiniciarEstadoJuego(estadoJuego.nombreJugador, estadoJuego.nivel, cartas);
    dibujarTablero(estadoJuego.cartas, estadoJuego.nivel);
    desbloquearTablero();
    actualizarMarcadores();
    ocultarModalVictoria();
}

function alHacerClickEnReiniciar(evento) {
    reiniciarPartida();
}

function alHacerClickEnJugarDeNuevo(evento) {
    reiniciarPartida();
}

function alHacerClickEnVolverInicio(evento) {
    pararTemporizadoresPendientes();
    precargarFormularioInicio();
    mostrarPantallaInicio();
}

function alHacerClickEnCerrarModal(evento) {
    ocultarModalVictoria();
}

function alPresionarTeclaEnDocumento(evento) {
    if (evento.key !== 'Escape') {
        return;
    }
    if (modalVictoria.classList.contains('oculto')) {
        return;
    }
    ocultarModalVictoria();
}

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
    cartas = obtenerCartasDelNivel(campoNivel.value);
    if (errorCartas !== '') {
        mostrarErrorInicio(errorCartas);
        return;
    }
    ocultarErrorInicio();
    pararTemporizadoresPendientes();
    limpiarElementosDelTurno();
    cartas = mezclarCartas(cartas);
    reiniciarEstadoJuego(campoNombre.value.trim(), campoNivel.value, cartas);
    dibujarTablero(estadoJuego.cartas, estadoJuego.nivel);
    desbloquearTablero();
    actualizarMarcadores();
    ocultarModalVictoria();
    mostrarPantallaJuego();
}

function registrarEventos() {
    formularioInicio.addEventListener('submit', alEnviarFormularioInicio);
    botonReiniciar.addEventListener('click', alHacerClickEnReiniciar);
    botonVolverInicio.addEventListener('click', alHacerClickEnVolverInicio);
    botonJugarDeNuevo.addEventListener('click', alHacerClickEnJugarDeNuevo);
    botonCerrarModal.addEventListener('click', alHacerClickEnCerrarModal);
    document.addEventListener('keydown', alPresionarTeclaEnDocumento);
}
