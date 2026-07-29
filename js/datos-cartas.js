'use strict';

var BANDERAS = [
    { id: 'alemania', nombre: 'Alemania', imagen: 'assets/images/banderas/alemania.svg' },
    { id: 'argentina', nombre: 'Argentina', imagen: 'assets/images/banderas/argentina.svg' },
    { id: 'belgica', nombre: 'Bélgica', imagen: 'assets/images/banderas/belgica.svg' },
    { id: 'brasil', nombre: 'Brasil', imagen: 'assets/images/banderas/brasil.svg' },
    { id: 'colombia', nombre: 'Colombia', imagen: 'assets/images/banderas/colombia.svg' },
    { id: 'croacia', nombre: 'Croacia', imagen: 'assets/images/banderas/croacia.svg' },
    { id: 'espana', nombre: 'España', imagen: 'assets/images/banderas/espana.svg' },
    { id: 'estados-unidos', nombre: 'Estados Unidos', imagen: 'assets/images/banderas/estados-unidos.svg' },
    { id: 'francia', nombre: 'Francia', imagen: 'assets/images/banderas/francia.svg' },
    { id: 'italia', nombre: 'Italia', imagen: 'assets/images/banderas/italia.svg' },
    { id: 'japon', nombre: 'Japón', imagen: 'assets/images/banderas/japon.svg' },
    { id: 'marruecos', nombre: 'Marruecos', imagen: 'assets/images/banderas/marruecos.svg' },
    { id: 'mexico', nombre: 'México', imagen: 'assets/images/banderas/mexico.svg' },
    { id: 'paises-bajos', nombre: 'Países Bajos', imagen: 'assets/images/banderas/paises-bajos.svg' },
    { id: 'portugal', nombre: 'Portugal', imagen: 'assets/images/banderas/portugal.svg' },
    { id: 'senegal', nombre: 'Senegal', imagen: 'assets/images/banderas/senegal.svg' },
    { id: 'suiza', nombre: 'Suiza', imagen: 'assets/images/banderas/suiza.svg' },
    { id: 'uruguay', nombre: 'Uruguay', imagen: 'assets/images/banderas/uruguay.svg' }
];

var NIVELES = {
    facil: { nombre: 'Fácil', pares: 8, columnas: 4, penalizacion: 10 },
    medio: { nombre: 'Medio', pares: 10, columnas: 4, penalizacion: 20 },
    dificil: { nombre: 'Difícil', pares: 18, columnas: 6, penalizacion: 30 }
};

var errorCartas;

function obtenerCartasDelNivel(nivel) {
    var configuracionNivel;
    var cartas;
    var indice;
    var bandera;
    configuracionNivel = NIVELES[nivel];
    if (configuracionNivel === undefined) {
        errorCartas = 'El nivel elegido no existe.';
        return [];
    }
    if (BANDERAS.length < configuracionNivel.pares) {
        errorCartas = 'No hay suficientes banderas para armar este nivel.';
        return [];
    }
    cartas = [];
    for (indice = 0; indice < configuracionNivel.pares; indice++) {
        bandera = BANDERAS[indice];
        cartas.push({ id: bandera.id, nombre: bandera.nombre, imagen: bandera.imagen });
        cartas.push({ id: bandera.id, nombre: bandera.nombre, imagen: bandera.imagen });
    }
    if (cartas.length % 2 !== 0) {
        errorCartas = 'La cantidad de cartas generadas no es par.';
        return [];
    }
    errorCartas = '';
    return cartas;
}
