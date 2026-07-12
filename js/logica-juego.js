'use strict';

function mezclarCartas(cartas) {
    var indice;
    var aleatorio;
    var temporal;
    for (indice = cartas.length - 1; indice > 0; indice--) {
        aleatorio = Math.floor(Math.random() * (indice + 1));
        temporal = cartas[indice];
        cartas[indice] = cartas[aleatorio];
        cartas[aleatorio] = temporal;
    }
    return cartas;
}
