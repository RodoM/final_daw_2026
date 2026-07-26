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

function guardarResultadoPartida() {
    var nivelGuardado;
    var intentosGuardados;
    var erroresGuardados;
    var duracionGuardada;
    var partida;
    if (estadoJuego.modoProgresivo === true) {
        nivelGuardado = 'progresivo';
        intentosGuardados = estadoJuego.intentosAcumuladosProgresivo;
        erroresGuardados = estadoJuego.erroresAcumuladosProgresivo;
        duracionGuardada = estadoJuego.segundosAcumuladosProgresivo;
    } else {
        nivelGuardado = estadoJuego.nivel;
        intentosGuardados = estadoJuego.intentos;
        erroresGuardados = estadoJuego.errores;
        duracionGuardada = estadoJuego.segundos;
    }
    partida = {
        nombre: estadoJuego.nombreJugador,
        puntaje: estadoJuego.puntaje,
        nivel: nivelGuardado,
        intentos: intentosGuardados,
        errores: erroresGuardados,
        fecha: new Date().toISOString(),
        duracion: duracionGuardada
    };
    guardarPartida(partida);
}

function terminarPartida() {
    detenerTemporizador();
    finalizarPartida();
    actualizarMarcadores();
    if (estadoJuego.modoProgresivo === true) {
        acumularEstadisticasNivelProgresivo();
        if (quedanNivelesProgresivo() === true) {
            reproducirSonido('acierto');
            mostrarModalNivelCompletado();
            return;
        }
        reproducirSonido('victoria');
        guardarResultadoPartida();
        mostrarModalResultadoProgresivo();
        return;
    }
    reproducirSonido('victoria');
    guardarResultadoPartida();
    mostrarModalVictoria();
}

function resolverTurno() {
    var coincide;
    coincide = compararCartasSeleccionadas();
    if (coincide === true) {
        registrarAcierto();
        reproducirSonido('acierto');
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
    reproducirSonido('error');
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
    reproducirSonido('seleccionar');
    guardarCartaSeleccionada(idCarta, posicionCarta);
    if (esPrimeraCartaDelTurno === true) {
        elementoPrimeraCarta = carta;
        return;
    }
    elementoSegundaCarta = carta;
    resolverTurno();
}

function reiniciarPartida() {
    var esProgresivo;
    var nivelReinicio;
    var cartas;
    pararTemporizadoresPendientes();
    limpiarElementosDelTurno();
    esProgresivo = estadoJuego.modoProgresivo;
    if (esProgresivo === true) {
        nivelReinicio = NIVELES_PROGRESIVO[0];
    } else {
        nivelReinicio = estadoJuego.nivel;
    }
    cartas = obtenerCartasDelNivel(nivelReinicio);
    cartas = mezclarCartas(cartas);
    reiniciarEstadoJuego(estadoJuego.nombreJugador, nivelReinicio, cartas);
    if (esProgresivo === true) {
        iniciarModoProgresivo();
    }
    dibujarTablero(estadoJuego.cartas, estadoJuego.nivel);
    desbloquearTablero();
    actualizarMarcadores();
    ocultarModalVictoria();
    ocultarModalNivelCompletado();
    ocultarModalResultadoProgresivo();
}

function alHacerClickEnReiniciar(evento) {
    reiniciarPartida();
}

function alHacerClickEnJugarDeNuevo(evento) {
    reiniciarPartida();
}

function alHacerClickEnJugarDeNuevoProgresivo(evento) {
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

function alHacerClickEnCerrarResultadoProgresivo(evento) {
    ocultarModalResultadoProgresivo();
}

function alHacerClickEnSiguienteNivel(evento) {
    var siguienteNivel;
    var cartas;
    avanzarNivelProgresivo();
    siguienteNivel = nivelActualProgresivo();
    cartas = obtenerCartasDelNivel(siguienteNivel);
    cartas = mezclarCartas(cartas);
    prepararSiguienteNivelProgresivo(siguienteNivel, cartas);
    dibujarTablero(estadoJuego.cartas, estadoJuego.nivel);
    desbloquearTablero();
    actualizarMarcadores();
    ocultarModalNivelCompletado();
}

function alPresionarTeclaEnDocumento(evento) {
    if (evento.key !== 'Escape') {
        return;
    }
    if (modalNivelCompletado.classList.contains('oculto') === false) {
        return;
    }
    if (modalResultadoProgresivo.classList.contains('oculto') === false) {
        ocultarModalResultadoProgresivo();
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

function alHacerClickEnModoProgresivo(evento) {
    var errorNombre;
    var nivelInicial;
    var cartas;
    errorNombre = validarNombreJugador(campoNombre.value);
    if (errorNombre !== '') {
        mostrarErrorInicio(errorNombre);
        return;
    }
    ocultarErrorInicio();
    pararTemporizadoresPendientes();
    limpiarElementosDelTurno();
    nivelInicial = NIVELES_PROGRESIVO[0];
    cartas = obtenerCartasDelNivel(nivelInicial);
    cartas = mezclarCartas(cartas);
    reiniciarEstadoJuego(campoNombre.value.trim(), nivelInicial, cartas);
    iniciarModoProgresivo();
    dibujarTablero(estadoJuego.cartas, estadoJuego.nivel);
    desbloquearTablero();
    actualizarMarcadores();
    ocultarModalVictoria();
    mostrarPantallaJuego();
}

function registrarEventos() {
    formularioInicio.addEventListener('submit', alEnviarFormularioInicio);
    botonModoProgresivo.addEventListener('click', alHacerClickEnModoProgresivo);
    botonReiniciar.addEventListener('click', alHacerClickEnReiniciar);
    botonVolverInicio.addEventListener('click', alHacerClickEnVolverInicio);
    botonJugarDeNuevo.addEventListener('click', alHacerClickEnJugarDeNuevo);
    botonCerrarModal.addEventListener('click', alHacerClickEnCerrarModal);
    botonSiguienteNivel.addEventListener('click', alHacerClickEnSiguienteNivel);
    botonJugarDeNuevoProgresivo.addEventListener('click', alHacerClickEnJugarDeNuevoProgresivo);
    botonCerrarResultadoProgresivo.addEventListener('click', alHacerClickEnCerrarResultadoProgresivo);
    document.addEventListener('keydown', alPresionarTeclaEnDocumento);
}
